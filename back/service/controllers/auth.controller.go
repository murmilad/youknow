package controllers

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
	"time"

	log "github.com/sirupsen/logrus"

	"akosarev.info/youknow/initializers"
	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/utils"

	mobile "github.com/floresj/go-contrib-mobile"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/thanhpk/randstr"
)

type AuthController struct {
	UserService services.UserProvider
}

func NewAuthController(UserService services.UserProvider) AuthController {
	return AuthController{UserService}
}

// [...] DeepLink resolver
func (ac *AuthController) DeepLink(ctx *gin.Context) {

	action := ctx.Params.ByName("action")
	code := ctx.Params.ByName("verificationCode")

	device := mobile.GetDevice(ctx)

	config, _ := initializers.LoadConfig(".")

	switch {
	case device.Normal():
		ctx.Redirect(http.StatusTemporaryRedirect, config.ClientOrigin+action+"/"+code)
	case device.Mobile():
		ctx.Redirect(http.StatusTemporaryRedirect, config.ClientOriginApp+action+"/"+code)
	case device.Tablet():
		ctx.Redirect(http.StatusTemporaryRedirect, config.ClientOriginApp+action+"/"+code)
	}
}

// [...] SignUp User
func (ac *AuthController) SignUpUser(ctx *gin.Context) {

	var payload *models.SignUpInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if payload.Password != payload.PasswordConfirm {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Passwords do not match"})
		return
	}

	hashedPassword, err := utils.HashPassword(payload.Password)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	existsUser := models.User{}
	err = ac.UserService.GetUnverifiedUser(&existsUser, payload.Email)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Can't get exists User " + err.Error()})
		return
	}

	now := time.Now()
	newUser := models.User{
		ID:        existsUser.ID,
		Name:      payload.Name,
		Email:     strings.ToLower(payload.Email),
		Password:  hashedPassword,
		Role:      "user",
		Verified:  false,
		Photo:     payload.Photo,
		Provider:  "local",
		CreatedAt: now,
		UpdatedAt: now,
	}

	err = ac.UserService.SaveUser(&newUser)

	if err != nil && strings.Contains(err.Error(), "duplicate key value violates unique") {
		ctx.JSON(http.StatusConflict, gin.H{"status": "fail", "message": "User with that email already exists"})
		return
	} else if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Can't save User " + err.Error()})
		return
	}

	config, _ := initializers.LoadConfig(".")

	// Generate Verification Code
	code := randstr.String(20)

	verification_code := utils.Encode(code)

	// Update User in Database
	newUser.VerificationCode = verification_code
	err = ac.UserService.SaveUser(&newUser)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Can't save User verification code " + err.Error()})
		return
	}

	var firstName = newUser.Name

	if strings.Contains(firstName, " ") {
		firstName = strings.Split(firstName, " ")[1]
	}

	emailData := utils.EmailData{
		//		Backend deep link resolver
		//		URL:       template.URL(config.ClientOrigin + "/api/deeplink/?action=verifyemail&code=" + code),
		URL:       template.URL(config.ClientOrigin + "/verifyemail/" + code),
		FirstName: firstName,
		Subject:   "Welcome to YouknoW",
		Header:    "Welcome!",
		Button:    "Verify e-mail",
	}

	utils.SendEmail(&newUser, &emailData)

	message := "We sent an email with a verification code to " + newUser.Email
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "message": message})
}

// [...] ForgotPassword
func (ac *AuthController) ForgotPassword(ctx *gin.Context) {

	var payload *models.ForgotInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var user models.User

	err := ac.UserService.GetUser(&user, payload.Email)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "User with this E-Mail didnt found"})
		return
	}

	config, _ := initializers.LoadConfig(".")

	// Generate Verification Code
	code := randstr.String(20)

	verification_code := utils.Encode(code)

	// Update User in Database
	user.VerificationCode = verification_code

	err = ac.UserService.SaveUser(&user)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Can't save User " + err.Error()})
		return
	}

	var firstName = user.Name

	if strings.Contains(firstName, " ") {
		firstName = strings.Split(firstName, " ")[1]
	}

	emailData := utils.EmailData{
		//		Backend deep link resolver
		//		URL:       template.URL(config.ClientOrigin + "/api/deeplink/?action=resetpassword&code=" + verification_code),
		URL:       template.URL(config.ClientOrigin + "/resetpassword/" + verification_code),
		FirstName: firstName,
		Subject:   "Your new YouknoW password",
		Header:    "Change password",
		Button:    "Set new password",
	}

	utils.SendEmail(&user, &emailData)

	message := "We sent an email with a verification code to " + user.Email
	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "message": message})
}

// [...] ResetPassword
func (ac *AuthController) ResetPassword(ctx *gin.Context) {
	var payload *models.ChangePasswordInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var updatedUser models.User
	err := ac.UserService.GetUserForVerification(&updatedUser, payload.VerifyHash)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Change password failed. Please try to start change password procedure again"})
		return
	}

	if payload.Password != payload.PasswordConfirm {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Passwords do not match"})
		return
	}

	hashedPassword, err := utils.HashPassword(payload.Password)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	now := time.Now()

	updatedUser.UpdatedAt = now
	updatedUser.VerificationCode = ""
	updatedUser.Verified = true
	updatedUser.Password = hashedPassword

	err = ac.UserService.SaveUser(&updatedUser)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": "Can't save User " + err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Password changed successfully"})

}

// [...] Verify Email
func (ac *AuthController) VerifyEmail(ctx *gin.Context) {

	code := ctx.Params.ByName("verificationCode")
	verification_code := utils.Encode(code)

	var updatedUser models.User
	err := ac.UserService.GetUserForVerification(&updatedUser, verification_code)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Invalid verification code or user doesn't exists"})
		return
	}

	if updatedUser.Verified {
		ctx.JSON(http.StatusConflict, gin.H{"status": "fail", "message": "User already verified"})
		return
	}

	updatedUser.VerificationCode = ""
	updatedUser.Verified = true
	err = ac.UserService.SaveUser(&updatedUser)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "Email verified successfully"})
}

// [...] SignIn User
func (ac *AuthController) SignInUser(ctx *gin.Context) {
	var payload *models.SignInInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var user models.User
	err := ac.UserService.GetUser(&user, payload.Email)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Invalid email or Password"})
		return
	}

	if !user.Verified {
		ctx.JSON(http.StatusForbidden, gin.H{"status": "fail", "message": "Please verify your email"})
		return
	}

	if err := utils.VerifyPassword(user.Password, payload.Password); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "Invalid email or Password"})
		return
	}

	config, _ := initializers.LoadConfig(".")

	// Generate Token
	token, err := utils.GenerateToken(config.TokenExpiresIn, user.ID, config.TokenSecret)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.SetCookie("token", token, config.TokenMaxAge*60, "/", config.ServerName, false, true)

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "token": token})
}

// [...] SignOut User
func (ac *AuthController) LogoutUser(ctx *gin.Context) {
	config, _ := initializers.LoadConfig(".")

	ctx.SetCookie("token", "", -1, "/", config.ServerName, false, true)
	ctx.JSON(http.StatusOK, gin.H{"status": "success"})
}

//mobile
///api/sessions/oauth/google?
//mobile=1
//oauthType=google
//authuser=0
//code=4%2F0AfJohXnU56q-XJbqZmJ8BtC5TPt1mQ71HeTx_A2dM6lIw7OJ9DA8_uOcAt1hmEYKeke5NQ
//prompt=consent
//scope=email
//20profile%20https%3A%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20openid
//state=eeQTRmvJufZLFpB63RVznA

// web
// /api/sessions/oauth/google?
// state=%2F
// code=4%2F0AfJohXltk2tR6wKlTDwrAjxdhICfGa5YUGBqpcAJ8oJLKK7PYsAxxPdR_q2XYlSQMmQLTA
// scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+openid
// authuser=0
// prompt=consent
func (ac *AuthController) GoogleOAuth(ctx *gin.Context) {
	code := ctx.Query("code")
	initiator := ctx.Query("initiator")

	var pathUrl string = "/"

	if code == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": "Authorization code not provided!"})
		return
	}

	config, _ := initializers.LoadConfig(".")

	// Use the code to get the id and access tokens
	var tokenRes *utils.GoogleOauthToken
	var err error

	if initiator == "mobile" {
		tokenRes, err = utils.GetGoogleOauthToken(code, config.GoogleAppClientID, "", config.GoogleOAuthAppRedirectUrl)
	} else {
		tokenRes, err = utils.GetGoogleOauthToken(code, config.GoogleClientID, config.GoogleClientSecret, config.GoogleOAuthRedirectUrl)
	}

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	log.Debug("Access_token ", tokenRes.Access_token)

	googleUser, err := utils.GetGoogleUser(tokenRes.Access_token, tokenRes.Id_token)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var users []models.User
	err = ac.UserService.GetUsersByProvider(&users, googleUser.Email, "google")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var userID uuid.UUID
	if len(users) > 0 {
		userID = users[0].ID
	}

	createdAt := time.Now()
	user := &models.User{
		ID:        userID,
		Email:     googleUser.Email,
		Name:      googleUser.Name,
		Photo:     googleUser.Picture,
		Provider:  "google",
		Role:      "user",
		Verified:  true,
		CreatedAt: createdAt,
		UpdatedAt: createdAt,
	}

	err = ac.UserService.SaveUser(user)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	// Generate Tokens
	access_token, err := utils.GenerateToken(config.TokenExpiresIn, user.ID, config.TokenSecret)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.SetCookie("token", access_token, config.TokenMaxAge*60, "/", config.ServerName, false, false)

	if initiator == "mobile" {
		ctx.JSON(http.StatusOK, gin.H{"token": access_token})
	} else {
		ctx.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(config.ClientOrigin, pathUrl))
	}
}

func (ac *AuthController) GithubOAuth(ctx *gin.Context) {
	errorDescription := ctx.Query("error_description")
	if errorDescription != "" {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "fail", "message": errorDescription})
		return
	}

	code := ctx.Query("code")
	initiator := ctx.Query("initiator")
	var pathUrl string = "/"

	if code == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"status": "fail", "message": "Authorization code not provided!"})
		return
	}

	config, _ := initializers.LoadConfig(".")

	// Use the code to get the id and access tokens

	tokenRes, err := utils.GetGithubOauthToken(code, config.GithubClientID, config.GithubClientSecret, config.GithubOAuthRedirectUrl)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	log.Debug("Access_token ", tokenRes.Access_token)

	githubUser, err := utils.GetGithubUser(tokenRes.Access_token)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var users []models.User
	err = ac.UserService.GetUsersByProvider(&users, githubUser.Email, "github")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	var userID uuid.UUID
	if len(users) > 0 {
		userID = users[0].ID
	}

	createdAt := time.Now()
	user := &models.User{
		ID:        userID,
		Email:     githubUser.Email,
		Name:      githubUser.Name,
		Photo:     githubUser.Avatar_url,
		Provider:  "github",
		Role:      "user",
		Verified:  true,
		CreatedAt: createdAt,
		UpdatedAt: createdAt,
	}

	err = ac.UserService.SaveUser(user)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	// Generate Tokens
	access_token, err := utils.GenerateToken(config.TokenExpiresIn, user.ID, config.TokenSecret)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.SetCookie("token", access_token, config.TokenMaxAge*60, "/", config.ServerName, false, false)

	if initiator == "mobile" {
		//Github supports only one callback, then we redirect from web to deeplink after check
		ctx.Redirect(http.StatusTemporaryRedirect, "app.youknow:/api/sessions/oauth/github?token="+access_token)
	} else {
		ctx.Redirect(http.StatusTemporaryRedirect, fmt.Sprint(config.ClientOrigin, pathUrl))
	}
}

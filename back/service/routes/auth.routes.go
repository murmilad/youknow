package routes

import (
	"akosarev.info/youknow/controllers"
	"akosarev.info/youknow/middleware"
	"github.com/gin-gonic/gin"
)

type AuthRouteController struct {
	authController controllers.AuthController
}

func NewAuthRouteController(authController controllers.AuthController) AuthRouteController {
	return AuthRouteController{authController}
}

func (rc *AuthRouteController) AuthRoute(rg *gin.RouterGroup) {
	router := rg.Group("/auth")

	router.POST("/register", rc.authController.SignUpUser)
	router.POST("/forgotpassword", rc.authController.ForgotPassword)
	router.POST("/login", rc.authController.SignInUser)
	router.POST("/resetpassword", rc.authController.ResetPassword)
	router.GET("/logout", middleware.DeserializeUser(), rc.authController.LogoutUser)
	router.GET("/verifyemail/:verificationCode", rc.authController.VerifyEmail)
}

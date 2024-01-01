package controllers

import (
	"net/http"

	log "github.com/sirupsen/logrus"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	UserService services.UserProvider
}

func NewUserController(UserService services.UserProvider) UserController {
	return UserController{UserService}
}

func (uc *UserController) GetMe(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	userResponse := &models.UserResponse{
		ID:        currentUser.ID,
		Name:      currentUser.Name,
		Email:     currentUser.Email,
		Photo:     currentUser.Photo,
		Role:      currentUser.Role,
		Provider:  currentUser.Provider,
		CreatedAt: currentUser.CreatedAt,
		UpdatedAt: currentUser.UpdatedAt,
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": gin.H{"user": userResponse}})
}

// [...] SetData
func (uc *UserController) SetData(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	var payload *models.UserDataInput

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	log.Debug("Save user " + currentUser.Email + " data: timezone" + payload.Timezone)
	currentUser.Timezone = payload.Timezone
	err := uc.UserService.SaveUser(&currentUser)
	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success"})
}

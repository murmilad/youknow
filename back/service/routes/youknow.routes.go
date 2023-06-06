package routes

import (
	"akosarev.info/youknow/controllers"
	"akosarev.info/youknow/middleware"
	"github.com/gin-gonic/gin"
)

type YouKnowRouteController struct {
	youKnowController controllers.YouKnowController
}

func NewYouKnowRouteController(youKnowController controllers.YouKnowController) YouKnowRouteController {
	return YouKnowRouteController{youKnowController}
}

func (yc *YouKnowRouteController) YouKnowRoute(rg *gin.RouterGroup) {

	router := rg.Group("/youknow")

	router.POST("/knowtype", middleware.DeserializeUser(), yc.youKnowController.PostKnowType)
	router.GET("/knowtype/:id", middleware.DeserializeUser(), yc.youKnowController.GetKnowTypeByID)
	router.GET("/knowtypes", middleware.DeserializeUser(), yc.youKnowController.GetKnowTypes)
	router.DELETE("/knowtype/:id", middleware.DeserializeUser(), yc.youKnowController.DeleteKnowTypeByID)

}

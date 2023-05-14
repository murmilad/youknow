package routes

import (
	"akosarev.info/youknow/controllers"
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

	router.POST("/knowtype", yc.youKnowController.PostKnowType)
	router.GET("/knowtype/:id", yc.youKnowController.GetKnowTypeByID)
	router.GET("/knowtypes", yc.youKnowController.GetKnowTypes)
	router.DELETE("/knowtype/:id", yc.youKnowController.DeleteKnowTypeByID)

}

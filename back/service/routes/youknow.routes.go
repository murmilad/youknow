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
	router.POST("/knowtypes/:id", middleware.DeserializeUser(), yc.youKnowController.PostKnowTypesById)

	router.POST("/know", middleware.DeserializeUser(), yc.youKnowController.PostKnow)
	router.GET("/know/:id", middleware.DeserializeUser(), yc.youKnowController.GetKnowByID)
	router.GET("/knows/:knowtype_id", middleware.DeserializeUser(), yc.youKnowController.GetKnows)
	router.DELETE("/know/:id", middleware.DeserializeUser(), yc.youKnowController.DeleteKnowByID)

	router.GET("/lessons", middleware.DeserializeUser(), yc.youKnowController.GetLessons)
	router.GET("/lesson/:id", middleware.DeserializeUser(), yc.youKnowController.GetLessonByID)
	router.POST("/lesson", middleware.DeserializeUser(), yc.youKnowController.PostLesson)
	router.DELETE("/lesson/:id", middleware.DeserializeUser(), yc.youKnowController.DeleteLesson)

	router.POST("/lessonKnow", middleware.DeserializeUser(), yc.youKnowController.PostLessonKnow)

}

package routes

import (
	"akosarev.info/youknow/controllers"
	"github.com/gin-gonic/gin"
)

type PingRouteController struct {
	pingController controllers.PingController
}

func NewPingRouteController(pingController controllers.PingController) PingRouteController {
	return PingRouteController{pingController}
}

func (rc *PingRouteController) PingRoute(rg *gin.RouterGroup) {
	router := rg.Group("/ping")

	router.POST("/", rc.pingController.Ping)
}

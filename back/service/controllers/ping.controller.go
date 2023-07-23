package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PingController struct {
}

func NewPingController() PingController {
	return PingController{}
}

func (uc *PingController) Ping(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"status": "success", "data": "pong"})
}

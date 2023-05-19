package main

import (
	"log"
	"net/http"

	"akosarev.info/youknow/controllers"
	"akosarev.info/youknow/initializers"
	"akosarev.info/youknow/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var (
	server              *gin.Engine
	AuthController      controllers.AuthController
	AuthRouteController routes.AuthRouteController

	UserController      controllers.UserController
	UserRouteController routes.UserRouteController

	YouKnowController      controllers.YouKnowController
	YouKnowRouteController routes.YouKnowRouteController
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	initializers.ConnectDB(&config)

	AuthController = controllers.NewAuthController(initializers.DB)
	AuthRouteController = routes.NewAuthRouteController(AuthController)

	UserController = controllers.NewUserController(initializers.DB)
	UserRouteController = routes.NewRouteUserController(UserController)

	YouKnowController = controllers.NewYouKnowController(initializers.DB)
	YouKnowRouteController = routes.NewYouKnowRouteController(YouKnowController)

	server = gin.Default()
}

func main() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://notebook:8000", config.ClientOrigin}
	corsConfig.AllowCredentials = true
	corsConfig.AllowHeaders = []string{"*"}

	server.Use(cors.New(corsConfig))

	router := server.Group("/api")
	router.GET("/healthchecker", func(ctx *gin.Context) {
		message := "Welcome to YouKnow"
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": message})
	})

	AuthRouteController.AuthRoute(router)
	UserRouteController.UserRoute(router)
	YouKnowRouteController.YouKnowRoute(router)
	log.Fatal(server.Run(":" + config.ServerPort))
}

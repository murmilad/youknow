package main

import (
	"log"
	"net/http"
	"os"

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

	SessionRouteController routes.SessionRouteController
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	f, err := os.OpenFile(config.LogPath, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}

	defer f.Close()

	log.SetOutput(f)
	log.Println("Youknow application starts")

	initializers.ConnectDB(&config)

	AuthController = controllers.NewAuthController(initializers.DB)
	AuthRouteController = routes.NewAuthRouteController(AuthController)

	UserController = controllers.NewUserController(initializers.DB)
	UserRouteController = routes.NewRouteUserController(UserController)

	YouKnowController = controllers.NewYouKnowController(initializers.DB)
	YouKnowRouteController = routes.NewYouKnowRouteController(YouKnowController)

	SessionRouteController = routes.NewSessionRouteController(AuthController)

	server = gin.Default()

}

func main() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{config.ExternalBackendAddress + ":" + config.ExternalBackendPort, config.ClientOrigin}
	corsConfig.AllowCredentials = true
	corsConfig.AllowHeaders = []string{"*"}

	server.Use(cors.New(corsConfig))
/* 	server.Use(gin.LoggerWithConfig(gin.LoggerConfig{
		SkipPaths: []string{"/api/healthchecker"},
	}))
	server.Use(gin.Recovery())
 */
	router := server.Group("/api")
	router.GET("/healthchecker", func(ctx *gin.Context) {
		message := "Welcome to YouKnow"
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": message})
	})


	AuthRouteController.AuthRoute(router)
	UserRouteController.UserRoute(router)
	YouKnowRouteController.YouKnowRoute(router)
	SessionRouteController.SessionRoute(router)
	log.Fatal(server.Run(":" + config.ServerPort))
}

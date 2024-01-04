package main

import (
	"context"
	"net/http"
	"os"
	"strconv"

	log "github.com/sirupsen/logrus"

	"akosarev.info/youknow/controllers"
	"akosarev.info/youknow/initializers"
	providersgorm "akosarev.info/youknow/providers/gorm"
	"akosarev.info/youknow/routes"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/taskmanager"
	"akosarev.info/youknow/taskmanager/tasks"
	mobile "github.com/floresj/go-contrib-mobile"
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

	worker  taskmanager.WorkerIface
	founder taskmanager.TaskRoutine
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	ll, err := log.ParseLevel(config.LogLevel)
	if err != nil {
		log.Fatalf("log level error: %v", err)
	}

	log.SetLevel(ll)
	log.Info("Youknow application starts")

	initializers.ConnectDB(&config)

	UserProvider := providersgorm.NewUserProvider(initializers.DB)
	KnowProvider := providersgorm.NewKnowProvider(initializers.DB)

	UserService := services.NewUserService(UserProvider)
	KnowService := services.NewKnowService(KnowProvider)

	AuthController = controllers.NewAuthController(UserService)
	AuthRouteController = routes.NewAuthRouteController(AuthController)

	UserController = controllers.NewUserController(UserService)
	UserRouteController = routes.NewRouteUserController(UserController)

	YouKnowController = controllers.NewYouKnowController(KnowService)
	YouKnowRouteController = routes.NewYouKnowRouteController(YouKnowController)

	SessionRouteController = routes.NewSessionRouteController(AuthController)

	server = gin.Default()

	server.Use(mobile.Resolver())

	log.Info("starting workers " + strconv.Itoa(config.WorkersCount) + " " + strconv.Itoa(config.WorkersBuffer))
	worker = taskmanager.New(config.WorkersCount, config.WorkersBuffer)
	founder = tasks.NewTaskFounder(KnowService, UserService)
}

func main() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}
	f, err := os.OpenFile(config.LogPath, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}

	log.SetOutput(f)

	ctx := context.Background()

	worker.Start(ctx)

	err = worker.QueueTask("[TASK FOUNDER]", founder)
	if err != nil {
		log.Fatalf("can't add task: %v", err)
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

	log.Info(server.Run(":" + config.ServerPort))

	defer func() {
		worker.Stop()
		f.Close()
	}()
}

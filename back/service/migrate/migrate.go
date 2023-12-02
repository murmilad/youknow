package main

import (
	log "github.com/sirupsen/logrus"

	"akosarev.info/youknow/initializers"
	"akosarev.info/youknow/models"
)

func init() {
	config, err := initializers.LoadConfig(".")
	if err != nil {
		log.Fatal("? Could not load environment variables", err)
	}

	initializers.ConnectDB(&config)
}

func main() {
	initializers.DB.AutoMigrate(&models.User{})
	initializers.DB.AutoMigrate(&models.KnowType{})
	initializers.DB.AutoMigrate(&models.Know{})
	log.Debug("? Migration complete")
}

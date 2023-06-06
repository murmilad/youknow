package main

import (
	"fmt"
	"log"

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
	fmt.Println("? Migration complete")
}

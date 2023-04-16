package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const (
	host     = "localhost"
	port     = 5560
	user     = "postgres"
	password = "postgres"
	dbname   = "youknow"
)

type KnowType struct {
	id    uint
	name  string
	style string //`json:"style" gorm:"-" default:"[]"`
}

func main() {
	dsn := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}
	app := fiber.New()

	db.AutoMigrate(KnowType{})

	app.Get("/api/:id/knowtypes", func(c *fiber.Ctx) error {
		var knowtypes []KnowType
		db.Find(&knowtypes, "id = ?", c.Params("id"))

		return c.JSON(knowtypes)
	})

	app.Get("/api/knowtypes", func(c *fiber.Ctx) error {
		var knowtypes []KnowType
		db.Find(&knowtypes)

		return c.JSON(knowtypes)
	})

	app.Post("/api/knowtypes", func(c *fiber.Ctx) error {
		var knowtype KnowType

		if err := c.BodyParser(&knowtype); err != nil {
			return err
		}

		db.Create(&knowtype)

		return c.JSON(knowtype)
	})

	app.Listen(":3000")
}

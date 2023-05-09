package main

import (
	"fmt"

	"akosarev.info/youknow/config"
	"akosarev.info/youknow/jwt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type KnowType struct {
	Id    uint   `json:"id"`
	Name  string `json:"name"`
	Style string `json:"style"` // `gorm:"-" default:"[]"`
}

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Token struct {
	Token       string `json:"token"`
	IsIncorrect bool   `json:"is_incorrect"`
}

func main() {
	dsn := fmt.Sprintf("host=%s port=%s user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config.Config("DB_HOST"),
		config.Config("DB_PORT"),
		config.Config("DB_USER"),
		config.Config("DB_PASSWORD"),
		config.Config("DB_NAME"))
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}
	app := fiber.New()

	db.AutoMigrate(KnowType{})
	app.Use(cors.New())

	app.Get("/api/:id/knowtypes", func(c *fiber.Ctx) error {
		var knowtypes []KnowType
		db.Find(&knowtypes, "id = ?", c.Params("id"))

		if len(knowtypes) > 0 {
			return c.JSON(knowtypes[0])
		} else {
			return fiber.NewError(fiber.StatusBadRequest, "Element not found")
		}
	})
	app.Get("/api/knowtypes", func(c *fiber.Ctx) error {
		var knowtypes []KnowType
		db.Order("id").Find(&knowtypes)

		return c.JSON(knowtypes)
	})

	app.Post("/api/knowtypes", func(c *fiber.Ctx) error {
		var knowtype KnowType

		if err := c.BodyParser(&knowtype); err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, "JWT generator error")
		}

		db.Save(&knowtype)

		return c.JSON(knowtype)
	})

	app.Post("/api/login", func(c *fiber.Ctx) error {
		var login Login

		if err := c.BodyParser(&login); err != nil {
			return err
		}

		if login.Password == "123" {
			token, err := jwt.GenerateJWT()
			if err != nil {
				return err
			}
			return c.JSON(Token{token, false})
		} else {
			return c.JSON(Token{"", true})
		}
	})

	app.Delete("/api/:id/knowtypes", func(c *fiber.Ctx) error {
		db.Delete(&KnowType{}, 10, c.Params("id"))

		return c.Send(nil)
	})

	app.Listen(":8000")
}

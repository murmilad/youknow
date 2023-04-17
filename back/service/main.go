package main

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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
	Id    uint   `json:"id"`
	Name  string `json:"name"`
	Style string `json:"style"` // `gorm:"-" default:"[]"`
}

type Responce struct {
	Err string `json:"err"`
}
type ArrayResponce[T any] struct {
	Responce
	Data []T `json:"data"`
}

type ItemResponce[T any] struct {
	Responce
	Data T `json:"data"`
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
	app.Use(cors.New())

	app.Get("/api/:id/knowtypes", func(c *fiber.Ctx) error {
		var knowtypes []KnowType
		db.Find(&knowtypes, "id = ?", c.Params("id"))

		if len(knowtypes) > 0 {
			return c.JSON(ItemResponce[KnowType]{Data: knowtypes[0]})
		} else {
			return c.JSON(Responce{Err: "Not found!"})
		}
	})
	app.Get("/api/knowtypes", func(c *fiber.Ctx) error {
		var knowtypes []KnowType
		db.Find(&knowtypes)

		return c.JSON(ArrayResponce[KnowType]{Data: knowtypes})
	})

	app.Post("/api/knowtypes", func(c *fiber.Ctx) error {
		var knowtype KnowType

		if err := c.BodyParser(&knowtype); err != nil {
			return err
		}

		db.Create(&knowtype)

		return c.JSON(ItemResponce[KnowType]{Data: knowtype})
	})

	app.Listen(":8000")
}

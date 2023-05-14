package controllers

import (
	"net/http"

	"akosarev.info/youknow/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type YouKnowController struct {
	DB *gorm.DB
}

func NewYouKnowController(DB *gorm.DB) YouKnowController {
	return YouKnowController{DB}
}

func (yc *YouKnowController) GetKnowTypes(ctx *gin.Context) {
	var knowtypes []models.KnowType
	yc.DB.Order("id").Find(&knowtypes)

	ctx.IndentedJSON(http.StatusOK, knowtypes)
}

func (yc *YouKnowController) PostKnowType(ctx *gin.Context) {

	var knowtype models.KnowType

	if err := ctx.BindJSON(&knowtype); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "JWT generator error"})
	}

	yc.DB.Save(&knowtype)

	ctx.IndentedJSON(http.StatusCreated, knowtype)
}

func (yc *YouKnowController) GetKnowTypeByID(ctx *gin.Context) {
	var knowtypes []models.KnowType
	yc.DB.Find(&knowtypes, "id = ?", ctx.Param("id"))

	if len(knowtypes) > 0 {
		ctx.IndentedJSON(http.StatusOK, knowtypes[0])
		return
	}

	ctx.IndentedJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Element not found"})

}

func (yc *YouKnowController) DeleteKnowTypeByID(ctx *gin.Context) {
	var knowtypes []models.KnowType
	yc.DB.Find(&knowtypes, "id = ?", ctx.Param("id"))

	if len(knowtypes) > 0 {
		yc.DB.Delete(&models.KnowType{}, 10, ctx.Param("id"))

		ctx.IndentedJSON(http.StatusOK, knowtypes[0])
		return
	}

	ctx.IndentedJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Element not found"})

}

/*


	app.Get("/api/:id/knowtypes", func(c *fiber.Ctx) error {
		var knowtypes []models.KnowType
		db.Find(&knowtypes, "id = ?", c.Params("id"))

		if len(knowtypes) > 0 {
			return c.JSON(knowtypes[0])
		} else {
			return fiber.NewError(fiber.StatusBadRequest, "Element not found")
		}
	})
	app.Get("/api/knowtypes", func(c *fiber.Ctx) error {
		var knowtypes []models.KnowType
		db.Order("id").Find(&knowtypes)

		return c.JSON(knowtypes)
	})

	app.Post("/api/knowtypes", func(c *fiber.Ctx) error {
		var knowtype models.KnowType

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
		db.Delete(&models.KnowType{}, 10, c.Params("id"))

		return c.Send(nil)
	})



*/

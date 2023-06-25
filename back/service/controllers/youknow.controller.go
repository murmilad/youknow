package controllers

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"strconv"
	"strings"

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
	currentUser := ctx.MustGet("currentUser").(models.User)

	var knowtypes []models.KnowTypeResponse
	yc.DB.Order("id").Find(&knowtypes, "user_id = ? AND deleted = false", currentUser.ID)

	ctx.IndentedJSON(http.StatusOK, knowtypes)
}

func (yc *YouKnowController) PostKnowType(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	var knowtype models.KnowType

	if err := ctx.BindJSON(&knowtype); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "JWT generator error"})
	}

	knowtype.UserID = currentUser.ID

	yc.DB.Save(&knowtype)

	ctx.IndentedJSON(http.StatusCreated, knowtype)
}

func (yc *YouKnowController) GetKnowTypeByID(ctx *gin.Context) {
	var knowtypes []models.KnowTypeResponse
	yc.DB.Find(&knowtypes, "id = ? AND deleted = false", ctx.Param("id"))

	if len(knowtypes) > 0 {
		ctx.IndentedJSON(http.StatusOK, knowtypes[0])
		return
	}

	ctx.IndentedJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Element not found"})

}

func (yc *YouKnowController) DeleteKnowTypeByID(ctx *gin.Context) {
	var knowtypes []models.KnowTypeResponse
	yc.DB.Find(&knowtypes, "id = ? AND deleted = false", ctx.Param("id"))

	if len(knowtypes) > 0 {
		knowtypes[0].Deleted = true
		yc.DB.Save(knowtypes[0])

		ctx.IndentedJSON(http.StatusOK, knowtypes[0])
		return
	}

	ctx.IndentedJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Element not found"})

}

func (yc *YouKnowController) PostKnowTypesById(ctx *gin.Context) {
	knowTypeId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	file, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	src, err := file.Open()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	reader := csv.NewReader(src)
	reader.Comma = '|'
	records, _ := reader.ReadAll()

	loadedCount := 0
	duplicatedCount := 0
	for _, record := range records {

		if record[0] != "" && record[1] != "" {

			var knows []models.Know

			yc.DB.Where("knowtype_id = ? AND deleted = false AND name = ? AND value = ?",
				knowTypeId, strings.ToLower(strings.Trim(record[0], " ")), strings.ToLower(strings.Trim(record[1], " "))).
				Find(&knows)

			if len(knows) > 0 {
				duplicatedCount++
			} else {
				loadedCount++
				var know models.Know
				know.KnowtypeId = uint(knowTypeId)
				know.Name = record[0]
				know.Value = record[1]
				yc.DB.Save(&know)
			}
		}
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"status": "loaded", "message": fmt.Sprintf("Uploaded %d, Duplicated %d", loadedCount, duplicatedCount)})
}

func (yc *YouKnowController) GetKnows(ctx *gin.Context) {
	var knows []models.Know
	yc.DB.Order("id desc").Find(&knows, "knowtype_id = ? AND deleted = false", ctx.Param("knowtype_id"))

	ctx.IndentedJSON(http.StatusOK, knows)
}

func (yc *YouKnowController) PostKnow(ctx *gin.Context) {

	var know models.Know

	if err := ctx.BindJSON(&know); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "JWT generator error"})
	}

	yc.DB.Save(&know)

	ctx.IndentedJSON(http.StatusCreated, know)
}

func (yc *YouKnowController) GetKnowByID(ctx *gin.Context) {
	var knows []models.Know
	yc.DB.Find(&knows, "id = ? AND deleted = false", ctx.Param("id"))

	if len(knows) > 0 {
		ctx.IndentedJSON(http.StatusOK, knows[0])
		return
	}

	ctx.IndentedJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Element not found"})

}

func (yc *YouKnowController) DeleteKnowByID(ctx *gin.Context) {
	var knows []models.Know
	yc.DB.Find(&knows, "id = ? AND deleted = false", ctx.Param("id"))

	if len(knows) > 0 {
		knows[0].Deleted = true
		yc.DB.Save(knows[0])

		ctx.IndentedJSON(http.StatusOK, knows[0])
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

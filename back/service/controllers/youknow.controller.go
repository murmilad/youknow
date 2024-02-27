package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type YouKnowController struct {
	KnowService services.KnowProvider
}

func NewYouKnowController(knowService services.KnowProvider) YouKnowController {
	return YouKnowController{knowService}
}

func (yc *YouKnowController) GetKnowTypes(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	var knowtypes []models.KnowTypeResponse
	err := yc.KnowService.GetKnowtypesByUser(&knowtypes, &currentUser)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusOK, knowtypes)
}

func (yc *YouKnowController) PostKnowType(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)
	log.Debug("post knowtype")

	var knowtype models.KnowType

	if err := ctx.BindJSON(&knowtype); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "JWT generator error"})
	}

	knowtype.UserID = currentUser.ID

	err := yc.KnowService.SaveKnowtype(&knowtype)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusCreated, knowtype)
}

func (yc *YouKnowController) GetKnowTypeByID(ctx *gin.Context) {
	var knowtypes []models.KnowTypeResponse
	knowTypeId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if err := yc.KnowService.GetKnowtypesById(&knowtypes, uint(knowTypeId)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if len(knowtypes) > 0 {
		ctx.IndentedJSON(http.StatusOK, knowtypes[0])
		return
	}

	ctx.IndentedJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Element not found"})

}

func (yc *YouKnowController) DeleteKnowTypeByID(ctx *gin.Context) {
	knowTypeId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	err = yc.KnowService.DeleteKnowtype(uint(knowTypeId))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"status": "deleted"})
}

func (yc *YouKnowController) PostKnowTypesById(ctx *gin.Context) {
	knowTypeId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	file, _, err := ctx.Request.FormFile("file")
	defer file.Close()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	loadedCount, duplicatedCount, err := yc.KnowService.AddKnowsFromFile(file, uint(knowTypeId))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"status": "loaded", "message": fmt.Sprintf("Uploaded %d, Duplicated %d", loadedCount, duplicatedCount)})
}

func (yc *YouKnowController) GetKnows(ctx *gin.Context) {
	var knows []models.Know
	knowTypeId, err := strconv.Atoi(ctx.Param("knowtype_id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	err = yc.KnowService.GetKnowsByKnowtypeId(&knows, uint(knowTypeId))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusOK, knows)
}

func (yc *YouKnowController) PostKnow(ctx *gin.Context) {

	var know models.Know

	if err := ctx.BindJSON(&know); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "JWT generator error"})
	}

	if err := yc.KnowService.SaveKnow(&know); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusCreated, know)
}

func (yc *YouKnowController) GetKnowByID(ctx *gin.Context) {
	var knows []models.Know
	knowId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if err := yc.KnowService.GetKnowsById(&knows, uint(knowId)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if len(knows) > 0 {
		ctx.IndentedJSON(http.StatusOK, knows[0])
		return
	}

	ctx.IndentedJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Element not found"})

}

func (yc *YouKnowController) DeleteKnowByID(ctx *gin.Context) {
	knowId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if err := yc.KnowService.DeleteKnow(uint(knowId)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"status": "deleted"})
}

func (yc *YouKnowController) GetLessons(ctx *gin.Context) {
	currentUser := ctx.MustGet("currentUser").(models.User)

	err, lessons := yc.KnowService.GetLessonKnowtypesByUserId(currentUser.ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusOK, lessons)
}

func (yc *YouKnowController) DeleteLesson(ctx *gin.Context) {
	lessonId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if err := yc.KnowService.DeleteLesson(uint(lessonId)); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"status": "deleted"})
}

func (yc *YouKnowController) GetLessonByID(ctx *gin.Context) {
	lessonId, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	err, lesson := yc.KnowService.GetLessonById(uint(lessonId))

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	if lesson != nil {
		ctx.IndentedJSON(http.StatusOK, lesson)
		return
	}

	ctx.IndentedJSON(http.StatusNotFound, gin.H{"status": "fail", "message": "Element not found"})

}

func (yc *YouKnowController) PostLesson(ctx *gin.Context) {

	var lesson models.Lesson

	if err := ctx.BindJSON(&lesson); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "JWT generator error"})
	}

	if err := yc.KnowService.SaveLesson(&lesson); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusCreated, lesson)
}

func (yc *YouKnowController) PostLessonKnow(ctx *gin.Context) {

	var lessonKnow models.LessonKnow

	if err := ctx.BindJSON(&lessonKnow); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": "JWT generator error"})
	}

	if err := yc.KnowService.SaveLessonKnow(&lessonKnow); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.IndentedJSON(http.StatusCreated, lessonKnow)
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

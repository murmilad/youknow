package lesson

import (
	"time"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/types"
	log "github.com/sirupsen/logrus"
)

type forgetcurveLessonType struct {
	KnowService services.KnowProvider
	User        *models.User
	LessonType  types.LessonType
	Periods     []models.Period
}

func NewForgetcurveLessonType(user *models.User, knowService services.KnowProvider) LessonType {

	return &forgetcurveLessonType{
		KnowService: knowService,
		User:        user,
		LessonType:  types.LESSON_TYPE_FORGETCURVE,
		Periods: []models.Period{
			{AskCount: 0, NextShowInterval: "1 minute"},
			{AskCount: 1, NextShowInterval: "2 hour"},
			{AskCount: 2, NextShowInterval: "1 day"},
			{AskCount: 3, NextShowInterval: "7 day"},
		},
	}
}

// GetKnow get list of know for new lesson.
func (flt *forgetcurveLessonType) GetActualKnow(lessonId uint) (err error, know *models.Know) {

	err, know = flt.KnowService.GetKnowByPeriods(lessonId, flt.LessonType, flt.Periods)

	if err != nil {
		log.Error("Error getting Know: ", err)
	}

	return err, know
}

func (flt *forgetcurveLessonType) GetKnowCountPossible() (err error, knowCountPossible int) {
	err, knowCountPossible = flt.KnowService.GetKnowCountPossibleByDays(10, flt.User.ID, len(flt.Periods))
	if err != nil {
		log.Error("Error getting knowCountPossible: ", err)
	}
	return err, knowCountPossible
}

func (flt *forgetcurveLessonType) GetKnowCountActive() (err error, knowCountActive int) {
	err, knowCountActive = flt.KnowService.GetKnowCountWait(flt.User.ID, flt.LessonType, len(flt.Periods))
	if err != nil {
		log.Error("Error getting knowCountWait: ", err)
	}
	return err, knowCountActive
}

// isLessonActual check if lesson actual
func (flt *forgetcurveLessonType) IsLessonActual(lesson models.Lesson) bool {

	return lesson.ShowTimes == 1 && lesson.ShowAt.After(
		time.Now().Local().Add(-time.Hour*time.Duration(2))) &&
		lesson.ShowTimes == 2 && lesson.ShowAt.After(
		time.Now().Local().AddDate(0, 0, -1)) &&
		lesson.ShowTimes == 3 && lesson.ShowAt.After(
		time.Now().Local().AddDate(0, 0, -7)) &&
		lesson.ShowTimes == 4 && lesson.ShowAt.After(
		time.Now().Local().AddDate(0, -1, 0))

}

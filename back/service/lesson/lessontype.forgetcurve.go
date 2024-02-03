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
func (flt *forgetcurveLessonType) GetActualLessonKnow(lessonId uint) (err error, lessonKnow *models.LessonKnow) {

	err, lessonKnow = flt.KnowService.GetLessonKnowByPeriods(lessonId, flt.LessonType, flt.Periods)

	if err != nil {
		log.Error("Error getting Know: ", err)
	}

	return err, lessonKnow
}

func (flt *forgetcurveLessonType) GetKnowCountPossible(lessonId uint) (err error, knowCountPossible int) {
	err, knowCountPossible = flt.KnowService.GetKnowCountPossibleByDays(lessonId, flt.LessonType, 10, len(flt.Periods))
	if err != nil {
		log.Error("Error getting knowCountPossible: ", err)
		return err, 0
	}

	if knowCountPossible < 5 {
		knowCountPossible = 5
	}

	return err, knowCountPossible
}

func (flt *forgetcurveLessonType) GetKnowCountActive(lessonId uint) (err error, knowCountActive int) {
	err, knowCountActive = flt.KnowService.GetKnowCountWait(lessonId, len(flt.Periods))
	if err != nil {
		log.Error("Error getting knowCountActive: ", err)
	}
	return err, knowCountActive
}

// isLessonActual check if lesson actual
func (flt *forgetcurveLessonType) IsLessonActual(lesson models.Lesson) bool {
	log.WithFields(log.Fields{
		"Show at":   lesson.ShowAt,
		"Date":      time.Now().Local().Add(-time.Hour * time.Duration(2)),
		"ShowTimes": lesson.ShowTimes,
	}).Debug("IsLessonActual")
	return lesson.ShowTimes == 0 ||
		lesson.ShowTimes == 1 &&
			time.Now().Local().Add(-time.Hour*time.Duration(2)).
				After(lesson.ShowAt) ||
		lesson.ShowTimes == 2 &&
			time.Now().Local().AddDate(0, 0, -1).
				After(lesson.ShowAt) ||
		lesson.ShowTimes == 3 &&
			time.Now().Local().AddDate(0, 0, -7).
				After(lesson.ShowAt) ||
		lesson.ShowTimes == 4 &&
			time.Now().Local().AddDate(0, -1, 0).
				After(lesson.ShowAt)

}

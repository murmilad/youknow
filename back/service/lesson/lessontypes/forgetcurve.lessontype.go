package lessontypes

import (
	"math"
	"time"

	"akosarev.info/youknow/lesson"
	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	log "github.com/sirupsen/logrus"
)

type forgetcurveLessonType struct {
	KnowService services.KnowProvider
	User        *models.User
}

// GetKnow get list of know for new lesson.
func (flt *forgetcurveLessonType) GetKnows(count int) *[]models.Know {
	knows := []models.Know{}

	periods := []models.Period{
		{AskCount: 0, NextShowInterval: "1 minute"},
		{AskCount: 1, NextShowInterval: "2 hour"},
		{AskCount: 2, NextShowInterval: "1 day"},
		{AskCount: 3, NextShowInterval: "7 day"},
	}

	if err := flt.KnowService.GetKnowsByPeriods(&knows, flt.User.ID, periods, count); err != nil {
		log.Error("Error getting Know: ", err)
	}

	return &knows
}

// GetKnowCount Determine count of knows per 10 days for up to Month interval.
func (flt *forgetcurveLessonType) GetKnowCount() int {
	var coef float64

	if err := flt.KnowService.GetCoefKnowDays(&coef, 10, flt.User.ID, 4); err != nil {
		log.Error("Error getting KnowCount: ", err)
		return 5
	}
	if coef < 5 {
		log.Debug("KnowCount: ", 5)
		return 5
	} else {
		log.Debug("KnowCount: ", coef)
		return int(math.Ceil(coef))
	}
}

// isLessonActual check if lesson actual
func (flt *forgetcurveLessonType) IsLessonActual(lesson *models.Lesson) bool {

	return lesson.ShowTimes == 1 && lesson.ShowAt.After(
		time.Now().Local().Add(-time.Hour*time.Duration(2))) &&
		lesson.ShowTimes == 2 && lesson.ShowAt.After(
		time.Now().Local().AddDate(0, 0, -1)) &&
		lesson.ShowTimes == 3 && lesson.ShowAt.After(
		time.Now().Local().AddDate(0, 0, -7)) &&
		lesson.ShowTimes == 4 && lesson.ShowAt.After(
		time.Now().Local().AddDate(0, -1, 0))

}

func NewForgetcurveLessonType(user *models.User) lesson.LessonType {
	flt := forgetcurveLessonType{User: user}

	return &flt
}

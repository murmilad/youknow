package lesson

import (
	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/types"
)

type LessonType interface {
	IsLessonActual(lesson models.Lesson) bool
	GetActualKnow(lessonId uint) (err error, know *models.Know)
	GetKnowCountPossible() (err error, knowCountPossible int)
	GetKnowCountActive(knowTypeId uint) (err error, knowCountActive int)
}

func GetLessonType(lessonTypeDB models.LessonType, user *models.User, knowService services.KnowProvider) (lessonType LessonType) {
	switch lessonTypeDB.LessonHandler {
	case types.LESSON_TYPE_FORGETCURVE:
		lessonType = NewForgetcurveLessonType(user, knowService)
	}
	return lessonType
}

package lesson

import (
	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/types"
)

type LessonType interface {
	IsLessonActual(lesson models.Lesson) bool
	GetActualLessonKnow(lessonId uint) (err error, lessonKnow *models.LessonKnow)
	GetKnowCountPossible(lessonId uint) (err error, knowCountPossible int)
	GetKnowCountActive(lessonId uint) (err error, knowCountActive int)
}

func GetLessonType(lessonTypeDB models.LessonType, user *models.User, knowService services.KnowProvider) (lessonType LessonType) {

	switch lessonTypeDB.Handler {
	case types.LESSON_TYPE_FORGETCURVE:
		lessonType = NewForgetcurveLessonType(user, knowService)
	default:
		panic("unimplemented lessonType " + lessonTypeDB.Handler)
	}
	return lessonType
}

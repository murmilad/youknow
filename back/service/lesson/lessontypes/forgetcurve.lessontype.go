package lessontypes

import (
	"akosarev.info/youknow/lesson"
	"akosarev.info/youknow/models"
)

type forgetcurveLessonType struct {
}

// GetKnow implements lesson.LessonType.
func (*forgetcurveLessonType) GetKnow() {
	panic("unimplemented")
}

// GetKnowCount implements lesson.LessonType.
func (*forgetcurveLessonType) GetKnowCount() {
	panic("unimplemented")
}

// GetNotify implements lesson.LessonType.
func (*forgetcurveLessonType) GetNotify(lesson models.Lesson) {
	panic("unimplemented")
}

func NewForgetcurveLessonType() lesson.LessonType {
	flt := forgetcurveLessonType{}

	return &flt
}

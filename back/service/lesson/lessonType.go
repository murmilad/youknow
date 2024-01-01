package lesson

import "akosarev.info/youknow/models"

type LessonType interface {
	IsLessonActual(lesson *models.Lesson) bool
	GetKnows(count int) *[]models.Know
	GetKnowCount() int
}

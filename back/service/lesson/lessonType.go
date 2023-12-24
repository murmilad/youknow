package lesson

import "akosarev.info/youknow/models"

type LessonType interface {
	GetNotify(lesson models.Lesson)
	GetKnow(count int) *[]models.Know
	GetKnowCount() int
}

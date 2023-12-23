package lesson

import "akosarev.info/youknow/models"

type LessonType interface {
	GetNotify(lesson models.Lesson)
	GetKnow() *models.Know
	GetKnowCount() int
}

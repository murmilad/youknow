package tasks

import (
	"context"
	"time"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/taskmanager"
	"akosarev.info/youknow/types"
	log "github.com/sirupsen/logrus"
)

type taskSender struct {
	KnowService services.KnowProvider
	Lesson      *models.Lesson
	LessonKnow  *models.LessonKnow
}

func NewTaskSender(knowService services.KnowProvider, lesson *models.Lesson, lessonKnow *models.LessonKnow) taskmanager.TaskRoutine {

	t := taskSender{knowService, lesson, lessonKnow}

	return &t
}

func (ts *taskSender) Work(workers taskmanager.WorkerIface, ctx context.Context) {
	log.Debug("[SEND LESSON]")

	if ts.Lesson.LessonStatus == types.LESSON_WAIT {
		ts.Lesson.ShowTimes++
		log.WithFields(log.Fields{
			"Lesson":    ts.Lesson.KnowTypeId,
			"User":      ts.Lesson.UserID,
			"Showtimes": ts.Lesson.ShowTimes,
		}).Debug("[SEND LESSON] Increment Lesson")
	} else {
		ts.Lesson.ShowTimes = 1
		ts.Lesson.LessonStatus = types.LESSON_WAIT
		log.WithFields(log.Fields{
			"Lesson":    ts.Lesson.KnowTypeId,
			"User":      ts.Lesson.UserID,
			"Showtimes": ts.Lesson.ShowTimes,
		}).Debug("[SEND LESSON] Init showtimes")
	}
	ts.Lesson.ShowAt = time.Now().Local()

	_ = ts.KnowService.SaveLesson(ts.Lesson)

	ts.LessonKnow.AskAt = time.Now().Local()
	_ = ts.KnowService.SaveLessonKnow(ts.LessonKnow)

	log.Debug("[SEND LESSON] Send know ", ts.LessonKnow)
}

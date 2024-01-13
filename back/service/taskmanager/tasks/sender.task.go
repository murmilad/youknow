package tasks

import (
	"context"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/taskmanager"
	"akosarev.info/youknow/types"
	log "github.com/sirupsen/logrus"
)

type taskSender struct {
	KnowService services.KnowProvider
	Lesson      *models.Lesson
	Know        *models.Know
}

func NewTaskSender(knowService services.KnowProvider, lesson *models.Lesson, know *models.Know) taskmanager.TaskRoutine {
	t := taskSender{knowService, lesson, know}

	return &t
}

func (ts *taskSender) Work(workers taskmanager.WorkerIface, ctx context.Context) {
	if ts.Lesson.LessonStatus == types.LESSON_WAIT {
		ts.Lesson.ShowTimes++
		log.Debug("Increment Lesson %v User %v showtimes %v ", ts.Lesson.KnowTypeId, ts.Lesson.UserID, ts.Lesson.ShowTimes)
	} else {
		log.Debug("Drop showtimes Lesson %v User %v", ts.Lesson.KnowTypeId, ts.Lesson.UserID)
		ts.Lesson.ShowTimes = 0
		ts.Lesson.LessonStatus = types.LESSON_WAIT
	}

	_ = ts.KnowService.SaveLesson(ts.Lesson)

	log.Debug("Send know ", ts.Know)
}

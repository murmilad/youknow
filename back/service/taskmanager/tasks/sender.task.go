package tasks

import (
	"context"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/taskmanager"
	log "github.com/sirupsen/logrus"
)

type taskSender struct {
	Lesson *models.Lesson
}

func NewTaskSender(lesson *models.Lesson) taskmanager.TaskRoutine {
	t := taskSender{lesson}

	return &t
}

func (tf *taskSender) Work(workers taskmanager.WorkerIface, ctx context.Context) {
	log.Debug("Send ", tf.Lesson)
}

package tasks

import (
	"context"

	"akosarev.info/youknow/taskmanager"
	log "github.com/sirupsen/logrus"
)

type taskSender struct {
	QuestionId int
}

func NewTaskSender(i int) taskmanager.TaskRoutine {
	t := taskSender{i}

	return &t
}

func (tf *taskSender) Work(workers taskmanager.WorkerIface, ctx context.Context) {
	log.Debug("Send ", tf.QuestionId)
}

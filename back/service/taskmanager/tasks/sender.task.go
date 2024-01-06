package tasks

import (
	"context"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/taskmanager"
	log "github.com/sirupsen/logrus"
)

type taskSender struct {
	Know *models.Know
}

func NewTaskSender(know *models.Know) taskmanager.TaskRoutine {
	t := taskSender{know}

	return &t
}

func (tf *taskSender) Work(workers taskmanager.WorkerIface, ctx context.Context) {
	log.Debug("Send know ", tf.Know)
}

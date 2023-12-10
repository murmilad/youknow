package tasks

import (
	"strconv"

	"akosarev.info/youknow/taskmanager"
	log "github.com/sirupsen/logrus"
)

type taskFounder struct {
}

func NewTaskFounder() taskmanager.TaskRoutine {
	tf := taskFounder{}

	return &tf
}

func (tf *taskFounder) Work(workers taskmanager.WorkerIface) {
	log.Debug("start Founder")

	for i := 0; i < 10; i++ {
		sender := NewTaskSender(i)
		workers.QueueTask("[TASK SENTDER]"+strconv.Itoa(i), sender)
	}
}

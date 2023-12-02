package taskmanager

import (
	"strconv"

	log "github.com/sirupsen/logrus"
)

type taskFounder struct {
}

func NewTaskFounder() TaskRoutine {
	t := taskFounder{}

	return &t
}

func (tf *taskFounder) Work(workers WorkerIface){
	log.Debug("start Founder")

	for i := 0; i < 10; i++ {
		sender := NewTaskSender(i)
		workers.QueueTask("[TASK SENTDER]" + strconv.Itoa(i), sender)
	}
}
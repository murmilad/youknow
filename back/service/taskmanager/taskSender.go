package taskmanager

import (
	log "github.com/sirupsen/logrus"
)

type taskSender struct {
	QuestionId int
}

func NewTaskSender(i int) TaskRoutine {
	t := taskSender{i}

	return &t
}

func (tf *taskSender) Work(workers WorkerIface){
	log.Debug("Send ", tf.QuestionId)
}
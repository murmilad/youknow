package tasks

import (
	"context"
	"time"

	"akosarev.info/youknow/taskmanager"
	log "github.com/sirupsen/logrus"
)

type taskFounder struct {
}

func NewTaskFounder() taskmanager.TaskRoutine {
	tf := taskFounder{}

	return &tf
}

func (tf *taskFounder) Work(workers taskmanager.WorkerIface, ctx context.Context) {
	log.Debug("start Founder")

	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	for {
		log.Debug("[SEARCH LESSON]")

		//		sender := NewTaskSender(i)
		//		workers.QueueTask("[TASK SENTDER]"+strconv.Itoa(i), sender)

		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			log.Debug("[SEARCH LESSON] redo")
		}
	}
}

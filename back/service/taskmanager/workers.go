package taskmanager

import (
	"context"
	"errors"
	"sync"

	log "github.com/sirupsen/logrus"
)

type worker struct {
	workchan    chan workType
	workerCount int
	buffer      int
	wg          *sync.WaitGroup
	cancelFunc  context.CancelFunc
}

type WorkerIface interface {
	Start(pctx context.Context)
	Stop()
	QueueTask(task string, taskRoutine TaskRoutine) error
}

func New(workerCount, buffer int) WorkerIface {
	w := worker{
		workchan:    make(chan workType, buffer),
		workerCount: workerCount,
		buffer:      buffer,
		wg:          new(sync.WaitGroup),
	}

	return &w
}

func (w *worker) Start(pctx context.Context) {
	ctx, cancelFunc := context.WithCancel(pctx)
	w.cancelFunc = cancelFunc

	for i := 0; i < w.workerCount; i++ {
		w.wg.Add(1)
		go w.spawnWorkers(ctx)
	}
}

func (w *worker) Stop() {
	log.Info("stop workers")
	close(w.workchan)
	w.cancelFunc()
	w.wg.Wait()
	log.Info("all workers exited!")
}

func (w *worker) spawnWorkers(ctx context.Context) {
	defer w.wg.Done()

	// loop over workchan to pick up queued tasks.
	for work := range w.workchan {
		select {
		case <-ctx.Done():
			return
		default:
			w.doWork(ctx, work.TaskID, work.TaskRoutine)
		}
	}
}

func (w *worker) doWork(ctx context.Context, task string, taskRoutine TaskRoutine) {
	log.WithField("task", task).Debug("do some work now...")
	taskRoutine.Work(w, ctx)
	// update task management data store indicating that the work is complete!
	log.WithField("task", task).Debug("work completed!")

}

func (w *worker) QueueTask(task string, taskRoutine TaskRoutine) error {
	if len(w.workchan) >= w.buffer {
		return ErrWorkerBusy
	}

	// queue task in the workchan.
	w.workchan <- workType{TaskID: task, TaskRoutine: taskRoutine}

	return nil
}

type TaskRoutine interface {
	Work(workers WorkerIface, ctx context.Context)
}
type workType struct {
	TaskID      string
	TaskRoutine TaskRoutine
}

var (
	ErrWorkerBusy = errors.New("workers are busy, try again later")
)

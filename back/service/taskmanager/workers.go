package taskmanager
import (
	"context"
	"time"
	"sync"
	"fmt"
	"errors"
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
	QueueTask(task string, workDuration time.Duration) error
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
	fmt.Println("stop workers")
	close(w.workchan)
	w.cancelFunc()
	w.wg.Wait()
	fmt.Println("all workers exited!")
}

func (w *worker) spawnWorkers(ctx context.Context) {
	defer w.wg.Done()

	// loop over workchan to pick up queued tasks.
	for work := range w.workchan {
		select {
		case <-ctx.Done():
			return
		default:
			w.doWork(ctx, work.TaskID, work.WorkDuration)
		}
	}
}

func (w *worker) doWork(ctx context.Context, task string, workDuration time.Duration) {
	fmt.Println("task", task, "do some work now...")
	//log.WithField("task", task).Info("do some work now...")
	sleepContext(ctx, workDuration)
	// update task management data store indicating that the work is complete!
	fmt.Println("task", task, "work completed!")
	//log.WithField("task", task).Info("work completed!")

}

func sleepContext(ctx context.Context, sleep time.Duration) {
	select {
	case <-ctx.Done():
	case <-time.After(sleep):
	}
}

func (w *worker) QueueTask(task string, workDuration time.Duration) error {
	if len(w.workchan) >= w.buffer {
		return ErrWorkerBusy
	}

	// queue task in the workchan.
	w.workchan <- workType{TaskID: task, WorkDuration: workDuration}

	return nil
}

type workType struct {
	TaskID       string
	WorkDuration time.Duration
}

var (
	ErrWorkerBusy = errors.New("workers are busy, try again later")
)
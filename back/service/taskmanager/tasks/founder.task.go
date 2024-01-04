package tasks

import (
	"context"
	"time"

	"akosarev.info/youknow/lesson"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/taskmanager"
	log "github.com/sirupsen/logrus"
)

type taskFounder struct {
	KnowService services.KnowProvider
	UserService services.UserProvider
}

func NewTaskFounder(knowService services.KnowProvider, userService services.UserProvider) taskmanager.TaskRoutine {
	tf := taskFounder{
		KnowService: knowService,
		UserService: userService,
	}

	return &tf
}

func (tf *taskFounder) Work(workers taskmanager.WorkerIface, ctx context.Context) {
	log.Debug("start Founder")

	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	for {
		log.Debug("[SEARCH LESSON]")

		_, users := tf.UserService.GetUsers()

		for _, user := range users {

			_, lessonTypes := tf.KnowService.GetLessonTypes()
			for _, lessonTypeDB := range lessonTypes {
				lessonType := lesson.GetLessonType(lessonTypeDB, &user, tf.KnowService)

				_, currentKnowCount := lessonType.GetCurrentKnowCount()

				_, sentKnowCount := tf.KnowService.GetWaitKnowCount(user.ID, lessonTypeDB.LessonHandler)

				for i := 0; i < currentKnowCount-sentKnowCount; i++ {
					workers.QueueTask("[TASK SENTDER]", NewTaskSender(&lessons[0]))
				}

				_, lessons := tf.KnowService.GetActualLessonsByUserId(user.ID)

				if len(lessons) > 0 {
					if lessonType.IsLessonActual(&lessons[0]) {
					}
				} else {
					knows := lessonType.GetKnows(lessonType.GetKnowCount())
					lesson := tf.KnowService.CreateLesson(&knows)

					workers.QueueTask("[TASK SENTDER]", NewTaskSender(&lesson))
				}
			}
		}

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

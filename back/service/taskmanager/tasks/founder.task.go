package tasks

import (
	"context"
	"time"

	"akosarev.info/youknow/lesson"
	"akosarev.info/youknow/models"
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

root:
	for {
		log.Debug("[SEARCH LESSON]")

		_, users := tf.UserService.GetUsers()

		for _, user := range users {

			_, lessonTypes := tf.KnowService.GetLessonTypes()
			for _, lessonTypeDB := range lessonTypes {
				lessonType := lesson.GetLessonType(lessonTypeDB, &user, tf.KnowService)

				_, lessons := tf.KnowService.GetActualLessons(user.ID, lessonTypeDB.LessonHandler)

				for _, lesson := range lessons {

					if lessonType.IsLessonActual(lesson) {

						_, know := lessonType.GetActualKnow(lesson.Id)

						if know != nil {
							workers.QueueTask("[TASK SENTDER]", NewTaskSender(know))
							continue root
						}
					}

				}

				_, knowCountPossible := lessonType.GetKnowCountPossible()

				for _, lessonPriority := range lessons {

					_, knowCountCurrent := lessonType.GetKnowCountActive(lessonPriority.Id)
					if int(knowCountPossible/knowCountCurrent) < int(100/lessonPriority.PriorityPercent) {
						_, know := tf.KnowService.GetNewKnow(lessonPriority.KnowTypeId, lessonPriority.Id)
						if know != nil {
							lessonKnow := models.LessonKnow{
								KnowId:   know.Id,
								LessonId: lessonPriority.Id,
							}
							_ = tf.KnowService.SaveLessonKnow(lessonKnow)
							continue root
						}
					}
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

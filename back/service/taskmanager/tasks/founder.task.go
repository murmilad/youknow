package tasks

import (
	"context"
	"time"

	"akosarev.info/youknow/lesson"
	"akosarev.info/youknow/models"
	"akosarev.info/youknow/services"
	"akosarev.info/youknow/taskmanager"
	"akosarev.info/youknow/types"
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

		// Users
		_, users := tf.UserService.GetUsers()
		for _, user := range users {

			// Methons of teachering
			_, lessonTypes := tf.KnowService.GetLessonTypes()
			for _, lessonTypeDB := range lessonTypes {
				lessonType := lesson.GetLessonType(lessonTypeDB, &user, tf.KnowService)

				// Types of know
				_, lessons := tf.KnowService.GetActualLessons(user.ID, lessonTypeDB.Handler)
				for _, lesson := range lessons {

					// If lesson is used by User
					if lesson.LessonStatus == types.LESSON_STARTED ||
						lesson.LessonStatus == types.LESSON_PAUSED && lessonType.IsLessonActual(lesson) {

						// TODO dont get NEXT know if previous is not answered, maybe set lesson
						// to PAUSED while we willnt receive an answer

						// Get actual know if exist
						_, know := lessonType.GetActualKnow(lesson.Id)

						if know != nil {
							// Send know notification
							workers.QueueTask("[TASK SENTDER]", NewTaskSender(tf.KnowService, &lesson, know))
							continue root
						}
					}

				}

				// Check if need to learn a new know
				_, lessonsPriority := tf.KnowService.GetLessonsByUserId(user.ID)
				for _, lessonPriority := range lessonsPriority {
					// Get a know level (count of knows) for User
					_, knowCountPossible := lessonType.GetKnowCountPossible(lessonPriority.Id)

					// Get unfinished know count by Knowtype for User
					_, knowCountCurrent := lessonType.GetKnowCountActive(lessonPriority.Id)
					lessonCurrentCoef := 0
					if knowCountCurrent != 0 {
						lessonCurrentCoef = int(knowCountPossible / knowCountCurrent)
					}

					lessonCoef := 0
					if lessonPriority.PriorityPercent != 0 {
						lessonCoef = int(100 / lessonPriority.PriorityPercent)
					}

					// Determine which know need to add by Knowtype priority
					if lessonCurrentCoef < lessonCoef {
						_, know := tf.KnowService.GetNewKnow(lessonPriority.KnowTypeId, lessonPriority.Id)
						// Add new know to learning
						if know != nil {
							lessonKnow := models.LessonKnow{
								KnowId:   know.Id,
								LessonId: lessonPriority.Id,
							}
							_ = tf.KnowService.SaveLessonKnow(&lessonKnow)
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

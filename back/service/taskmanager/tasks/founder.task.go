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

	//	ticker := time.NewTicker(time.Minute)
	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

root:
	for {
		log.Debug("[SEARCH LESSON]")
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			log.Debug("[SEARCH LESSON] redo")
			// Users
			err, users := tf.UserService.GetUsers()
			if err != nil {
				log.Error("[SEARCH LESSON] GetUsers ERROR:", err)
				return
			}
			for _, user := range users {

				// Methons of teachering
				err, lessonTypes := tf.KnowService.GetLessonTypes()
				if err != nil {
					log.Error("[SEARCH LESSON] GetLessonTypes ERROR:", err)
					return
				}

				for _, lessonTypeDB := range lessonTypes {
					lessonType := lesson.GetLessonType(lessonTypeDB, &user, tf.KnowService)

					// Types of know
					_, lessons := tf.KnowService.GetActualLessons(user.ID, lessonTypeDB.Handler)
					for _, lesson := range lessons {
						log.WithFields(log.Fields{
							"lesson.LessonStatus":       lesson.LessonStatus,
							"lessonType.IsLessonActual": lessonType.IsLessonActual(lesson),
						}).Debug("lessonType.IsLessonActual")
						// If lesson is used by User
						if lesson.LessonStatus == types.LESSON_STARTED ||
							lesson.LessonStatus == types.LESSON_WAIT && lessonType.IsLessonActual(lesson) {

							// TODO dont get NEXT know if previous is not answered, maybe set lesson
							// to PAUSED while we willnt receive an answer

							// Get actual know if exist
							err, lessonKnow := lessonType.GetActualLessonKnow(lesson.Id)
							if err != nil {
								log.Error("[SEARCH LESSON] GetActualLessonKnow ERROR:", err)
								continue root
							}

							if lessonKnow != nil {
								// Send know notification
								log.Debug("[SEARCH LESSON] start sender task for Know ", lessonKnow.KnowId)

								workers.QueueTask("[TASK SENDER]", NewTaskSender(tf.KnowService, &lesson, lessonKnow))
								continue root
							}
						}

					}

					// Check if need to learn a new know
					err, lessonsPriority := tf.KnowService.GetLessonsByUserId(user.ID)
					if err != nil {
						log.Error("[SEARCH LESSON] GetLessonsByUserId ERROR:", err)
						continue root
					}
					for _, lessonPriority := range lessonsPriority {
						// Get a know level (count of knows) for User
						err, knowCountPossible := lessonType.GetKnowCountPossible(lessonPriority.Id)
						if err != nil {
							log.Error("[SEARCH LESSON] GetKnowCountPossible ERROR:", err)
							continue root
						}

						// Get unfinished know count by Knowtype for User
						err, knowCountCurrent := lessonType.GetKnowCountActive(lessonPriority.Id)
						if err != nil {
							log.Error("[SEARCH LESSON] GetKnowCountActive ERROR:", err)
							continue root
						}
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
							err, know := tf.KnowService.GetNewKnow(lessonPriority.KnowTypeId, lessonPriority.Id)
							if err != nil {
								log.Error("[SEARCH LESSON] GetNewKnow ERROR:", err)
								continue root
							}
							// Add new know to learning
							if know != nil {
								log.Debug("[SEARCH LESSON] create lesson for know ", know.Id)

								lessonKnow := models.LessonKnow{
									KnowId:     know.Id,
									KnowStatus: types.KNOW_NEW,
									LessonId:   lessonPriority.Id,
								}
								err = tf.KnowService.CreateLessonKnow(&lessonKnow)
								if err != nil {
									log.Error("[SEARCH LESSON] CreateLessonKnow ERROR:", err)
									continue root
								}
								continue root
							}
						}
					}

				}
			}

			//		sender := NewTaskSender(i)
			//		workers.QueueTask("[TASK SENTDER]"+strconv.Itoa(i), sender)
		}

	}
}

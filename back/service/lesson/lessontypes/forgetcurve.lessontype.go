package lessontypes

import (
	"math"

	"akosarev.info/youknow/lesson"
	"akosarev.info/youknow/models"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type forgetcurveLessonType struct {
	DB   *gorm.DB
	User *models.User
}

// GetKnow get list of know for new lesson.
func (flt *forgetcurveLessonType) GetKnow(count int) *[]models.Know {
	knows := []models.Know{}
	err := flt.DB.Raw(`
			SELECT knows.*, count(lessons_knows.lesson_id) AS right_count, max(lessons_knows_right.ask_at) AS last_ask_at FROM knows
				LEFT JOIN lessons
					ON lessons_knows.lesson_id = lessons.id
				LEFT JOIN (
					SELECT know_id, max(ask_at) AS ask_at wrong_at FROM lessons_knows
							ON knows.id = lessons_knows.know_id AND 
						INNER JOIN lessons
							ON lessons_knows.lesson_id = lessons.id
					WHERE 
						know_status = 'KNOW_WRONG'
						AND user_id = ?	
					GROUP BY know_id
				) lessons_knows_wrong
					ON knows.id = lessons_knows_wrong.know_id
				LEFT JOIN lessons_knows_right
					ON 
						knows.id = lessons_knows.know_id 
						AND (
							lessons_knows.ask_at IS NULL 
							OR lessons_knows.ask_at >= lessons_knows_wrong.ask_at)
						AND know_status = 'KNOW_RIGHT'

			WHERE lessons.user_id = ? AND lessons_knows_right != 'KNOW_NEW'
			GROUP BY knows.*
			HAVING 
				right_count == 0 AND last_ask_at > CURRENT_DATE - interval '1 minute'
				OR  right_count == 1 AND last_ask_at > CURRENT_DATE - interval '2 hour'
				OR  right_count == 2 AND last_ask_at > CURRENT_DATE - interval '1 day'
				OR  right_count == 3 AND last_ask_at > CURRENT_DATE - interval '7 day'
			SORT last_ask_at
			LIMIT ?

	`, flt.User.ID, flt.User.ID, count).Find(&knows)

	if err != nil {
		log.Error("Error getting Know: ", err)
	}

	return &knows
}

// GetKnowCount Determine count of knows per 10 days for up to Month interval.
func (flt *forgetcurveLessonType) GetKnowCount() int {
	type Count struct {
		Count float64
		Days  float64
	}
	var count Count

	err := flt.DB.Raw(`
		SELECT count(learned_knows.id) AS count, CURRENT_DATE - min(learned_knows.first_ask) AS days FROM 
			(
				SELECT knows.id, count(lessons_knows.lesson_id) lessons, min(lessons_knows.ask_at) first_ask knows
					INNER JOIN lessons_knows 
						ON knows.id = lessons_knows.know_id
					INNER JOIN lessons
						ON lessons_knows.lesson_id = lessons.id
				WHERE 
					know_status = 'KNOW_RIGHT' 
					AND ask_at > CURRENT_DATE - 30
					AND lessons.user_id = ?
				GROUP BY knows.id
			) learned_knows
		WHERE learned_knows.lessons > ?
	`, flt.User.ID, 4).Scan(&count)

	if err != nil {
		log.Error("Error getting KnowCount: ", err)
		return 5
	}
	knowCount := int(math.Ceil(count.Count * 10 / count.Days))
	if knowCount < 5 {
		log.Debug("KnowCount: ", 5)
		return 5
	} else {
		log.Debug("KnowCount: ", knowCount)
		return knowCount
	}
}

// GetNotify implements lesson.LessonType.
func (flt *forgetcurveLessonType) GetNotify(lesson models.Lesson) {
	panic("unimplemented")
}

func NewForgetcurveLessonType(user *models.User) lesson.LessonType {
	flt := forgetcurveLessonType{User: user}

	return &flt
}

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

// GetKnow implements lesson.LessonType.
func (flt *forgetcurveLessonType) GetKnow() *models.Know {
	panic("unimplemented")
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

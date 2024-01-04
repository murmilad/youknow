package providersgorm

import (
	"mime/multipart"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/types"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type knowProvider struct {
	DB *gorm.DB
}

func (p *knowProvider) AddKnowsFromFile(file multipart.File, knowTypeId uint) (loadedCount int, duplicatedCount int, err error) {
	panic("unimplemented")
}

func NewKnowProvider(DB *gorm.DB) *knowProvider {
	return &knowProvider{DB}
}

func (p *knowProvider) GetKnowtypesByUser(knowtypes *[]models.KnowTypeResponse, user *models.User) (err error) {
	result := p.DB.Order("id").Find(&knowtypes, "user_id = ? AND deleted = false", user.ID)
	return result.Error
}

func (p *knowProvider) SaveKnowtype(knowtype *models.KnowType) (err error) {
	result := p.DB.Save(&knowtype)
	return result.Error
}

func (p *knowProvider) GetKnowtypesById(knowtypes *[]models.KnowTypeResponse, id uint) (err error) {
	result := p.DB.Find(&knowtypes, "id = ? AND deleted = false", id)
	return result.Error
}

func (p *knowProvider) DeleteKnowtype(id uint) (err error) {
	result := p.DB.Save(&models.KnowType{Id: id, Deleted: true})
	return result.Error
}

func (p *knowProvider) GetKnowsByData(knows *[]models.Know, name string, value string, knowTypeId uint) (err error) {
	result := p.DB.Where("knowtype_id = ? AND deleted = false AND LOWER(TRIM(name)) = LOWER(TRIM(?)) AND LOWER(TRIM(value)) = LOWER(TRIM(?))",
		knowTypeId, name, value).
		Find(&knows)
	return result.Error
}

func (p *knowProvider) SaveKnow(know *models.Know) (err error) {
	result := p.DB.Save(&know)
	return result.Error
}

func (p *knowProvider) GetKnowsById(knows *[]models.Know, id uint) (err error) {
	result := p.DB.Find(knows, "id = ? AND deleted = false", id)
	return result.Error
}

func (p *knowProvider) DeleteKnow(id uint) (err error) {
	result := p.DB.Save(&models.Know{Id: id, Deleted: true})
	return result.Error
}

func (p *knowProvider) GetKnowsByKnowtypeId(knows *[]models.Know, knowTypeId uint) (err error) {
	result := p.DB.Order("id desc").Find(knows, "knowtype_id = ? AND deleted = false", knowTypeId)
	return result.Error
}

func (p *knowProvider) GetKnowsByPeriods(knows *[]models.Know, userId uuid.UUID, periods []models.Period, count int) (err error) {
	query := p.DB.Raw(`
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
					AND lesson_type_handler = 'FORGET_CURVE'
				GROUP BY know_id
			) AS lessons_knows_wrong
				ON knows.id = lessons_knows_wrong.know_id
			LEFT JOIN lessons_knows AS lessons_knows_right
				ON 
					knows.id = lessons_knows.know_id 
					AND (
						lessons_knows.ask_at IS NULL 
						OR lessons_knows.ask_at >= lessons_knows_wrong.ask_at)
					AND know_status = 'KNOW_RIGHT'

		WHERE 
			lessons.user_id = ?
			AND lessons_knows_right != 'KNOW_NEW'
			AND lesson_type_handler = 'FORGET_CURVE'
		GROUP BY knows.*
	`, userId, userId, count)
	for index, period := range periods {
		having := p.DB.Where("right_count = ?", period.AskCount).Where("last_ask_at > CURRENT_DATE - " + period.NextShowInterval)
		if index == 0 {
			query = query.Having(having)
		} else {
			query = query.Or(having)
		}
	}
	result := query.Limit(count).Find(knows)

	return result.Error
}

func (p *knowProvider) GetCurrentKnowCountByDays(days int, userId uuid.UUID, maxRightAnswerTimes int) (err error, knowCount int) {
	knows := float64(0)

	result := p.DB.Raw(`
		SELECT count(learned_knows.id) / NULLIF(CURRENT_DATE - min(learned_knows.first_ask), 0) * ? AS know_count to days FROM 
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
					AND lesson_type_handler = 'FORGET_CURVE'
				GROUP BY knows.id
			) learned_knows
		WHERE learned_knows.lessons > ?
	`, days, userId, maxRightAnswerTimes).Scan(&knows)
	return result.Error, int(knows)
}

func (p *knowProvider) GetActualLessonsByUserId(userId uuid.UUID) (err error, lessons []models.Lesson) {
	result := p.DB.Find(lessons, "user_id = ? AND deleted = false AND lesson_status != 'LESSON_FINISHED'", userId)
	return result.Error, lessons
}

func (p *knowProvider) GetLessonTypes() (err error, lessonTypes []models.LessonType) {
	result := p.DB.Find(lessonTypes, "deleted = false")
	return result.Error, lessonTypes
}

func (p *knowProvider) GetWaitKnowCount(userId uuid.UUID, lessonHandler types.LessonType) (err error, waitKnowCount int) {
	result := p.DB.Raw(``, userId).Scan(&waitKnowCount)
	return result.Error, waitKnowCount

}

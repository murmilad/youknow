package providersgorm

import (
	"database/sql"
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
	result := p.DB.Model(&models.KnowType{Id: id}).Update("deleted", true)
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
	result := p.DB.Model(&models.Know{Id: id}).Update("deleted", true)
	return result.Error
}

func (p *knowProvider) GetKnowsByKnowtypeId(knows *[]models.Know, knowTypeId uint) (err error) {
	result := p.DB.Order("id desc").Find(knows, "knowtype_id = ? AND deleted = false", knowTypeId)
	return result.Error
}

func (p *knowProvider) GetKnowByPeriods(lessonId uint, lessonType types.LessonType, periods []models.Period) (err error, know *models.Know) {
	know = &models.Know{}

	query := p.DB.Raw(`
		SELECT knows.*, count(lessons_knows_right.id) AS right_count, max(lessons_knows_right.ask_at) AS last_ask_at FROM knows
			INNER JOIN lessons
				ON lessons_knows.lesson_id = lessons.id
			LEFT JOIN (
				SELECT know_id, max(ask_at) AS ask_at FROM lessons_knows
					INNER JOIN lessons
						ON lessons_knows.lesson_id = lessons.id
				WHERE 
					know_status = @knowStatusWrong
					AND lesson_type_handler = @lessonType
					AND lessons_knows.lesson_id = @lessonId
				GROUP BY know_id
			) AS lessons_knows_wrong
				ON knows.id = lessons_knows_wrong.know_id
			LEFT JOIN lessons_knows AS lessons_knows_right
				ON 
					knows.id = lessons_knows_right.know_id 
					AND (
						lessons_knows_right.ask_at IS NULL 
						OR lessons_knows_right.ask_at >= lessons_knows_wrong.ask_at)
					AND know_status = @knowStatusRight
		WHERE 
			lessons_knows.know_status != @knowStatusNew
			AND lesson_type_handler = @lessonType
			AND lessons_knows.lesson_id = @lessonId
		GROUP BY knows.*
	`, sql.Named("lessonId", lessonId),
		sql.Named("lessonType", lessonType),
		sql.Named("knowStatusWrong", types.KNOW_WRONG),
		sql.Named("knowStatusRight", types.KNOW_RIGHT),
		sql.Named("knowStatusNew", types.KNOW_NEW))

	for index, period := range periods {
		having := p.DB.Where("right_count = ?", period.AskCount).Where("last_ask_at > CURRENT_DATE - " + period.NextShowInterval)
		if index == 0 {
			query = query.Having(having)
		} else {
			query = query.Or(having)
		}
	}
	result := query.First(know)
	if result.Error != nil && result.Error.Error() == "record not found" {
		return nil, nil
	}

	return result.Error, know
}

func (p *knowProvider) GetKnowCountPossibleByDays(lessonId uint, lessonType types.LessonType, days int, maxRightAnswerTimes int) (err error, knowCount int) {
	knows := float64(0)

	result := p.DB.Raw(`
		SELECT sum(learned_knows.id) / 
				CASE extract(DAY FROM CURRENT_DATE - min(learned_knows.first_ask)) 
					WHEN 0 THEN 1 
					ELSE extract(DAY FROM CURRENT_DATE - min(learned_knows.first_ask))
				END
				 * @days AS know_count  FROM 
			(
				SELECT knows.id, count(lessons_knows.id) AS lessons_count, min(lessons_knows.ask_at) AS first_ask FROM lessons_knows
					INNER JOIN knows 
						ON lessons_knows.know_id = knows.id
				WHERE 
					know_status = @knowStatusRight 
					AND ask_at > CURRENT_DATE - 30
					AND lessons_knows.lesson_id = @lessonId
					AND lesson_type_handler = @lessonType
				GROUP BY knows.id
				HAVING count(lessons_knows.id) > @maxRightAnswerTimes
			) learned_knows
		GROUP BY learned_knows.id
	`,
		sql.Named("days", days),
		sql.Named("knowStatusRight", types.KNOW_RIGHT),
		sql.Named("lessonId", lessonId),
		sql.Named("lessonType", lessonType),
		sql.Named("maxRightAnswerTimes", maxRightAnswerTimes)).Scan(&knows)
	return result.Error, int(knows)
}

func (p *knowProvider) GetActualLessons(userId uuid.UUID, lessonType types.LessonType) (err error, lessons []models.Lesson) {
	lessons = []models.Lesson{}
	result := p.DB.Find(&lessons, "user_id = ? AND deleted = false AND lesson_status != ? AND lesson_type_handler = ?", userId, types.LESSON_WAIT, lessonType)
	return result.Error, lessons
}

func (p *knowProvider) GetLessonTypes() (err error, lessonTypes []models.LessonType) {
	lessonTypes = []models.LessonType{}
	result := p.DB.Find(&lessonTypes, "deleted = false")
	return result.Error, lessonTypes
}

func (p *knowProvider) GetKnowCountWait(lessonId uint, maxRightAnswerTimes int) (err error, waitKnowCount int) {
	knows := []models.Know{}

	result := p.DB.Raw(`
		SELECT knows.* FROM knows
			INNER JOIN lessons_knows
				ON lessons_knows.know_id = knows.id
			LEFT JOIN (
				SELECT know_id, max(ask_at) AS ask_at FROM lessons_knows
				WHERE 
					know_status = @knowStatusWrong
					AND lesson_id = @lessonId
				GROUP BY know_id
			) AS lessons_knows_wrong
				ON knows.id = lessons_knows_wrong.know_id
			LEFT JOIN lessons_knows AS lessons_knows_right
				ON 
					knows.id = lessons_knows_right.know_id 
					AND (
						lessons_knows_right.ask_at IS NULL 
						OR lessons_knows_right.ask_at >= lessons_knows_wrong.ask_at)
					AND lessons_knows.know_status = @knowStatusRight
		WHERE
			lessons_knows.lesson_id = @lessonId
		GROUP BY knows.id
		HAVING
			count(lessons_knows_right.id) < @maxRightAnswerTimes
	`, sql.Named("lessonId", lessonId),
		sql.Named("knowStatusWrong", types.KNOW_WRONG),
		sql.Named("knowStatusRight", types.KNOW_RIGHT),
		sql.Named("knowStatusNew", types.KNOW_NEW),
		sql.Named("maxRightAnswerTimes", maxRightAnswerTimes)).Find(&knows)

	return result.Error, len(knows)

}

func (p *knowProvider) GetNewKnow(knowTypeId uint, lessonId uint) (err error, know *models.Know) {
	know = &models.Know{}
	result := p.DB.Raw(`
		SELECT knows.* FROM knows
			LEFT JOIN lessons_knows
				ON knows.id = lessons_knows.id
					AND lessons_knows.lesson_id = @lessonId
		WHERE 
			lessons_knows.know_id IS NULL
			AND knows.knowtype_id = @knowTypeId
		ORDER BY knows.id
		LIMIT 1
	`, sql.Named("lessonId", lessonId),
		sql.Named("knowTypeId", knowTypeId)).First(know)

	if result.Error != nil && result.Error.Error() == "record not found" {
		return nil, nil
	}

	return result.Error, know
}

func (p *knowProvider) GetLessonsByUserId(userId uuid.UUID) (err error, lessons []models.Lesson) {
	lessons = []models.Lesson{}
	result := p.DB.Order("id").Find(&lessons, "user_id = ? AND deleted = false", userId)
	return result.Error, lessons
}

func (p *knowProvider) DeleteLesson(lessonId uint) (err error) {
	result := p.DB.Model(&models.Lesson{Id: lessonId}).Update("deleted", true)
	return result.Error
}

func (p *knowProvider) GetLessonById(lessonId uint) (err error, lesson *models.Lesson) {
	lesson = &models.Lesson{}
	result := p.DB.First(lesson, "id = ? AND deleted = false", lessonId)
	if result.Error != nil && result.Error.Error() == "record not found" {
		return nil, nil
	}

	return result.Error, lesson
}

func (p *knowProvider) SaveLesson(lesson *models.Lesson) (err error) {
	result := p.DB.Save(&lesson)
	return result.Error
}

func (p *knowProvider) Transaction(operations func() (err error)) (err error) {
	return p.DB.Transaction(func(tx *gorm.DB) error {
		return operations()
	})
}

func (p *knowProvider) SaveLessonKnow(lessonKnow *models.LessonKnow) (err error) {
	result := p.DB.Save(&lessonKnow)
	return result.Error
}

func (p *knowProvider) CreateLessonKnow(lessonKnow *models.LessonKnow) (err error) {
	result := p.DB.Create(&lessonKnow)
	return result.Error
}

package services

import (
	"bytes"
	"encoding/csv"
	"io"
	"mime/multipart"
	"strings"

	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"

	"akosarev.info/youknow/models"
	"akosarev.info/youknow/types"
)

type KnowProvider interface {
	GetKnowtypesByUser(knowtypes *[]models.KnowTypeResponse, user *models.User) (err error)
	SaveKnowtype(knowtype *models.KnowType) (err error)
	GetKnowtypesById(knowtypes *[]models.KnowTypeResponse, id uint) (err error)
	DeleteKnowtype(id uint) (err error)

	AddKnowsFromFile(file multipart.File, knowTypeId uint) (loadedCount int, duplicatedCount int, err error)
	GetKnowsByData(knows *[]models.Know, name string, value string, knowTypeId uint) (err error)
	SaveKnow(know *models.Know) (err error)
	GetKnowsById(knows *[]models.Know, id uint) (err error)
	GetKnowsByKnowtypeId(knows *[]models.Know, knowTypeId uint) (err error)
	DeleteKnow(id uint) (err error)
	GetKnowByPeriods(lessonId uint, lessonType types.LessonType, periods []models.Period) (err error, know *models.Know)
	GetKnowCountPossibleByDays(lessonId uint, lessonType types.LessonType, days int, maxRightAnswerTimes int) (err error, knowCount int)
	GetActualLessons(userId uuid.UUID, lessonType types.LessonType) (err error, lessons []models.Lesson)
	GetLessonTypes() (err error, lessonTypes []models.LessonType)
	GetKnowCountWait(lessonId uint, maxRightAnswerTimes int) (err error, waitKnowCount int)
	GetNewKnow(knowTypeId uint, lessonId uint) (err error, know *models.Know)

	GetLessonsByUserId(userId uuid.UUID) (err error, lessons []models.Lesson)
	DeleteLesson(lessonId uint) (err error)
	GetLessonById(lessonId uint) (err error, lesson *models.Lesson)
	SaveLesson(lesson *models.Lesson) (err error)

	SaveLessonKnow(lessonKnow *models.LessonKnow) (err error)

	Transaction(operations func() (err error)) (err error)
}

type knowService struct {
	KnowProvider KnowProvider
}

func NewKnowService(p KnowProvider) *knowService {
	return &knowService{
		KnowProvider: p,
	}
}

func (s *knowService) GetKnowtypesByUser(knowtypes *[]models.KnowTypeResponse, user *models.User) (err error) {
	return s.KnowProvider.GetKnowtypesByUser(knowtypes, user)
}

func (s *knowService) SaveKnowtype(knowtype *models.KnowType) (err error) {
	newKnowtype := knowtype.Id == 0

	log.Debug("new knowtype.Id = ", knowtype.Id)

	if err = s.KnowProvider.SaveKnowtype(knowtype); err != nil {
		return err
	}

	if newKnowtype {
		lesson := models.Lesson{
			KnowTypeId:        knowtype.Id,
			UserID:            knowtype.UserID,
			LessonStatus:      types.LESSON_PAUSED,
			LessonTypeHandler: types.LESSON_TYPE_FORGETCURVE,
			ShowTimes:         0,
		}
		if err = s.SaveLesson(&lesson); err != nil {
			return err
		}
	}

	return nil
}

func (s *knowService) GetKnowtypesById(knowtypes *[]models.KnowTypeResponse, id uint) (err error) {
	return s.KnowProvider.GetKnowtypesById(knowtypes, id)
}

func (s *knowService) DeleteKnowtype(id uint) (err error) {
	return s.KnowProvider.DeleteKnowtype(id)
}

func (s *knowService) AddKnowsFromFile(file multipart.File, knowTypeId uint) (loadedCount int, duplicatedCount int, err error) {
	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file); err != nil {
		return 0, 0, err
	}

	/* 	file, err := ctx.FormFile("file")
	   	if err != nil {
	   		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
	   		return
	   	}

	   	src, err := file.Open()
	   	if err != nil {
	   		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
	   		return
	   	}
	*/
	/* 	log.Println("file ", string(buf.Bytes()))
		in := `first_name|last_name|username
	"Rob"|"Pike"|rob
	# lines beginning with a # character are ignored
	Ken|Thompson|ken
	"Robert"|"Griesemer"|"gri"
	`
	*/
	r := csv.NewReader(
		strings.NewReader(
			strings.ReplaceAll(
				strings.ReplaceAll(
					strings.ReplaceAll(
						strings.ReplaceAll(string(buf.Bytes()),
							`"`, `""`),
						`\\`, `<DOUBLESLASH>`),
					`\`, `"`),
				`<DOUBLESLASH>`, `\`)))

	r.Comma = '|'
	r.Comment = '#'

	records, err := r.ReadAll()
	if err != nil {
		return 0, 0, err
	}
	log.Debug("loaded data:", records)

	for _, record := range records {
		if record[0] != "" && record[1] != "" {

			var knows []models.Know

			err = s.KnowProvider.GetKnowsByData(&knows, record[0], record[1], knowTypeId)
			if err != nil {
				return 0, 0, err
			}

			if len(knows) > 0 {
				duplicatedCount++
			} else {
				log.Debug("record: ", record[0], record[1])
				loadedCount++
				var know models.Know
				know.KnowtypeId = knowTypeId
				know.Name = record[0]
				know.Value = record[1]
				err = s.KnowProvider.SaveKnow(&know)
				if err != nil {
					return loadedCount, duplicatedCount, err
				}
			}
		}
	}
	return loadedCount, duplicatedCount, nil
}

func (s *knowService) GetKnowsByKnowtypeId(knows *[]models.Know, knowTypeId uint) (err error) {
	return s.KnowProvider.GetKnowsByKnowtypeId(knows, knowTypeId)
}

func (s *knowService) GetKnowsById(knows *[]models.Know, id uint) (err error) {
	return s.KnowProvider.GetKnowsById(knows, id)
}

func (s *knowService) DeleteKnow(id uint) (err error) {
	return s.KnowProvider.DeleteKnow(id)
}

func (s *knowService) GetKnowsByData(knows *[]models.Know, name string, value string, knowTypeId uint) (err error) {
	return s.KnowProvider.GetKnowsByData(knows, name, name, knowTypeId)
}

func (s *knowService) SaveKnow(know *models.Know) (err error) {
	return s.KnowProvider.SaveKnow(know)
}

func (s *knowService) GetKnowByPeriods(lessonId uint, lessonType types.LessonType, periods []models.Period) (err error, know *models.Know) {
	return s.KnowProvider.GetKnowByPeriods(lessonId, lessonType, periods)
}

func (s *knowService) GetKnowCountPossibleByDays(lessonId uint, lessonType types.LessonType, days int, maxRightAnswerTimes int) (err error, knowCount int) {

	return s.KnowProvider.GetKnowCountPossibleByDays(lessonId, lessonType, days, maxRightAnswerTimes)
}

func (s *knowService) GetActualLessons(userId uuid.UUID, lessonType types.LessonType) (err error, lessons []models.Lesson) {
	return s.KnowProvider.GetActualLessons(userId, lessonType)
}

func (s *knowService) GetLessonTypes() (err error, lessonTypes []models.LessonType) {

	return s.KnowProvider.GetLessonTypes()
}

func (s *knowService) GetKnowCountWait(lessonId uint, maxRightAnswerTimes int) (err error, waitKnowCount int) {
	return s.KnowProvider.GetKnowCountWait(lessonId, maxRightAnswerTimes)
}

func (s *knowService) GetNewKnow(knowTypeId uint, lessonId uint) (err error, know *models.Know) {

	return s.KnowProvider.GetNewKnow(knowTypeId, lessonId)

}

func (s *knowService) GetLessonsByUserId(userId uuid.UUID) (err error, lessons []models.Lesson) {
	return s.KnowProvider.GetLessonsByUserId(userId)
}
func (s *knowService) DeleteLesson(lessonId uint) (err error) {
	err, lessonCurrent := s.KnowProvider.GetLessonById(lessonId)
	if err != nil {
		return err
	}

	if lessonCurrent != nil {

		err = s.KnowProvider.Transaction(func() (err error) {
			if err := s.KnowProvider.DeleteLesson(lessonId); err != nil {
				return err
			}

			err, lessons := s.KnowProvider.GetLessonsByUserId(lessonCurrent.UserID)
			if err != nil {
				return err
			}

			for _, lessonOther := range lessons {
				lessonOther.PriorityPercent += uint(int(lessonOther.PriorityPercent) / 100 * 100 / (len(lessons) + 1))

				if err := s.KnowProvider.SaveLesson(&lessonOther); err != nil {
					return err
				}
			}
			return
		})
		return err
	}
	return
}

func (s *knowService) GetLessonById(lessonId uint) (err error, lesson *models.Lesson) {
	return s.KnowProvider.GetLessonById(lessonId)
}
func (s *knowService) SaveLesson(lessonNew *models.Lesson) (err error) {
	log.Debug("saveLesson lesson.Id = ", lessonNew.Id)

	if lessonNew.Id != 0 { // Update exists lesson
		err, lessonOld := s.KnowProvider.GetLessonById(lessonNew.Id)
		if err != nil {
			return err
		}

		if lessonOld.PriorityPercent == lessonNew.PriorityPercent {
			return s.KnowProvider.SaveLesson(lessonNew)
		} else {
			err, lessons := s.KnowProvider.GetLessonsByUserId(lessonNew.UserID)
			if err != nil {
				return err
			}

			err = s.KnowProvider.Transaction(func() (err error) {

				for _, lessonOther := range lessons {
					if lessonOther.Id != lessonOld.Id {
						lessonOther.PriorityPercent += uint(lessonOther.PriorityPercent / 100 * (lessonOld.PriorityPercent - lessonNew.PriorityPercent))

						if err := s.KnowProvider.SaveLesson(&lessonOther); err != nil {
							return err
						}
					}
				}

				return s.KnowProvider.SaveLesson(lessonNew)
			})
			return err
		}
	} else { // Create new lesson
		err, lessons := s.KnowProvider.GetLessonsByUserId(lessonNew.UserID)
		if err != nil {
			return err
		}

		err = s.KnowProvider.Transaction(func() (err error) {

			for _, lessonOther := range lessons {
				lessonOther.PriorityPercent -= uint(int(lessonOther.PriorityPercent) / 100 * 100 / (len(lessons) + 1))

				if err := s.KnowProvider.SaveLesson(&lessonOther); err != nil {
					return err
				}
			}

			lessonNew.PriorityPercent = uint(100 / (len(lessons) + 1))
			return s.KnowProvider.SaveLesson(lessonNew)
		})
		return err

	}
}

func (s *knowService) SaveLessonKnow(lessonKnow *models.LessonKnow) (err error) {
	return s.KnowProvider.SaveLessonKnow(lessonKnow)
}

func (s *knowService) Transaction(operations func() (err error)) (err error) {
	return s.KnowProvider.Transaction(operations)
}

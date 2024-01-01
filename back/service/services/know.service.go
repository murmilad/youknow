package services

import (
	"bytes"
	"encoding/csv"
	"io"
	"mime/multipart"
	"strings"

	log "github.com/sirupsen/logrus"

	"akosarev.info/youknow/models"
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
	return s.KnowProvider.SaveKnowtype(knowtype)
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

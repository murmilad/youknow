package providersgorm

import (
	"mime/multipart"

	"akosarev.info/youknow/models"
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

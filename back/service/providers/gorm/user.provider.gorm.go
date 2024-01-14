package providersgorm

import (
	"strings"

	"akosarev.info/youknow/models"
	"gorm.io/gorm"
)

type userProvider struct {
	DB *gorm.DB
}

func NewUserProvider(DB *gorm.DB) *userProvider {
	return &userProvider{DB}
}

func (p *userProvider) SaveUser(user *models.User) (err error) {
	result := p.DB.Save(user)

	return result.Error
}

func (p *userProvider) GetUnverifiedUser(user *models.User, email string) (err error) {
	result := p.DB.Where("email = ? AND provider = ? AND verified = ?",
		strings.ToLower(email),
		"local",
		false).First(user)

	return result.Error
}

func (p *userProvider) GetUsersByProvider(users *[]models.User, email string, provider string) (err error) {
	result := p.DB.Find(&users, "email = ?  AND provider = ?", email, provider)
	return result.Error
}

func (p *userProvider) GetUser(user *models.User, email string) (err error) {
	result := p.DB.First(user, "email = ?", strings.ToLower(email))
	return result.Error
}

func (p *userProvider) GetUsers() (err error, users []models.User) {
	users = []models.User{}
	result := p.DB.Find(&users, "deleted = false")
	return result.Error, users
}

func (p *userProvider) GetUserForVerification(user *models.User, verifyHash string) (err error) {
	result := p.DB.First(&user, "verification_code = ?", verifyHash)
	return result.Error
}

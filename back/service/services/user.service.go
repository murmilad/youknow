package services

import "akosarev.info/youknow/models"

type UserProvider interface {
	SaveUser(*models.User) (err error)
	GetUnverifiedUser(user *models.User, email string) (err error)
	GetUsersByProvider(users *[]models.User, email string, provider string) (err error)
	GetUser(user *models.User, email string) (err error)
	GetUserForVerification(user *models.User, verifyHash string) (err error)
	GetUsers() (err error, users []models.User)
}

type userService struct {
	UserProvider UserProvider
}

func NewUserService(p UserProvider) *userService {
	return &userService{
		UserProvider: p,
	}
}

func (s *userService) SaveUser(user *models.User) (err error) {
	return s.UserProvider.SaveUser(user)
}

func (s *userService) GetUnverifiedUser(user *models.User, email string) (err error) {
	return s.UserProvider.GetUnverifiedUser(user, email)
}
func (s *userService) GetUsersByProvider(users *[]models.User, email string, provider string) (err error) {
	return s.UserProvider.GetUsersByProvider(users, email, provider)
}
func (s *userService) GetUser(user *models.User, email string) (err error) {
	return s.UserProvider.GetUser(user, email)
}
func (s *userService) GetUsers() (err error, users []models.User) {
	return s.UserProvider.GetUsers()
}
func (s *userService) GetUserForVerification(user *models.User, verifyHash string) (err error) {
	return s.UserProvider.GetUserForVerification(user, verifyHash)
}

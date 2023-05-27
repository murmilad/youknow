package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID               uuid.UUID `gorm:"type:uuid;default:gen_random_uuid();primary_key"`
	Name             string    `gorm:"type:varchar(255);not null"`
	Email            string    `gorm:"uniqueIndex;not null"`
	Password         string    `gorm:"not null"`
	Role             string    `gorm:"type:varchar(255);not null"`
	Provider         string    `gorm:"not null"`
	Photo            string    `gorm:"not null"`
	VerificationCode string
	Verified         bool      `gorm:"not null"`
	CreatedAt        time.Time `gorm:"not null"`
	UpdatedAt        time.Time `gorm:"not null"`
}

type ChangePasswordInput struct {
	VerifyHash      string `json:"verifyHash"`
	Password        string `json:"password" binding:"required,min=8"`
	PasswordConfirm string `json:"passwordConfirm" binding:"required"`
}
type SignUpInput struct {
	Name            string `json:"name" binding:"required"`
	Email           string `json:"email" binding:"required"`
	Password        string `json:"password" binding:"required,min=8"`
	PasswordConfirm string `json:"passwordConfirm" binding:"required"`
	Provider        string `json:"provider,omitempty"`
	Photo           string `json:"photo,omitempty"`
}

type SignInInput struct {
	Email    string `json:"email"  binding:"required"`
	Password string `json:"password"  binding:"required"`
}

type ForgotInput struct {
	Email string `json:"email"  binding:"required"`
}
type UserResponse struct {
	ID        uuid.UUID `json:"id,omitempty"`
	Name      string    `json:"name,omitempty"`
	Email     string    `json:"email,omitempty"`
	Role      string    `json:"role,omitempty"`
	Photo     string    `json:"photo,omitempty"`
	Provider  string    `json:"provider"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type UpdateDBUser struct {
	ID              uuid.UUID `json:"id,omitempty" bson:"_id,omitempty"`
	Name            string    `json:"name,omitempty" bson:"name,omitempty"`
	Email           string    `json:"email,omitempty" bson:"email,omitempty"`
	Password        string    `json:"password,omitempty" bson:"password,omitempty"`
	PasswordConfirm string    `json:"passwordConfirm,omitempty" bson:"passwordConfirm,omitempty"`
	Role            string    `json:"role,omitempty" bson:"role,omitempty"`
	Provider        string    `json:"provider" bson:"provider"`
	Photo           string    `json:"photo,omitempty" bson:"photo,omitempty"`
	Verified        bool      `json:"verified,omitempty" bson:"verified,omitempty"`
	CreatedAt       time.Time `json:"created_at,omitempty" bson:"created_at,omitempty"`
	UpdatedAt       time.Time `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

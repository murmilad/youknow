package models

import (
	"github.com/google/uuid"
)

type KnowType struct {
	Id     uint      `json:"id"`
	Name   string    `json:"name"`
	Style  string    `json:"style"` // `gorm:"-" default:"[]"`
	UserID uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
}

type KnowTypeResponse struct {
	Id    uint   `json:"id"`
	Name  string `json:"name"`
	Style string `json:"style"` // `gorm:"-" default:"[]"`
}

func (KnowTypeResponse) TableName() string {
	return "know_types"
}

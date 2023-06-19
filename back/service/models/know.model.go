package models

import (
	"github.com/google/uuid"
)

type KnowType struct {
	Id      uint      `json:"id" gorm:"not null;primaryKey"`
	Name    string    `json:"name" gorm:"not null"`
	Style   string    `json:"style" gorm:"not null"` // `gorm:"-" default:"[]"`
	UserID  uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
	Deleted bool      `json:"deleted" gorm:"not null; default false"`
}

type Know struct {
	Id         uint   `json:"id" gorm:"not null;primaryKey"`
	KnowtypeId uint   `json:"knowtype_id" gorm:"not null"`
	Name       string `json:"name" gorm:"not null"`
	Value      string `json:"value" gorm:"not null"`
	Deleted    bool   `json:"deleted" gorm:"not null; default false"`
}
type KnowTypeResponse struct {
	Id      uint   `json:"id"`
	Name    string `json:"name"`
	Style   string `json:"style"`
	Deleted bool   `json:"deleted"`
}

func (KnowTypeResponse) TableName() string {
	return "know_types"
}

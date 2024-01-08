package models

import (
	"database/sql/driver"
	"time"

	"akosarev.info/youknow/types"
	"github.com/google/uuid"
)

type LessonType struct {
	LessonHandler types.LessonType `json:"lesson_handler" gorm:"not null"`
	Deleted       bool             `json:"deleted" gorm:"not null; default false"`
}

type Lesson struct {
	Id                uint               `json:"id" gorm:"not null;primaryKey"`
	KnowTypeId        int                `json:"know_type_id"`
	ShowAt            time.Time          `json:"show_at"`
	ShowTimes         int                `json:"show_times" gorm:"not null"`
	LessonStatus      types.LessonStatus `json:"lesson_status" gorm:"not null;type:lesson_status"`
	LessonTypeHandler types.LessonType   `json:"lesson_type_handler" gorm:"not null"`
	UserID            uuid.UUID          `json:"user_id" gorm:"type:uuid;not null"`
	PriorityPercent   uint               `json:"priority_percent"`
	Deleted           bool               `json:"deleted" gorm:"not null; default false"`
}

type knowStatus string

const (
	KNOW_NEW   knowStatus = "KNOW_NEW"
	KNOW_RIGHT knowStatus = "KNOW_RIGHT"
	WRONG      knowStatus = "KNOW_WRONG"
)

func (ks *knowStatus) Scan(value interface{}) error {
	*ks = knowStatus(value.([]byte))
	return nil
}

func (ks knowStatus) Value() (driver.Value, error) {
	return string(ks), nil
}

type LessonKnow struct {
	KnowId     uint       `json:"know_id" gorm:"not null;primaryKey"`
	LessonId   uint       `json:"lesson_id" gorm:"not null;primaryKey"`
	KnowStatus knowStatus `json:"know_status" gorm:"not null;type:know_status"`
	AskAt      time.Time  `json:"show_at"`
	AskTimes   int        `json:"show_times" gorm:"not null"`
	Deleted    bool       `json:"deleted" gorm:"not null; default false"`
}

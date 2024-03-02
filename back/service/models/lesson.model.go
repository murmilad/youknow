package models

import (
	"time"

	"akosarev.info/youknow/types"
	"github.com/google/uuid"
)

type LessonType struct {
	Handler types.LessonType `json:"handler" gorm:"not null"`
	Deleted bool             `json:"deleted" gorm:"not null; default false"`
}

type Lesson struct {
	Id                uint               `json:"id" gorm:"not null;primaryKey"`
	KnowTypeId        uint               `json:"know_type_id"`
	ShowAt            time.Time          `json:"show_at"`
	ShowTimes         uint               `json:"show_times" gorm:"not null"`
	LessonStatus      types.LessonStatus `json:"lesson_status" gorm:"not null;type:lesson_status"`
	LessonTypeHandler types.LessonType   `json:"lesson_type_handler" gorm:"not null"`
	UserID            uuid.UUID          `json:"user_id" gorm:"type:uuid;not null"`
	PriorityPercent   float32            `json:"priority_percent"`
	Deleted           bool               `json:"deleted" gorm:"not null; default false"`
}

type LessonKnow struct {
	KnowId     uint             `json:"know_id" gorm:"not null;primaryKey"`
	LessonId   uint             `json:"lesson_id" gorm:"not null;primaryKey"`
	KnowStatus types.KnowStatus `json:"know_status" gorm:"not null;type:know_status"`
	AskAt      time.Time        `json:"show_at"`
	Deleted    bool             `json:"deleted" gorm:"not null; default false"`
}

type LessonKnowtype struct {
	Id                uint               `json:"id" gorm:"not null;primaryKey"`
	KnowTypeId        uint               `json:"know_type_id"`
	ShowAt            time.Time          `json:"show_at"`
	ShowTimes         uint               `json:"show_times" gorm:"not null"`
	LessonStatus      types.LessonStatus `json:"lesson_status" gorm:"not null;type:lesson_status"`
	LessonTypeHandler types.LessonType   `json:"lesson_type_handler" gorm:"not null"`
	UserID            uuid.UUID          `json:"user_id" gorm:"type:uuid;not null"`
	PriorityPercent   float32            `json:"priority_percent"`
	ProgressPercent   float32            `json:"progress_percent"`
	Name              string             `json:"name" gorm:"not null"`
	Style             string             `json:"style" gorm:"not null"` // `gorm:"-" default:"[]"`
	Deleted           bool               `json:"deleted" gorm:"not null; default false"`
}

func (LessonKnow) TableName() string {
	return "lessons_knows"
}

package types

import "database/sql/driver"

type LessonStatus string

func (ls *LessonStatus) LessonStatusScan(value interface{}) error {
	*ls = LessonStatus(value.([]byte))
	return nil
}

func (ls LessonStatus) LessonStatusValue() (driver.Value, error) {
	return string(ls), nil
}

type KnowStatus string

type LessonType string

const (
	LESSON_NEW     LessonStatus = "LESSON_NEW"
	LESSON_STARTED LessonStatus = "LESSON_STARTED"
	LESSON_PAUSED  LessonStatus = "LESSON_PAUSED"

	KNOW_WRONG KnowStatus = "KNOW_WRONG"
	KNOW_NEW   KnowStatus = "KNOW_NEW"
	KNOW_RIGHT KnowStatus = "KNOW_RIGHT"

	LESSON_TYPE_FORGETCURVE LessonType = "FORGET_CURVE"
)

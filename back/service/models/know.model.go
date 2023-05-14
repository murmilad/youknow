package models

type KnowType struct {
	Id    uint   `json:"id"`
	Name  string `json:"name"`
	Style string `json:"style"` // `gorm:"-" default:"[]"`
}

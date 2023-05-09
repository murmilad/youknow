package jwt

import (
	"time"

	"github.com/golang-jwt/jwt"
	// "time"
	"akosarev.info/youknow/config"
)

var secretKey = []byte(config.Config("KEY"))

func GenerateJWT() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(10 * time.Minute)
	claims["authorized"] = true
	claims["user"] = "username"
	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "Signing Error", err
	}

	return tokenString, nil
}

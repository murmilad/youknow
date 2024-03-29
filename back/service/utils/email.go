package utils

import (
	"bytes"
	"fmt"
	"html/template"
	"os"
	"path/filepath"

	"akosarev.info/youknow/initializers"
	"akosarev.info/youknow/models"
	"gopkg.in/gomail.v2"
)

type EmailData struct {
	URL       template.URL
	FirstName string
	Subject   string
	Header    string
	Button    string
}

// ? Email template parser

func ParseTemplateDir(dir string) (*template.Template, error) {
	var paths []string
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			paths = append(paths, path)
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return template.ParseFiles(paths...)
}

func SendEmail(user *models.User, data *EmailData) {
	fmt.Println("SENDMAIL")

	config, err := initializers.LoadConfig(".")

	if err != nil {
		fmt.Errorf("could not load config", err)
	}

	// Sender data.
	from := config.EmailFrom
	smtpPass := config.SMTPPass
	smtpUser := config.SMTPUser
	to := user.Email
	smtpHost := config.SMTPHost
	smtpPort := config.SMTPPort

	var body bytes.Buffer

	template, err := ParseTemplateDir("templates")
	if err != nil {
		fmt.Errorf("Could not parse template", err)
	}

	template.ExecuteTemplate(&body, "verificationCode.html", &data)

	m := gomail.NewMessage()

	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", data.Subject)
	m.SetBody("text/html", body.String())
	//m.AddAlternative("text/plain", html2text.HTML2Text(body.String()))

	fmt.Println("gomail ", smtpHost, smtpPort, smtpUser, smtpPass)
	d := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)
	//d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	// Send Email
 	if err := d.DialAndSend(m); err != nil {
		fmt.Println("Could not send email: ", err)
	}
 
}

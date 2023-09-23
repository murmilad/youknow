package initializers

import (
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	DBHost         string `mapstructure:"POSTGRES_HOST"`
	DBUserName     string `mapstructure:"POSTGRES_USER"`
	DBUserPassword string `mapstructure:"POSTGRES_PASSWORD"`
	DBName         string `mapstructure:"POSTGRES_DB"`
	DBPort         string `mapstructure:"POSTGRES_PORT"`
	ServerPort     string `mapstructure:"BACKEND_PORT"`

	ClientOrigin           string `mapstructure:"CLIENT_ORIGIN"`
	ExternalBackendAddress string `mapstructure:"EXTERNAL_BACKEND_ADDRESS"`
	ExternalBackendPort    string `mapstructure:"EXTERNAL_BACKEND_PORT"`
	ExpoDebugMode    string `mapstructure:"EXPO_DEBUG_MODE"`

	TokenSecret    string        `mapstructure:"TOKEN_SECRET"`
	TokenExpiresIn time.Duration `mapstructure:"TOKEN_EXPIRED_IN"`
	TokenMaxAge    int           `mapstructure:"TOKEN_MAXAGE"`

	EmailFrom string `mapstructure:"EMAIL_FROM"`
	SMTPHost  string `mapstructure:"SMTP_HOST"`
	SMTPPass  string `mapstructure:"SMTP_PASS"`
	SMTPPort  int    `mapstructure:"SMTP_PORT"`
	SMTPUser  string `mapstructure:"SMTP_USER"`

	GoogleClientID         string `mapstructure:"GOOGLE_OAUTH_CLIENT_ID"`
	GoogleClientSecret     string `mapstructure:"GOOGLE_OAUTH_CLIENT_SECRET"`
	GoogleOAuthRedirectUrl string `mapstructure:"GOOGLE_OAUTH_REDIRECT_URL"`

	GithubClientID         string `mapstructure:"GITHUB_OAUTH_CLIENT_ID"`
	GithubClientSecret     string `mapstructure:"GITHUB_OAUTH_CLIENT_SECRET"`
	GithubOAuthRedirectUrl string `mapstructure:"GITHUB_OAUTH_REDIRECT_URL"`

	GinNginxLogPath string `mapstructure:"GIN_NGINX_LOG_PATH"`
	LogPath         string `mapstructure:"LOG_PATH"`

	ServerName string `mapstructure:"SERVER_NAME"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigType("env")
	viper.SetConfigName(".env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}

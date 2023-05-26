package utils

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"time"

	"akosarev.info/youknow/initializers"
)

type GithubOauthToken struct {
	Access_token string
	Scope        string
	Token_type   string
}

type GithubUserResult struct {
	Email      string
	Name       string
	Avatar_url string
}

func GetGithubOauthToken(code string) (*GithubOauthToken, error) {
	const rootURl = "https://github.com/login/oauth/access_token"
	config, _ := initializers.LoadConfig(".")
	values := url.Values{}
	values.Add("client_id", config.GithubClientID)
	values.Add("client_secret", config.GithubClientSecret)
	values.Add("code", code)
	values.Add("redirect_uri", config.GithubOAuthRedirectUrl)

	query := values.Encode()

	req, err := http.NewRequest("POST", rootURl, bytes.NewBufferString(query))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Set("Accept", "application/json")
	client := http.Client{
		Timeout: time.Second * 30,
	}

	res, err := client.Do(req)

	if err != nil {
		return nil, err
	}

	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	if res.StatusCode != http.StatusOK {
		return nil, errors.New("could not retrieve token: " + string(resBody))
	}

	tokenBody := &GithubOauthToken{}

	if err := json.Unmarshal(resBody, tokenBody); err != nil {
		return nil, err
	}

	return tokenBody, nil
}

func GetGithubUser(access_token string) (*GithubUserResult, error) {
	rootUrl := "https://api.github.com/user"

	req, err := http.NewRequest("GET", rootUrl, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", access_token))
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("X-GitHub-Api-Version", "2022-11-28")

	client := http.Client{
		Timeout: time.Second * 30,
	}

	res, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	if res.StatusCode != http.StatusOK {
		return nil, errors.New("could not retrieve user")
	}

	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}

	userBody := &GithubUserResult{}

	if err := json.Unmarshal(resBody, userBody); err != nil {
		return nil, err
	}

	return userBody, nil
}

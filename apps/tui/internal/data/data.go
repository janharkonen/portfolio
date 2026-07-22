// Package data defines the portfolio content types matching the JSON
// exported by packages/app_data (pnpm --filter @portfolio/app_data build).
package data

import "encoding/json"

type Profile struct {
	Name     string `json:"name"`
	Role     string `json:"role"`
	Location string `json:"location"`
	Line     string `json:"line"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	GitHub   string `json:"github"`
	Linkedin string `json:"linkedin"`
	Scholar  string `json:"scholar"`
	CV       string `json:"cv"`
}

type Experience struct {
	Role        string   `json:"role"`
	Company     string   `json:"company"`
	Period      string   `json:"period"`
	Description string   `json:"description"`
	Tech        []string `json:"tech"`
}

type Education struct {
	Degree      string `json:"degree"`
	School      string `json:"school"`
	Period      string `json:"period"`
	Description string `json:"description"`
}

type Project struct {
	Name        string   `json:"name"`
	Year        string   `json:"year"`
	Description string   `json:"description"`
	Tech        []string `json:"tech"`
	Featured    bool     `json:"featured"`
}

type Data struct {
	Profile    Profile      `json:"profile"`
	CoreStack  []string     `json:"coreStack"`
	Experience []Experience `json:"experience"`
	Education  []Education  `json:"education"`
	Projects   []Project    `json:"projects"`
}

func Parse(raw []byte) (Data, error) {
	var d Data
	err := json.Unmarshal(raw, &d)
	return d, err
}

package main

import (
	"encoding/json"
	"github.com/a-h/templ"
	"github.com/joho/godotenv"
	"github.com/robin-thoene/toxic-chronos/models"
	"github.com/robin-thoene/toxic-chronos/templates"
	"net/http"
	"os"
)

func main() {
	env := os.Getenv("ENV")
	if "" == env {
		godotenv.Load(".env.local")
	}
	var countdowns []models.Countdown
	err := json.Unmarshal([]byte(os.Getenv("COUNTDOWNS")), &countdowns)
	if err != nil {
		panic(err)
	}
	index := templates.Index(countdowns)
	http.Handle("/", templ.Handler(index))
	http.ListenAndServe(":8080", nil)
}

package models

import "time"

type Countdown struct {
	Label   string
	DueDate time.Time
}

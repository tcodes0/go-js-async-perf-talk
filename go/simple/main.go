package main

import (
	"context"
	"github.com/tcodes0/js-go-concurrency/simple/concurrent"
)

func main() {
	jobs := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17} // len 16
	ctx, cancel := context.WithCancel(context.Background())
	concurrent.Processor(ctx, cancel, jobs)
}

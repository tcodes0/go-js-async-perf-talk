package concurrent

import (
	"context"
	"fmt"
	"sync"
	"time"
)

const CONCURENCY_LIMIT = 10

var wg sync.WaitGroup

// bchannel is a bounded channel allowing up to 10 concurrent operations.
var bchannel = make(chan int, CONCURENCY_LIMIT)

func routine(ctx context.Context, job interface{}) {

	select {
	case <-ctx.Done():
		fmt.Printf("%#v: cancelled\n", job)
	default:
		fmt.Printf("%#v: work\n", job)
		// do work
		time.Sleep(time.Duration(1 * time.Second))
		fmt.Printf("%#v: done\n", job)
	}

	<-bchannel // unblock loop
	wg.Done()  // unblock main
}

func Processor(ctx context.Context, cancel context.CancelFunc, jobs []int) {
	t1 := time.Now()
	for i, job := range jobs {
		bchannel <- 1 // blocks loop if len(bchannel) == CONCURENCY_LIMIT
		wg.Add(1)     // blocks main
		if i == 10 {
			cancel() // last 6 jobs wont run
		}
		go routine(ctx, job)
	}

	wg.Wait()
	elapsed := time.Since(t1).String()
	fmt.Printf("processed %d jobs in %s\n", len(jobs), elapsed)
}

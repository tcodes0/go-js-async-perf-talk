package concurrent

import (
	"context"
	"crypto/sha512"
	"fmt"
	"sync"
	"time"

	"golang.org/x/crypto/pbkdf2"
)

const CONCURENCY_LIMIT = 10

var wg sync.WaitGroup

// bchannel is a bounded channel allowing up to 10 concurrent operations.
var bchannel = make(chan int, CONCURENCY_LIMIT)

func load() {
	salt := []byte("Gg8au1BBLgE1MGQGiRULunMqOCoJvhHA3qXhr3FFn+Z7iWiLMmNI6j+JIcd6ledP")
	pbkdf2.Key([]byte("myPassword"), salt, 50000, 512, sha512.New)
}

func routine(ctx context.Context, job interface{}) {

	select {
	case <-ctx.Done():
		fmt.Printf("%#v: cancelled\n", job)
	default:
		fmt.Printf("%#v: work\n", job)
		// do work
		load()
		fmt.Printf("%#v: done\n", job)
	}

	<-bchannel // unblock loop
	wg.Done()  // unblock main
}

func Processor(ctx context.Context, cancel context.CancelFunc, jobs []int) {
	t1 := time.Now()
	for _, job := range jobs {
		bchannel <- 1 // blocks loop if len(bchannel) == CONCURENCY_LIMIT
		wg.Add(1)     // blocks main
		go routine(ctx, job)
	}

	wg.Wait()
	elapsed := time.Since(t1).String()
	fmt.Printf("processed %d jobs in %s\n", len(jobs), elapsed)
}

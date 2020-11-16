package main

import (
	"fmt"
	"log"
	"net/http"
)

func homePageHandler(w http.ResponseWriter, r *http.Request) {
	_, err := fmt.Fprintf(w, "hello world")
	checkError(err)
}

func checkError(err error) {
	if err != nil {
		log.Panic(err)
	}
}

func main() {
	http.HandleFunc("/", homePageHandler)

	fmt.Println("Server listening on port 5757")
	log.Panic(
		http.ListenAndServe(":5757", nil),
	)
}

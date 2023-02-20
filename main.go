package main

import (
	"fmt"
	"net/http"
)

func main() {
	prot := ":9988"
	fmt.Println("http://localhost" + prot)
	http.ListenAndServe(prot, http.FileServer(http.Dir("dist")))
}

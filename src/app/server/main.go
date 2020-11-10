package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Server started . . .")
	router := gin.Default() // fail safe

	router.Use(cors.Default())
	router.POST("/accept", data)

	router.Run()
}

func data(c *gin.Context) {
	body := c.Request.Body
	value, err := ioutil.ReadAll(body)
	if err != nil {
		fmt.Println(err.Error())
	}
	log.Println("Data received : " + string(value))
	c.JSON(http.StatusOK, gin.H{
		"coin": string(value),
	})
}

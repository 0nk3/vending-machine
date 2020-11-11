package main

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// Item proprties
type Item struct {
	Position  int
	Name      string
	Price     int
	Remaining int
}

func main() {
	fmt.Println("Server started . . .")
	db()
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

func db() {
	fmt.Println("<================ MyPostGres database ==============>")
	database, error := sql.Open("postgres", "postgres://onke:onke10222@localhost/vending_machine?sslmode=disable") // doesnt necessarily check connection, so it bettter to ping
	if error = database.Ping(); error != nil {
		panic(error)
	}
	defer database.Close()
	// Lets Query the DB
	rows, error := database.Query("SELECT * FROM items")
	if error != nil {
		panic(error)
	}
	defer rows.Close()
	// iterate throught the results

	for rows.Next() {
		item := Item{}
		error := rows.Scan(&item.Position, &item.Name, &item.Price, &item.Remaining) // order matters
		if error != nil {
			panic(error)
		}
		log.Println(item.Position, item.Name, item.Price, item.Remaining)
	}

}

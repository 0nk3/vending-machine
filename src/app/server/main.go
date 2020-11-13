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

var database *sql.DB

func main() {
	fmt.Println("Server started . . .")

	router := gin.Default() // fail safe

	router.Use(cors.Default())
	router.POST("/accept", data)
	router.GET("/items", DataBase)
	router.Run()
}

func data(c *gin.Context) {
	body := c.Request.Body
	value, err := ioutil.ReadAll(body)
	if err != nil {
		fmt.Println(err.Error())
	}
	log.Println("Coin Received : " + string(value))
	c.JSON(http.StatusOK, gin.H{
		"coin": string(value),
	})
}

// DataBase . .
func DataBase(c *gin.Context) {

	fmt.Println("<================ MyPostGres database ==============>")
	database, error := sql.Open("postgres", "postgres://onke:onke10222@localhost/vending_machine?sslmode=disable")
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
	i := make([]Item, 0)
	for rows.Next() {
		item := Item{}

		error := rows.Scan(&item.Position, &item.Name, &item.Price, &item.Remaining) // order matters
		if error != nil {
			panic(error)
		}
		i = append(i, item)

		log.Println(item.Position, item.Name, item.Price, item.Remaining)
	}
	c.JSON(http.StatusOK, i)
	fmt.Println(i)
}

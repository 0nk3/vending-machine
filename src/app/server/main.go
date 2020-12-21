package main

import (
	"database/sql"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// Coin . .
type Coin struct {
	Coin int
}

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
	router.POST("/accept", GetCoin)
	router.GET("/items", GetItems)
	router.PUT("/update", Update)
	router.Run()
}

// GetCoin from the FE . . .
func GetCoin(c *gin.Context) {
	body := c.Request.Body
	money := make([]Coin, 0)
	value, err := ioutil.ReadAll(body)
	if err != nil {
		fmt.Println(err.Error())
	}
	coin := Coin{}
	money = append(money, coin)
	log.Println("Coin Received : " + string(value))
	c.JSON(http.StatusOK, string(value))
}

// GetItems . .
func GetItems(c *gin.Context) {
	fmt.Println("<================||================||==============||=================>")
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

// Update . . .
func Update(c *gin.Context) {
	//TODO this should all be improved to avoid code duplication
	database, error := sql.Open("postgres", "postgres://onke:onke10222@localhost/vending_machine?sslmode=disable")
	if error = database.Ping(); error != nil {
		panic(error)
	}
	defer database.Close()
	// Query the DB
	rows, error := database.Query("SELECT * FROM items")
	if error != nil {
		panic(error)
	}
	defer rows.Close()
	sqlStatement := `UPDATE items SET remaining = $2 WHERE position = $1;`

	position := c.Query("position")
	i, error := GetPathInt(c, position)
	updated := 0
	for rows.Next() {
		item := Item{}
		error := rows.Scan(&item.Position, &item.Name, &item.Price, &item.Remaining) // order matters
		if error != nil {
			panic(error)
		}
		if item.Position == i {
			updated = item.Remaining - 1
		}
	}
	log.Println("updated :", updated)
	_, error = database.Exec(sqlStatement, i, updated)
	if error != nil {
		panic(error)
	}
	c.JSON(http.StatusOK, gin.H{
		"remaining": updated,
	})
}

// GetPathInt Helper
func GetPathInt(c *gin.Context, position string) (int, error) {
	// log.Println("name ", position)
	val := c.Query("position")
	log.Println("val", position)
	if val == "" {
		return 0, errors.New(position + " path parameter value is empty or not specified")
	}
	return strconv.Atoi(val)
}

package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/jrussellrivers/Go_Backend_Project/pkg/websocket"
	_ "github.com/lib/pq"
)

const (
	host   = "localhost"
	port   = 5432
	user   = "jordanrivers"
	dbname = "golangchat"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("\nWebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.Client{
		ID:       1,
		Username: "Jordan",
		Conn:     conn,
		Pool:     pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"dbname=%s sslmode=disable",
		host, port, user, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	// defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})

	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		sqlStatement := `SELECT * FROM users;`
		var id int
		var username string
		var password string
		row := db.QueryRow(sqlStatement)
		switch err := row.Scan(&id, &username, &password); err {
		case sql.ErrNoRows:
			fmt.Println("No rows were returned!")
		case nil:
			fmt.Println(id, username, password)
		default:
			panic(err)
		}
	})
}

func main() {
	setupRoutes()
	fmt.Println("Distributed Chat App v0.01")
	http.ListenAndServe(":8080", nil)
}

package websocket

import (
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

// Client structure
type Client struct {
	ID       int
	Username string
	Conn     *websocket.Conn
	Pool     *Pool
}

// Message structure
type Message struct {
	Username string `json:"username"`
	Body     string `json:"body"`
	Type     int    `json:"type"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			fmt.Println("Type:", messageType)
			return
		}

		message := Message{Username: c.Username, Body: string(p), Type: 2}
		c.Pool.Broadcast <- message
		fmt.Printf("\nMessage Received: %+v\n", message)
	}
}

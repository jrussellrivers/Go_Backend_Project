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
	ID   int    `json:"ID"`
	Body string `json:"body"`
	Type int    `json:"type"`
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
			return
		}
		fmt.Println("Type:", messageType)

		message := Message{ID: c.ID, Body: string(p), Type: 2}
		c.Pool.Broadcast <- message
		fmt.Printf("\nMessage Received: %+v\n", message)
	}
}

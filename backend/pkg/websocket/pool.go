package websocket

import (
	"fmt"
)

// Pool structure
type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

// NewPool creates a pool
func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

// Grabs the user ID

// Start will listen for anything passed to any of our Pool's channels
// then if anything is received into one of these channels, it’ll act accordingly.
func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client := range pool.Clients {
				p := *client
				newString := p.Username + " has joined the chat"
				client.Conn.WriteJSON(Message{Username: p.Username, Body: newString, Type: 1})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("\nSize of Connection Pool: ", len(pool.Clients))
			for client := range pool.Clients {
				p := *client
				newString := p.Username + " has left the chat"
				client.Conn.WriteJSON(Message{Username: p.Username, Body: newString, Type: 3})
			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for client := range pool.Clients {
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}

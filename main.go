package main

import (
	"encoding/json"
	"fmt"
	"github.com/mtslzr/pokeapi-go"
	"log"
	"net/http"
	"path/filepath"
	"strings"
)

type Pokemon struct {
	Name   string   `json:"name"`
	Types  []string `json:"types"`
	Height float64  `json:"height"`
	Weight float64  `json:"weight"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	sub := strings.TrimPrefix(r.URL.Path, "/api/v1/pokemon")
	_, pokedexID := filepath.Split(sub)
	if pokedexID == "" {
		w.WriteHeader(404)
		fmt.Fprintln(w, "invalid route:", r.URL.Path)
		return
	}

	p, err := pokeapi.Pokemon(pokedexID)
	if err != nil {
		w.WriteHeader(400)
		fmt.Fprintln(w, "failed get pokemon:", err)
		return
	}

	// get pokemon name
	s, err := pokeapi.PokemonSpecies(pokedexID)
	var name string
	for _, v := range s.Names {
		if v.Language.Name == "ja-Hrkt" {
			name = v.Name
		}
	}

	// get pokemon types
	var types []string
	for _, v := range p.Types {
		tName := v.Type.Name
		t, _ := pokeapi.Type(tName)

		for _, v := range t.Names {
			if v.Language.Name == "ja-Hrkt" {
				types = append(types, v.Name)
			}
		}
	}

	pokemon := &Pokemon{
		Name:   name,
		Types:  types,
		Height: float64(p.Height) / 10,
		Weight: float64(p.Weight) / 10,
	}

	output, err := json.MarshalIndent(&pokemon, "", "\t")
	w.Write(output)
}

func main() {
	var httpServer http.Server
	http.HandleFunc("/api/v1/pokemon/", handler)
	log.Println("start http listening :8080")
	httpServer.Addr = ":8080"
	log.Println(httpServer.ListenAndServe())
}

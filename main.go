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

type APIResponse struct {
	Message string `json:"message"`
	Data    any    `json:"data"`
}

type Pokemon struct {
	PokedexID string   `json:"pokedex_id"`
	Name      string   `json:"name"`
	Types     []string `json:"types"`
	Height    float64  `json:"height"`
	Weight    float64  `json:"weight"`
}

type PokeBaseStats struct {
	HP             int `json:"hp"`
	Attack         int `json:"attack"`
	Defense        int `json:"defense"`
	SpecialAttack  int `json:"special_attack"`
	SpecialDefense int `json:"special_defense"`
	Speed          int `json:"speed"`
}

func getPokemonHandler(w http.ResponseWriter, r *http.Request) {
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
		PokedexID: pokedexID,
		Name:      name,
		Types:     types,
		Height:    float64(p.Height) / 10,
		Weight:    float64(p.Weight) / 10,
	}

	res := &APIResponse{
		Message: "success",
		Data:    pokemon,
	}

	output, err := json.MarshalIndent(&res, "", "\t")
	w.Write(output)
}

func getPokemonBaseStats(w http.ResponseWriter, r *http.Request) {
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

	pokeBaseStats := &PokeBaseStats{}
	for _, v := range p.Stats {
		if v.Stat.Name == "hp" {
			pokeBaseStats.HP = v.BaseStat
		} else if v.Stat.Name == "attack" {
			pokeBaseStats.Attack = v.BaseStat
		} else if v.Stat.Name == "defense" {
			pokeBaseStats.Defense = v.BaseStat
		} else if v.Stat.Name == "special-attack" {
			pokeBaseStats.SpecialAttack = v.BaseStat
		} else if v.Stat.Name == "special-defense" {
			pokeBaseStats.SpecialDefense = v.BaseStat
		} else {
			pokeBaseStats.Speed = v.BaseStat
		}
	}

	res := &APIResponse{
		Message: "success",
		Data:    pokeBaseStats,
	}

	output, err := json.MarshalIndent(&res, "", "\t")
	w.Write(output)
}

func main() {
	var httpServer http.Server
	http.HandleFunc("/api/v1/pokemon/", getPokemonHandler)
	http.HandleFunc("/api/v1/pokemon/base_stats/", getPokemonBaseStats)
	log.Println("start http listening :8080")
	httpServer.Addr = ":8080"
	log.Println(httpServer.ListenAndServe())
}

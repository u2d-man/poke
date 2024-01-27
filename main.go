package main

import (
	"encoding/json"
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/mtslzr/pokeapi-go"
	"log"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
)

type APIResponse struct {
	Message string `json:"message"`
	Data    any    `json:"data"`
}

type Pokemon struct {
	PokedexID string   `json:"pokedex_id"`
	FrontImg  string   `json:"front_img"`
	Name      string   `json:"name"`
	Types     []string `json:"types"`
	Height    float64  `json:"height"`
	Weight    float64  `json:"weight"`
}

type ItemResponse struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Sprite string `json:"sprite"`
}

type handlers struct {
	DB *sqlx.DB
}

func main() {
	db, _ := GetDB(false)
	h := &handlers{
		DB: db,
	}

	var httpServer http.Server
	http.HandleFunc("/api/v1/pokemon/", getPokemonHandler)
	http.HandleFunc("/api/v1/pokemon/base_stats/", getPokemonBaseStats)
	http.HandleFunc("/api/v1/pokemon/move/", getPokemonMove)
	http.HandleFunc("/api/v1/items/", getItems)
	http.HandleFunc("/api/v1/training_pokemon/", h.postTrainingPokemon)
	log.Println("start http listening :8080")
	httpServer.Addr = ":8080"
	log.Println(httpServer.ListenAndServe())
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
		FrontImg:  p.Sprites.FrontDefault,
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
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
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

	var pokeBaseStats []int
	for _, v := range p.Stats {
		if v.Stat.Name == "hp" {
			pokeBaseStats = append(pokeBaseStats, v.BaseStat)
		} else if v.Stat.Name == "attack" {
			pokeBaseStats = append(pokeBaseStats, v.BaseStat)
		} else if v.Stat.Name == "defense" {
			pokeBaseStats = append(pokeBaseStats, v.BaseStat)
		} else if v.Stat.Name == "speed" {
			pokeBaseStats = append(pokeBaseStats, v.BaseStat)
		} else if v.Stat.Name == "special-defense" {
			pokeBaseStats = append(pokeBaseStats, v.BaseStat)
		} else {
			pokeBaseStats = append(pokeBaseStats, v.BaseStat)
		}
	}

	res := &APIResponse{
		Message: "success",
		Data:    pokeBaseStats,
	}

	output, err := json.MarshalIndent(&res, "", "\t")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Write(output)
}

func getPokemonMove(w http.ResponseWriter, r *http.Request) {
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

	var pokeMoves []string
	for _, v := range p.Moves {
		mName := v.Move.Name

		m, _ := pokeapi.Move(mName)
		for _, v := range m.Names {
			if v.Language.Name == "ja-Hrkt" {
				pokeMoves = append(pokeMoves, v.Name)
			}
		}
	}

	res := &APIResponse{
		Message: "success",
		Data:    pokeMoves,
	}

	output, err := json.MarshalIndent(&res, "", "\t")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Write(output)
}

func (h *handlers) postTrainingPokemon(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	pokedexID := r.PostFormValue("pokedex_id")
	pName := r.PostFormValue("name")
	move := r.PostFormValue("move_1")
	move2 := r.PostFormValue("move_2")
	move3 := r.PostFormValue("move_3")
	move4 := r.PostFormValue("move_4")
	hp, _ := strconv.Atoi(r.PostFormValue("hp"))
	attack, _ := strconv.Atoi(r.PostFormValue("attack"))
	defense, _ := strconv.Atoi(r.PostFormValue("defense"))
	speed, _ := strconv.Atoi(r.PostFormValue("speed"))
	sDefense, _ := strconv.Atoi(r.PostFormValue("special_defense"))
	sAttack, _ := strconv.Atoi(r.PostFormValue("special_attack"))
	item := r.PostFormValue("item")

	_, err := h.DB.Exec("INSERT INTO `training_pokemons` (`pokedex_id`, `name`, `move_1`, `move_2`, `move_3`, `move_4`, `hp`, `attack`, `defense`, `speed`, `special_defense`, `special_attack`, `item`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
		pokedexID, pName, move, move2, move3, move4, hp, attack, defense, speed, sDefense, sAttack, item)
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintln(w, "failed insert training_pokemon:", err)
		return
	}

	res := &APIResponse{
		Message: "success",
	}

	output, _ := json.MarshalIndent(&res, "", "\t")
	w.Write(output)
}

func getItems(w http.ResponseWriter, r *http.Request) {
	var items []*ItemResponse
	heldItem, err := pokeapi.ItemCategory("12")
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintln(w, "failed get held items:", err)
	}

	for _, c := range heldItem.Items {
		itemRes := &ItemResponse{}
		item, err := pokeapi.Item(c.Name)
		if err != nil {
			fmt.Fprintln(w, "failed get item:", err)
		}
		itemRes.ID = item.ID
		itemRes.Sprite = item.Sprites.Default
		for _, i := range item.Names {
			if i.Language.Name == "ja-Hrkt" {
				itemRes.Name = i.Name
				items = append(items, itemRes)
			}
		}
	}

	choice, err := pokeapi.ItemCategory("13")
	if err != nil {
		w.WriteHeader(500)
		fmt.Fprintln(w, "failed get choice items:", err)
	}

	for _, c := range choice.Items {
		itemRes := &ItemResponse{}
		item, err := pokeapi.Item(c.Name)
		if err != nil {
			fmt.Fprintln(w, "failed get item:", err)
		}
		itemRes.ID = item.ID
		itemRes.Sprite = item.Sprites.Default
		for _, i := range item.Names {
			if i.Language.Name == "ja-Hrkt" {
				itemRes.Name = i.Name
				items = append(items, itemRes)
			}
		}
	}

	res := &APIResponse{
		Message: "success",
		Data:    items,
	}

	output, _ := json.MarshalIndent(&res, "", "\t")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Write(output)
}

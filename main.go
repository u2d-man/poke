package main

import (
	"fmt"
	"github.com/mtslzr/pokeapi-go"
)

func main() {
	u, _ := pokeapi.Language("ja")
	fmt.Println(u)
	r, err := pokeapi.PokemonSpecies("3")
	if err != nil {
		panic(err)
	}

	for _, v := range r.Names {
		if v.Language.Name == "ja" {
			fmt.Println(v.Name)
		}
	}

	//fmt.Println(r.Name)
}

import {useQuery, UseQueryResult} from "@tanstack/react-query";
import apis, {TrainingPokemonResponse} from "../libs/Apis";

export function TrainingPokemonGrid() {
    const {data}: UseQueryResult<TrainingPokemonResponse> = useQuery({
        queryKey: ["getTrainingPokemons"],
        async queryFn() {
            const response = apis.getTrainingPokemons();
            if (response) {
                return response;
            } else {
                console.log('fetch error get training pokemons.');
            }
        }
    });

    if (!data) return null;

    return (
        <div className="grid grid-cols-4 gap-4 mx-8">
            { data.data.map((training_pokemon, index) =>
                <div key={index}>
                    <div className="box-content w-60 m-5 border-4 rounded-md border-indigo-500">
                        <img src={ training_pokemon.sprite } className="w-60" alt="icon" />
                    </div>
                </div>
            )}
        </div>
    );
}

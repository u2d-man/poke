import {TrainingPokemonGrid} from "../components/TrainingPokemonGrid";
import {Header} from "../components/Header";
import {NewTrainingPokemonButton} from "../components/NewTrainingPokemonButton";

export function Home() {
    return (
        <div>
            <Header children={<NewTrainingPokemonButton />} />
            <TrainingPokemonGrid />
        </div>
    );
}

import {TrainingPokemonGrid} from "../components/TrainingPokemonGrid";
import {Header} from "../components/Header";
import {NewTrainingPokemonButton} from "../components/NewTrainingPokemonButton";

export function Home() {
    return (
        <div className="bg-bg h-screen w-full min-h-screen">
            <Header children={<NewTrainingPokemonButton />} />
                <TrainingPokemonGrid />
        </div>
    );
}

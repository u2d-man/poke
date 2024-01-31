import React, {useState} from "react";
import RadarChart from "../components/RadarChart";
import PokemonBaseInfo from "../components/PokemonBaseInfo";
import EffortValueTextField from "../components/EffortValueTextField";
import MoveTextField from "../components/MoveTextField";
import apis, {PostTrainingPokemonRequest} from "../libs/Apis";
import ItemTextField from "../components/ItemTextField";
import AbilityTextField from "../components/AbilityTextField";

interface Props {
    pokedexID: number
}

const Home = ({ pokedexID }: Props) => {
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [specialDefense, setSpecialDefense] = useState('');
    const [specialAttack, setSpecialAttack] = useState('');

    const [move, setMove] = useState('');
    const [move2, setMove2] = useState('');
    const [move3, setMove3] = useState('');
    const [move4, setMove4] = useState('');

    const [item, setItem] = useState('');

    const [ability, setAbility] = useState('');

    const submit = async () => {
        const req: PostTrainingPokemonRequest = {
            pokedex_id: String(pokedexID),
            name: "フシギダネ",
            ability: ability,
            move_1: move,
            move_2: move2,
            move_3: move3,
            move_4: move4,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            special_attack: specialAttack,
            special_defense: specialDefense,
            item: item
        }
        await apis.postTrainingPokemon(req)
    }

    return (
        <div>
            <PokemonBaseInfo pokedexID={ pokedexID }/>
            <div className="block text-right w-2/6 box-content ml-auto mr-20">
                <RadarChart pokedexID={ pokedexID } />
            </div>
            <div className="flex">
                <div className="box-content max-w-md w-90 m-10">
                    <EffortValueTextField placeholder="HP" value={ hp } setValue={ setHp } type="text" label="HitPoint" />
                    <EffortValueTextField placeholder="こうげき" value={ attack } setValue={ setAttack } type="text" label="こうげき" />
                    <EffortValueTextField placeholder="ぼうぎょ" value={ defense } setValue={ setDefense } type="text" label="ぼうぎょ" />
                    <EffortValueTextField placeholder="すばやさ" value={ speed } setValue={ setSpeed } type="text" label="すばやさ" />
                    <EffortValueTextField placeholder="とくぼう" value={ specialDefense } setValue={ setSpecialDefense } type="text" label="とくぼう" />
                    <EffortValueTextField placeholder="とくこう" value={ specialAttack } setValue={ setSpecialAttack } type="text" label="とくこう" />
                </div>
                <div className="box-content m-10">
                    <MoveTextField placeholder="わざ1" value={ move } setValue={ setMove } type="search" label="わざ1" pokedexID={ pokedexID } />
                    <MoveTextField placeholder="わざ2" value={ move2 } setValue={ setMove2 } type="text" label="わざ2" pokedexID={ pokedexID } />
                    <MoveTextField placeholder="わざ3" value={ move3 } setValue={ setMove3 } type="text" label="わざ3" pokedexID={ pokedexID } />
                    <MoveTextField placeholder="わざ4" value={ move4 } setValue={ setMove4 } type="text" label="わざ4" pokedexID={ pokedexID } />
                </div>
                <div>
                    <ItemTextField placeholder="もちもの" value={ item } setValue={ setItem } type="search" label="アイテム" />
                </div>
                <div>
                    <AbilityTextField placeholder="とくせい" value={ ability } setValue={ setAbility } type="search" label="とくせい" pokedexID={ pokedexID } />
                </div>
                <button onClick={ submit } >登録</button>
            </div>
        </div>
    );
}

export default Home;

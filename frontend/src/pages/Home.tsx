import logo from "../logo.svg";
import React, {useState} from "react";
import RadarChart from "../components/RadarChart";
import PokemonBaseInfo from "../components/PokemonBaseInfo";
import EffortValueTextField from "../components/EffortValueTextField";

const Home = () => {
    const [hp, setHp] = useState('')
    const [attack, setAttack] = useState('')
    const [defence, setDefence] = useState('')
    const [speed, setSpeed] = useState('')
    const [specialDefense, setSpecialDefense] = useState('')
    const [specialAttack, setSpecialAttack] = useState('')

    return (
        <div>
            <div>
                <PokemonBaseInfo />
            </div>
            <div className="block text-right w-2/6 box-content ml-auto mr-20">
                <RadarChart />
            </div>
            <div className="container max-w-md w-90 m-10">
                <EffortValueTextField placeholder="HP" value={ hp } setValue={ setHp } type="text" label="HitPoint" />
                <EffortValueTextField placeholder="こうげき" value={ attack } setValue={ setAttack } type="text" label="こうげき" />
                <EffortValueTextField placeholder="ぼうぎょ" value={ defence } setValue={ setDefence } type="text" label="ぼうぎょ" />
                <EffortValueTextField placeholder="すばやさ" value={ speed } setValue={ setSpeed } type="text" label="すばやさ" />
                <EffortValueTextField placeholder="とくぼう" value={ specialDefense } setValue={ setSpecialDefense } type="text" label="とくぼう" />
                <EffortValueTextField placeholder="とくこう" value={ specialAttack } setValue={ setSpecialAttack } type="text" label="とくこう" />
            </div>
        </div>

    );
}

export default Home;

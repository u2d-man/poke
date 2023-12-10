import logo from "../logo.svg";
import React from "react";
import RadarChart from "../components/RadarChart";
import PokemonBaseInfo from "../components/PokemonBaseInfo";

const Home = () => {
    return (
        <div className="container">
            <PokemonBaseInfo />
            <div className="w-3/6 text-right">
                <RadarChart />
            </div>
        </div>
    );
}

export default Home;

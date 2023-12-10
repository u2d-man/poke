import logo from "../logo.svg";
import React from "react";
import RadarChart from "../components/RadarChart";
import PokemonBaseInfo from "../components/PokemonBaseInfo";

const Home = () => {
    return (
        <div className="container lg:flex">
            <PokemonBaseInfo />
            <div className="w-4/6 text-right">
                <RadarChart />
            </div>
        </div>
    );
}

export default Home;

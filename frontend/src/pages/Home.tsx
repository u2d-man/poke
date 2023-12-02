import logo from "../logo.svg";
import React from "react";
import RadarChart from "../components/RadarChart";

const Home = () => {
    return (
        <div className="container">
            <p>poke!</p>
            <div className="w-3/6 text-right">
                <RadarChart />
            </div>
        </div>
    );
}

export default Home;

import React from 'react';
import tournamentData from "../data/final.json";
import { ToggleTheme } from "./ToggleTheme/ToggleTheme";
import ChartComponent from "./ChartComponent/ChartComponent";
import './MainContent.css'
interface MainContentProps {
    // Define the properties here. For example:
    // message: string;
}
const MainContent: React.FC<MainContentProps> = () => {
    console.log(tournamentData)
    return (
        <div id="MainContent">
            <ToggleTheme />
            {/* <h1>{message}</h1> */}
            <ChartComponent></ChartComponent>
        </div>
    );
};

export default MainContent;

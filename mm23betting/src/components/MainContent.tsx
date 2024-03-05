import React, { useState, useEffect } from 'react';
import tournamentData from "../data/final.json";
import { ToggleTheme } from "./ToggleTheme/ToggleTheme";
import { SelectorComponent } from './SelectorComponent/SelectorComponent';
import ChartComponent from "./ChartComponent/ChartComponent";
import { useAtom } from 'jotai';
import { roSelectedBetsAtom } from '../atoms/store';
import './MainContent.css'
interface MainContentProps {
    // Define the properties here. For example:
    // message: string;
}
const MainContent: React.FC<MainContentProps> = () => {
    const [selectedBets] = useAtom(roSelectedBetsAtom);
    useEffect(() => {
        console.log(selectedBets)
    }, [selectedBets])
    // const graphSelection = (items) => {
    //     console.log(items)
    //     // Additional logic for selected items
    // };
    // console.log(tournamentData)
    return (
        <div id="MainContent">
            <ToggleTheme />
            <SelectorComponent />
            {/* <h1>{message}</h1> */}
            <ChartComponent />
        </div>
    );
};

export default MainContent;

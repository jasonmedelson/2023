import React, { useEffect, useRef, useState } from 'react';
import './ChartComponent.css';
import { Chart, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Button, ButtonGroup, Flex, border } from '@chakra-ui/react';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import { useAtom } from 'jotai';
import { roSelectedBetsAtom, graphDataHolder } from '../../atoms/store';
import tournamentData from '../../data/final.json';
const ChartComponent = () => {
    const chartRef = useRef<ChartJS<'line'>>(null);
    const [selectedBets] = useAtom(roSelectedBetsAtom);
    const [graphData, setGraphData] = useAtom(graphDataHolder);
    const [renderInstant, setRenderInstant] = useState<boolean>(false);
    interface chartDataSet {
        label: string,
        borderColor: string,
        backGroundColor: string,
        data: number[],
        tension?: number,
    }
    interface renderObjInterface {
        over?: chartDataSet,
        under?: chartDataSet,
        mlFav?: chartDataSet,
        mlDog?: chartDataSet,
        spreadFav?: chartDataSet,
        spreadDog?: chartDataSet
    }
    useEffect(() => {
        console.log(graphData)
        if (Object.values(graphData).every(value => value !== undefined)) {
            console.log(graphData)
            renderGraphPrep(renderInstant);
        }
    }, [graphData, renderInstant])
    const getRandomColorHSL = (): string => {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 100);
        const lightness = Math.floor(Math.random() * 100);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };
    function convertToChartDataSetArray(renderObj: renderObjInterface): chartDataSet[] {
        // Extract keys from the renderObj
        const keys = Object.keys(renderObj) as Array<keyof renderObjInterface>;

        // Map each key to its corresponding chartDataSet value
        const chartDataSets: chartDataSet[] = keys.map(key => renderObj[key]).filter((dataset): dataset is chartDataSet => dataset !== undefined);

        return chartDataSets;
    }
    const calcOver = () => {
        let hold = []
        let current = 0
        for (const game of tournamentData.games.mens) {
            if (game.over) {
                if (game['score1'] + game['score2'] > game['over']) {
                    current = current + 100
                } else if (game['score1'] + game['score2'] < game['over']) {
                    current = current - 100
                }
                hold.push(current)
            } else {
                hold.push(current)
            }
        }
        setGraphData(prevGraphData => ({
            ...prevGraphData,
            overList: hold
        }))
    }
    const calcUnder = () => {
        let hold = []
        let current = 0
        for (const game of tournamentData.games.mens) {
            if (game.over) {
                if (game['score1'] + game['score2'] > game['over']) {
                    current = current - 100
                } else if (game['score1'] + game['score2'] < game['over']) {
                    current = current + 100
                }
                hold.push(current)
            } else {
                hold.push(current)
            }
        }
        setGraphData(prevGraphData => ({
            ...prevGraphData,
            underList: hold
        }))
    }
    const calcMLFav = () => {
        const hold: number[] = []
        let current: number = 0
        let winnings: number = 0
        let factor: number = 0
        for (const game of tournamentData.games.mens) {
            if (game.ml1 < 0) {
                if (game.score1 > game.score2) {
                    factor = 100 / Math.abs(game.ml1)
                    winnings = Math.floor((factor * 100) * 100) / 100
                    current = current + winnings
                } else {
                    current = current - 100
                }
            } else {
                if (game.score1 < game.score2) {
                    factor = 100 / Math.abs(game.ml1)
                    winnings = Math.floor((factor * 100) * 100) / 100
                    current = current + winnings
                } else {
                    current = current - 100
                }
            }
            hold.push(current)
        }
        setGraphData(prevGraphData => ({
            ...prevGraphData,
            mlFavList: hold
        }))
    }
    const calcMLDog = () => {
        const hold: number[] = []
        let current: number = 0
        for (const game of tournamentData.games.mens) {
            if (game.ml1 > 0) {
                if (game.score1 > game.score2) {
                    current = current + game.ml1
                } else {
                    current = current - 100
                }
            } else {
                if (game.score1 < game.score2) {
                    current = current + game.ml2
                } else {
                    current = current - 100
                }
            }
            hold.push(current)
        }
        setGraphData(prevGraphData => ({
            ...prevGraphData,
            mlDogList: hold
        }))

    }
    const calcSpreadFav = () => {
        const hold: number[] = []
        let current: number = 0
        for (const game of tournamentData.games.mens) {
            if (game.line > 0) {
                if ((game.score1 + game.line) < game.score2) {
                    current = current + 100
                } else if ((game.score1 + game.line) > game.score2) {
                    current = current - 100
                }
            } else if (game.line < 0) {
                if ((game.score1 + game.line) > game.score2) {
                    current = current + 100
                } else if ((game.score1 + game.line) < game.score2) {
                    current = current - 100
                }
            }
            hold.push(current)
        }
        setGraphData(prevGraphData => ({
            ...prevGraphData,
            spreadFavList: hold
        }))
    }
    const calcSpreadDog = () => {
        const hold: number[] = []
        let current: number = 0
        for (const game of tournamentData.games.mens) {
            if (game.line < 0) {
                if ((game.score1 + game.line) < game.score2) {
                    current = current + 100
                } else if ((game.score1 + game.line) > game.score2) {
                    current = current - 100
                }
            } else if (game.line > 0) {
                if ((game.score1 + game.line) > game.score2) {
                    current = current + 100
                } else if ((game.score1 + game.line) < game.score2) {
                    current = current - 100
                }
            }
            hold.push(current)
        }
        setGraphData(prevGraphData => ({
            ...prevGraphData,
            spreadDogList: hold
        }))

    }
    const getLargestNumber = (...values: (number | undefined)[]): number | undefined => {
        // Filter out undefined values and spread the remaining values into Math.max
        const validValues = values.filter((value): value is number => value !== undefined);

        if (validValues.length === 0) {
            return undefined; // Return undefined if there are no valid numbers
        }

        return Math.max(...validValues);
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const renderGraphInterval = async (renderObj: renderObjInterface, games: number) => {
        let renderList: chartDataSet[] = [];
        if (chartRef.current && chartRef.current.data) {
            for (let i = 1; i <= games; i++) {
                console.log(i)
                await sleep(500)
                chartRef.current.data.labels?.push(i)
                if (renderObj?.over) {
                    renderObj['over'].data.push(graphData?.overList?.[i - 1] || 0)
                }
                if (renderObj?.under) {
                    renderObj['under'].data.push(graphData?.underList?.[i - 1] || 0)
                }
                if (renderObj?.mlFav) {
                    renderObj['mlFav'].data.push(graphData?.mlFavList?.[i - 1] || 0)
                }
                if (renderObj?.mlDog) {
                    renderObj['mlDog'].data.push(graphData?.mlDogList?.[i - 1] || 0)
                }
                if (renderObj?.spreadFav) {
                    renderObj['spreadFav'].data.push(graphData?.spreadFavList?.[i - 1] || 0)
                }
                if (renderObj?.spreadDog) {
                    renderObj['spreadDog'].data.push(graphData?.spreadDogList?.[i - 1] || 0)
                }
                renderList = convertToChartDataSetArray(renderObj)
                chartRef.current.data.datasets = renderList
                chartRef.current.update()
            }
        }
    }
    const renderGraphInstant = (renderObj: renderObjInterface, games: number) => {
        let renderList: chartDataSet[] = [];
        if (chartRef.current && chartRef.current.data) {
            for (let i = 1; i <= games; i++) {
                console.log(i)
                chartRef.current.data.labels?.push(i)
                if (renderObj?.over) {
                    renderObj['over'].data.push(graphData?.overList?.[i - 1] || 0)
                }
                if (renderObj?.under) {
                    renderObj['under'].data.push(graphData?.underList?.[i - 1] || 0)
                }
                if (renderObj?.mlFav) {
                    renderObj['mlFav'].data.push(graphData?.mlFavList?.[i - 1] || 0)
                }
                if (renderObj?.mlDog) {
                    renderObj['mlDog'].data.push(graphData?.mlDogList?.[i - 1] || 0)
                }
                if (renderObj?.spreadFav) {
                    renderObj['spreadFav'].data.push(graphData?.spreadFavList?.[i - 1] || 0)
                }
                if (renderObj?.spreadDog) {
                    renderObj['spreadDog'].data.push(graphData?.spreadDogList?.[i - 1] || 0)
                }
            }
            renderList = convertToChartDataSetArray(renderObj)
            chartRef.current.data.datasets = renderList
            chartRef.current.update()
        }
    }

    const renderGraphPrep = (instant: boolean) => {
        let renderList: chartDataSet[] = []
        const renderObj: renderObjInterface = {}
        if (graphData) {
            if (graphData?.overList && graphData?.overList?.length > 0) {
                renderObj['over'] = {
                    label: 'Over',
                    borderColor: getRandomColorHSL(),
                    backGroundColor: getRandomColorHSL(),
                    data: [0],
                    tension: 0.4,
                }
            }
            if (graphData?.underList && graphData?.underList?.length > 0) {
                renderObj['under'] = {
                    label: 'Under',
                    borderColor: getRandomColorHSL(),
                    backGroundColor: getRandomColorHSL(),
                    data: [0],
                    tension: 0.4,
                }
            }
            if (graphData?.mlFavList && graphData?.mlFavList?.length > 0) {
                renderObj['mlFav'] = {
                    label: 'ML Fav',
                    borderColor: getRandomColorHSL(),
                    backGroundColor: getRandomColorHSL(),
                    data: [0],
                    tension: 0.4,
                }
            }
            if (graphData?.mlDogList && graphData?.mlDogList?.length > 0) {
                renderObj['mlDog'] = {
                    label: 'ML Dog',
                    borderColor: getRandomColorHSL(),
                    backGroundColor: getRandomColorHSL(),
                    data: [0],
                    tension: 0.4,
                }
            }
            if (graphData?.spreadFavList && graphData?.spreadFavList?.length > 0) {
                renderObj['spreadFav'] = {
                    label: 'Spread Fav',
                    borderColor: getRandomColorHSL(),
                    backGroundColor: getRandomColorHSL(),
                    data: [0],
                    tension: 0.4,
                }
            }
            if (graphData?.spreadDogList && graphData?.spreadDogList?.length > 0) {
                renderObj['spreadDog'] = {
                    label: 'Spread Dog',
                    borderColor: getRandomColorHSL(),
                    backGroundColor: getRandomColorHSL(),
                    data: [0],
                    tension: 0.4,
                }
            }
        }
        // console.log(renderObj)
        console.log(graphData?.overList?.length, graphData?.underList?.length, graphData?.mlFavList?.length, graphData?.mlDogList?.length, graphData?.spreadFavList?.length, graphData?.spreadDogList?.length)
        const games = getLargestNumber(graphData?.overList?.length, graphData?.underList?.length, graphData?.mlFavList?.length, graphData?.mlDogList?.length, graphData?.spreadFavList?.length, graphData?.spreadDogList?.length) || 0
        renderList = convertToChartDataSetArray(renderObj)
        console.log(renderList)
        console.log(games)
        if (chartRef.current && chartRef.current.data) {
            chartRef.current.data.datasets = renderList
            chartRef.current.update()
            if (instant) {
                renderGraphInstant(renderObj, games);

            } else {
                renderGraphInterval(renderObj, games);
            }
            // for (let i = 1; i < games; i++) {
            //     chartRef.current.data.labels?.push(i)
            //     if (renderObj?.over) {
            //         renderObj['over'].data.push(graphData?.overList?.[i - 1] || 0)
            //     }
            // }
            // renderList = convertToChartDataSetArray(renderObj)
            // chartRef.current.data.datasets = renderList
            // chartRef.current.update()
        }
    }
    const DataParse = () => {
        if (graphData) {
            if (selectedBets.length > 0) {
                if (selectedBets.includes('over')) {
                    calcOver()
                } else {
                    setGraphData(prevGraphData => ({
                        ...prevGraphData,
                        overList: null
                    }))
                }
                if (selectedBets.includes('under')) {
                    calcUnder()
                } else {
                    setGraphData(prevGraphData => ({
                        ...prevGraphData,
                        underList: null
                    }))
                }
                if (selectedBets.includes('mlFav')) {
                    calcMLFav()
                } else {
                    setGraphData(prevGraphData => ({
                        ...prevGraphData,
                        mlFavList: null
                    }))
                }
                if (selectedBets.includes('mlDog')) {
                    calcMLDog()
                } else {
                    setGraphData(prevGraphData => ({
                        ...prevGraphData,
                        mlDogList: null
                    }))
                }
                if (selectedBets.includes('spreadFav')) {
                    calcSpreadFav()
                } else {
                    setGraphData(prevGraphData => ({
                        ...prevGraphData,
                        spreadFavList: null
                    }))
                }
                if (selectedBets.includes('spreadDog')) {
                    calcSpreadDog()
                } else {
                    setGraphData(prevGraphData => ({
                        ...prevGraphData,
                        spreadDogList: null
                    }))
                }
            }
        }

    }
    const simulateBets = () => {
        setRenderInstant(false)
        DataParse()
    }
    const displayBets = () => {
        setRenderInstant(true)
        DataParse()
    }
    return (
        <div id="ChartComponent">
            {/* <button onClick={() => { console.log(chartRef.current) }}>Hello world</button> */}
            <Line
                ref={chartRef}
                data={{
                    labels: [0],
                    datasets: [
                    ],
                }}
                options={{
                    scales: {
                        x: {
                        }
                    }
                }}
            />
            <Flex justify={"center"}>
                <ButtonGroup gap={8}>
                    <Button colorScheme='teal' size='lg' onClick={simulateBets} isDisabled={(selectedBets.length > 0) ? false : true}>Simulate</Button>
                    <Button colorScheme='orange' size='lg' onClick={displayBets} isDisabled={(selectedBets.length > 0) ? false : true}>Display</Button>
                </ButtonGroup>
            </Flex>
        </div >
    );
}

export default ChartComponent;

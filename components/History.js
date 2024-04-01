import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { FontAwesome } from '@expo/vector-icons';
import React, {useRef, useState, useEffect } from 'react';


const History = ({ tasks }) => {

    const today = new Date();
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var previousDays = [];
    var prevDaysOfTheWeek = [];


    const weekData = {
        labels: [],
        datasets: [
            {
                data: []
            }
        ]
    }

    // Initialize weekly data
    useEffect(() => {
        for (let i = 0; i < 7; i++){
            const previousDay = new Date(today);
            previousDay.setDate(today.getDate() - i);
            previousDays.push(previousDay.getDay());
        }
        previousDays = previousDays.slice().reverse();

        // Loop through previousDays, find value n, push daysOfTheWeek[n] to prevDaysOfTheWeek
        for (let i = 0; i < previousDays.length; i++)
        {
            prevDaysOfTheWeek.push(daysOfTheWeek[previousDays[i]]);
        }
        //console.log(prevDaysOfTheWeek);

        weekData.labels = prevDaysOfTheWeek;
        console.log(weekData);
    }, []);


    const [isYear, setIsYear] = useState(false);

    const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-02-30", count: 4 },
        { date: "2017-11-30", count: 4 }
      ];

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
        
        // barRadius = ;
    };

    const [componentHeight, setComponentHeight] = useState(null);
    const [componentWidth, setComponentWidth] = useState(null);

    const onLayout=(event)=> {
        const {x, y, height, width} = event.nativeEvent.layout;   
        // Subtract by margin and padding styling on the outer View
        setComponentHeight(height - (28 + 16));
        setComponentWidth(width - (16*2));
    }


    return (
        <View className="container mt-7 w-10/12 rounded-3xl bg-[#27252F] p-4 h-60" onLayout={onLayout}>
            <View className="flex flex-row">
                <Pressable  onPress={() => {setIsYear(true); console.log(isYear);}} className="w-1/2 items-end px-2">
                    <Text className="text-[#BEBEBE] font-normal" style={{  textDecorationLine: isYear ? 'underline' : 'none' }}>YEAR</Text>
                </Pressable>
                <Text className="text-[#BEBEBE]">|</Text>
                <Pressable onPress={() => {setIsYear(false); console.log(isYear);}} className="w-1/2 items-start px-2">
                    <Text className="text-[#BEBEBE] font-normal" style={{  textDecorationLine: isYear ? 'none' : 'underline' }}>WEEK</Text>
                </Pressable>
            </View>

            <View>
                <Text className="text-[#BEBEBE]">Select a task to view</Text>
                <View className="flex flex-row justify-center">

                </View>
            </View>

            {isYear && 
                <View>
                    <Text className="text-[#BEBEBE]">isYear is true</Text>
                    <ContributionGraph
                        values={commitsData}
                        endDate={new Date("2017-12-31")}
                        numDays={365}
                        width={componentWidth}
                        height={componentHeight}
                        chartConfig={chartConfig}
                        gutterSize={1}
                        squareSize={15}
                    />
                </View>
            }
            {!isYear && 
                <View>
                    <BarChart
                        data={weekData}
                        width={componentWidth}
                        height={componentHeight}
                        yAxisLabel="$"
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                    />
                </View>
            }

        </View>
    );
};

export default History;
import { StyleSheet, Text, View, Pressable, Animated, TouchableOpacity } from 'react-native';
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


const baseContribChart = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: .5,
    useShadowColorFromDataset: false, // optional
};
const baseBarChartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: .5,
    useShadowColorFromDataset: false, // optional
};

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

const History = ({ tasks }) => {

    const today = new Date();
    // This is what will be displayed
    var previousDays = [];
    // This is what will be used to get like dates
    var prevDaysFull = [];
    const [isYear, setIsYear] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const scaleAnim = useState(new Animated.Value(1))[0];
    
    const handleTaskSelection = (task) => {
        setSelectedTask(task);
        Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 300,
        useNativeDriver: true
        }).start();
    };

    for (let i = 0; i < 7; i++){
        const previousDay = new Date(today);
        previousDay.setDate(today.getDate() - i);
        prevDaysFull.push(previousDay.toLocaleDateString());
        previousDays.push(`${previousDay.getMonth()}/${previousDay.getDate()}`);
    }

    previousDays = previousDays.slice().reverse();
    prevDaysFull = prevDaysFull.slice().reverse();

    const weekData = {
        labels: previousDays,
        datasets: [
            {
                data: [0, 0, 0, 0, 0, 0, 0]
            },
        ]
    }


    const [barChartConfig, setBarChartConfig] = useState(baseBarChartConfig);
    const [barData, setBarData] = useState(weekData);

    // Initialize task data
    useEffect(() => {

    }, []);

    // On change of selectedTask
    useEffect(() => {
        console.log('Selected task: ', selectedTask);
        if (selectedTask){
            const newChartConfig = {...barChartConfig, color: (opacity = 1) => selectedTask.taskColor };
            setBarChartConfig(newChartConfig);

            // Update data
            // First find the days we need to get
            const daysWeNeed = []
            for (let i = 0; i < 7; i++){
                const previousDay = new Date(today);
                previousDay.setDate(today.getDate() - i);
                daysWeNeed.push(previousDay.toLocaleDateString());
            }
            // Then we loop through every date then through task data and get all objects we need for each day
            const dayDataObjects = []
            for (let i = 0; i < daysWeNeed.length; i++)
            {
                const currentDate = daysWeNeed[i];
                for (let j = 0; j < selectedTask.dayData.length; j++)
                {
                    if (selectedTask.dayData[j].date == currentDate)
                    {
                        dayDataObjects.push(selectedTask.dayData[j]);
                    }
                }
            }
            console.log('Day data objects: ', dayDataObjects);
            // No we loop through dayDataObjects, find all objects with the same date, add all of the totalElapsedTime up
            // Now we loop through prevDaysFull and get similar dayDataObjects then add their elapsed time

            for (let i = 0; i < prevDaysFull.length; i++)
            {
                for (let j = 0; j < dayDataObjects.length; j++)
                {
                    console.log(dayDataObjects[j]);
                    if (dayDataObjects[j].date == prevDaysFull[i])
                    {
                        console.log('Similar dates');
                        const newBarData = { ...barData};
                        newBarData.datasets[0].data[i] += dayDataObjects[j].totalElapsedTime/10000;
                        setBarData(newBarData);
                    }
                }
            }
            console.log(barData);

        }
        else {
            handleTaskSelection(tasks[0]);
        }
        
    }, [selectedTask]);

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
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        {tasks.map((task, index) => (
                            <TouchableOpacity
                            key={index}
                            onPress={() => handleTaskSelection(task)}
                            style={{ alignItems: 'center', padding: 10 }}
                            >
                            <Animated.View
                                style={{
                                transform: [{ scale: selectedTask === task ? scaleAnim : 1 }]
                                }}
                            >
                                <FontAwesome name="circle" size={20} color={task.taskColor} />
                            </Animated.View>
                            </TouchableOpacity>
                        ))}
                    </View>
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
                        chartConfig={baseContribChart}
                        gutterSize={1}
                        squareSize={15}
                    />       
                </View>
            }
            {!isYear && 
                <View className=" -ml-9 -mt-3">
                    <BarChart
                        data={weekData}
                        width={componentWidth}
                        height={componentHeight - 30}
                        withHorizontalLabels={false}
                        chartConfig={barChartConfig}
                        withInnerLines={false}
                        showValuesOnTopOfBars={true}
                    />
                </View>
            }

        </View>
    );
};

export default History;
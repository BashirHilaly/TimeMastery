import React, {useRef, useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Add a pan handler to end a task when you put it into the left component

const OngoingTasks = ({ startTimer }) => { 
    useEffect(() => {
        if (startTimer) {
          console.log('Task Start Recieved: ', startTimer);
          // Perform any action here
        }
      }, [startTimer]);

    const [startTime, setStartTime] = useState(null);
    const [isActive, setIsActive] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);

    useEffect(() => {
        const initializeTime = async () => {
            const storedStartTime = await AsyncStorage.getItem('startTime');
            if (storedStartTime && !isActive) {
            setStartTime(new Date(storedStartTime));
            setTimeElapsed(Math.floor((new Date() - new Date(storedStartTime)) / 1000));
            }
        };

        initializeTime();
    }, []);

    useEffect(() => {
        let interval = null;
        if (isActive) {
            if (!startTime) {
            const now = new Date();
            setStartTime(now);
            AsyncStorage.setItem('startTime', now.toISOString());
            }
            interval = setInterval(() => {
            setTimeElapsed(elapsed => elapsed + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime]);

    const toggle = () => {
        setIsActive(!isActive);
        if (!isActive) {
            AsyncStorage.removeItem('startTime');
            setStartTime(null);
        }
    };

    const reset = () => {
        setTimeElapsed(0);
        setIsActive(false);
        AsyncStorage.removeItem('startTime');
        setStartTime(null);
    };

    const formatTime = () => {
        const hours = Math.floor(timeElapsed / 3600);
        const minutes = Math.floor((timeElapsed % 3600) / 60);
        const seconds = timeElapsed % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <LinearGradient className="bg-slate-500 h-64 w-11/12 p-2 rounded-3xl" colors={['#27252F', '#3C3258', '#5A478E']} style={{ flex: 1 }}>
            <View className="mx-auto pt-2">
                <AntDesign name="clockcircleo" size={30} color="#BEBEBE" />
            </View>
            <View className="h-px my-2 border-1 bg-[#6D6D6D] mt-3"/>
            <Text className="text-[8px] text-[#5C5A5A] text-center -mt-1">Ongoing tasks</Text>
        </LinearGradient>
    )
}

export default OngoingTasks;
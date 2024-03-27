import React, {useRef, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const OngoingTask = ( task ) => {

    const [startTime, setStartTime] = useState(null);
    const [isActive, setIsActive] = useState(false);
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
        <View>
            <Text>Task</Text>
        </View>
    )
}

export default OngoingTask;
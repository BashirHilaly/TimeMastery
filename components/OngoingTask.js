import React, {useRef, useState, useEffect } from 'react';
import { Text, View, Animated, PanResponder } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';


const OngoingTask = ({ task }) => {

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

    const [pickedUp, setPickedUp] = useState(false);

  
    const pickUpTask = () => {
        setPickedUp(true);
        //console.log('Task picked up');
        fadeOut();
    }
    const putDownTask = () => {
        setPickedUp(false);
        //console.log('Task put down');
        fadeIn();
    }

    const pan = useRef(new Animated.ValueXY()).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: .5,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
    };

    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            pickUpTask();
          },
          onPanResponderMove: (event, gestureState) => {
            Animated.event(
                [
                  null, // raw event argument ignored
                  { dx: pan.x, dy: pan.y }, // gestureState args mapped to dx, dy
                ],
                { useNativeDriver: false } // ensure useNativeDriver is false if you're updating non-native properties
              )(event, gestureState); // Call Animated.event as a function with the event and gestureState
              console.log(pan.x._value, pan.y._value); // Log the updated values
          },
          onPanResponderRelease: (event, gestureState) => {
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
            putDownTask();
          }
        })
    ).current;



    return (
      <View>
        <Animated.View 
            style={{
                transform: [{translateX: pan.x}, {translateY: pan.y}],
                opacity: fadeAnim
            }}
            {...panResponder.panHandlers}
            className="flex flex-row mb-4">
            <View className="basis-1/2 items-start">
                <FontAwesome name="circle" size={16} color={task.taskColor} />
            </View>
            <View className="basis-1/2 items-end">
                <Text className="font-semibold text-[#BEBEBE]">{ task.taskName }</Text>
            </View>
        </Animated.View>
      </View>
    )
}

export default OngoingTask;
import React, {useRef, useState, useEffect } from 'react';
import { Text, View, Animated, PanResponder } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

// Constants
const TIMER_INTERVAL = 1000; // 1 second
const TIMER_STORAGE_KEY = '@timer:start_time'; // AsyncStorage key to store timer start time

const dataEntryObject = { date: '3/14/2006', totalElapsedTime: 3 };

const OngoingTask = ({ task, stopTask }) => {

    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0); // This variable is for rendering time in view
    const elapsedTimeRef = useRef(0);
    const startDate = useRef();

    useEffect(() => {
      let interval;
      if (startTime !== null) {
        interval = setInterval(() => {
          const currentTime = Date.now();
          const elapsed = currentTime - startTime;
          elapsedTimeRef.current = elapsed;
          setElapsedTime(elapsed);
        }, 1000); // Update every second
      }
  
      return () => clearInterval(interval);
    }, [startTime]);

    const formatTime = (milliseconds) => {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const startTimer = () => {
      const currentDate = new Date();
      setStartTime(Date.now());
      startDate.current = currentDate.toLocaleDateString();
    }
    const stopTimer = () => {

      //console.log('Timer started on:', startDate); // Log the start date
      //console.log('Timer lasted for:', elapsedTimeRef.current, ' milliseconds before it was stopped');
      setStartTime(null);
      console.log('Stopped Task: ', task);
      // Updated the tasks values
      var dateExists = false;
      // Check if they have any dayData if not create an object
      if (task.dayData.length < 1)
      {
        task.dayData.push({ date: startDate.current, totalElapsedTime: elapsedTimeRef.current });
      }
      else
      {
        task.dayData.forEach(day => {
          if (day.date === startDate) {
            day.totalElapsedTime += elapsedTimeRef.current;
            dateExists = true;
          }
        })
        if (!dateExists){
          task.dayData.push({ date: startDate.current, totalElapsedTime: elapsedTimeRef.current });
        }
      }

      task.totalTime += elapsedTimeRef.current;
      stopTask(task);
    }

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
              // console.log(pan.x._value, pan.y._value); // Log the updated values
          },
          onPanResponderRelease: (event, gestureState) => {

            // If the task is far left then remove the task
            if (pan.x._value < -135){
              //Stop timer for task and update its values
              //console.log('should work');
              stopTimer();
              //console.log('Stop Timer');
            }
            else {
              Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
              putDownTask();
            }
          }
        })
    ).current;


    if (task.taskStatus == 'Ongoing' && startTime == null){
      console.log('Start Timer');
      startTimer();
    }


    return (
      <View>
        <Animated.View 
            style={{
                transform: [{translateX: pan.x}, {translateY: pan.y}],
                opacity: fadeAnim
            }}
            {...panResponder.panHandlers}
            className="flex flex-row mb-4 justify-between">
            <View className="items-start">
                <FontAwesome name="circle" size={16} color={task.taskColor} />
            </View>
            <View className='items-center'>
              <Text className="text-xs font-normal text-[#BEBEBE]">{formatTime(elapsedTime)}</Text>
            </View>
            <View className="items-end">
                <Text className="font-semibold text-[#BEBEBE]">{ task.taskName }</Text>
            </View>
        </Animated.View>
      </View>
    )
}

export default OngoingTask;
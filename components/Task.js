import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';



const Task = ({ task, onRemoveTask, onStartTask }) => {

    const pan = useRef(new Animated.ValueXY()).current;

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
              //console.log(pan.x._value, pan.y._value); // Log the updated values
          },
          onPanResponderRelease: (event, gestureState) => {

            // If the task is far left then remove the task
            if (pan.x._value < -65){
              console.log('Task Removed');
              onRemoveTask(task.taskName);
            }
            // If the task is over the ongoing tasks than start the ongoing task
            if (pan.x._value > 165)
            {
              console.log('Task started!');
              onStartTask(task);
            }
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
            putDownTask();
          }
        })
      ).current;

    return (
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
    )
}

export default Task;
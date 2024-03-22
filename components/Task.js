import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, PanResponder, Animated, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Task = ({ taskName, taskColor }) => {

    const pan = useRef(new Animated.ValueXY()).current;

    const [pickedUpTask, setPickedUpTask] = useState();
    const [opacity, setOpacity] = useState(1);
  
    const pickUpTask = () => {
        console.log('Task picked up');
        fadeOut();
    }
    const putDownTask = () => {
        console.log('Task put down');
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
          onPanResponderMove: Animated.event(
            [null, { dx: pan.x, dy: pan.y }],
            { useNativeDriver: true }
          ),
          onPanResponderGrant: () => {
            pickUpTask();
          },
          onPanResponderRelease: () => {
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            putDownTask();
          }
        })
      ).current;

    return (
        <Animated.View 
            style={{
                transform: pan.getTranslateTransform(),
                opacity: fadeAnim
            }}
            {...panResponder.panHandlers}
            className="flex flex-row mb-4">
            <View className="basis-1/2 items-start">
                <FontAwesome name="circle" size={16} color={taskColor} />
            </View>
            <View className="basis-1/2 items-end">
                <Text className="font-semibold text-[#BEBEBE]">{ taskName }</Text>
            </View>
        </Animated.View>
    )
}

export default Task;
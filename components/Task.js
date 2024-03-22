import React, { useRef } from 'react';
import { StyleSheet, Text, View, PanResponder, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const Task = ({ taskName, taskColor }) => {

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: Animated.event(
            [null, { dx: pan.x, dy: pan.y }],
            { useNativeDriver: false }
          ),
          onPanResponderRelease: () => {
            Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
          }
        })
      ).current;

    return (
        <Animated.View 
            style={{
                transform: pan.getTranslateTransform()
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
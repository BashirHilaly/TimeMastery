import React, {useRef, useState} from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';


const OngoingTasks = () => {
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
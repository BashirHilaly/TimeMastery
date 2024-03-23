import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, Pressable, FlatList, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Task from './Task';



const AddTask = ({ tasks }) => {


    return (
        <LinearGradient className="bg-slate-500 h-64 w-11/12 p-2 rounded-3xl" colors={['#27252F', '#335650', '#3E7969']} style={{ flex: 1 }}>
            <Pressable onPress={() => alert('You pressed a button.')}>
            <Text className="text-[#BEBEBE] font-bold text-xl text-center">ADD TASK</Text>
            <View className="mx-auto -mt-1">
                <Ionicons name="add-outline" size={20} color="#BEBEBE" />
            </View>
            <View className="h-px my-2 border-1 bg-[#6D6D6D]"/>
            </Pressable>
            <View className="p-2">
            {tasks.map(item => (
                <Task key={item.taskName} taskName={item.taskName} taskColor={item.taskColor}/>
            ))}
            </View>
        </LinearGradient>
    )
}

export default AddTask;
import React, {useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Modal, Alert, Animated  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import tailwind from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';



import Task from './Task';

const colors = ['#6EFAFB', '#EE4266', '#89FC00', '#FCCA46', '#247BA0']

const ScalePressable = ({ color, onPress, scale }) => {
    return (
      <Pressable onPress={() => onPress(color)} className="p-3">
        <Animated.View style={[{ transform: [{ scale }]}]}>
            <FontAwesome name="circle" size={25} color={color} />
        </Animated.View>
      </Pressable>
    );
  };

const AddTask = ({ tasks, onAddTask, onStartTask, onRemoveTask }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({});
    const [selectedColor, setSelectedColor] = useState(null);

    
    useEffect(() => {
        console.log('Selected Color: ', selectedColor);
      }, [selectedColor]);
    
    useEffect(() => {
        console.log('Modal Status: ', modalVisible);
    }, [modalVisible]);
      

    const handleInputChange = (name, value) => {
        // Create new item with an incremented id
        const newTask = { 
            taskId: null, taskName: value, taskColor: selectedColor, taskStatus: 'NotOngoing',
            dayData: [],
            totalTime: 0
        }
        
        // Update the state to include the new item
        // Update the state to include the new item
        setFormData(newTask);
    };

    const missingInputAlert = () =>
        Alert.alert('Invalid Task Input', 'Please fill out all inputs', [
        {
            text: 'Ok',
            onPress: () => console.log('Ok')
        }
        ]);
        const taskNameExistsAlert = () =>
        Alert.alert('Invalid Task Input', 'Task name already exists', [
        {
            text: 'Ok',
            onPress: () => console.log('Ok')
        }
    ]);

    const isEmpty = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    // loop through current tasks to see if any have matching names
    const commonNames = (name) => {
        return tasks.some(task => task.taskName.toLowerCase() === name.toLowerCase());
    }
    
    const handleSubmit = () => {
        // Handle form submission
        //console.log(formData);
        if (formData.taskName === '' || isEmpty(formData) || selectedColor == null){
            missingInputAlert();
        }
        else {
            // Check if name is eligible
            if (!commonNames(formData.taskName))
            {
                // Add color to form data
                setFormData(formData.taskColor = selectedColor);
                //console.log(formData);
                // Add object
                onAddTask(formData);
                setModalVisible(false);
            }
            else{
                taskNameExistsAlert();
                console.log('Task with the same name exists');
            }
        }
        setFormData({});
    };

    const [possibleColors, setPossibleColors] = useState(colors);
    const scaleAnim = useRef(new Map()).current;

    const createScaleAnimation = (color) => {
        if (!scaleAnim.has(color)) {
            scaleAnim.set(color, new Animated.Value(1));
        }
        return scaleAnim.get(color);
    };
    
    const onPressHandler = (color) => {
        setSelectedColor(color);
        if (selectedColor) {
            Animated.timing(scaleAnim.get(selectedColor), {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            }).start();
        }
        Animated.timing(scaleAnim.get(color), {
            toValue: 1.6,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };



    return (
        <LinearGradient className="bg-slate-500 h-64 w-11/12 p-2 rounded-3xl" colors={['#27252F', '#335650', '#3E7969']} style={{ flex: 1 }}>
            <Pressable onPress={() => setModalVisible(true)}>

                <Modal
                    animationType="slcolore"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);

                    }}
                >
                    <View className="flex-1 items-center justify-center bg-black/60 bg-opacity-20 ">
                        <View className="bg-[#141319] p-10 rounded-2xl w-4/5">
                            <TextInput 
                            className="bg-slate-200 border border-slate-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                            placeholder="Task Name" 
                            onChangeText={text => handleInputChange('taskName', text)} />
                            <View className="flex flex-row mx-auto mt-3">
                                {possibleColors.map(color => (
                                    <ScalePressable 
                                        key={color}
                                        color={color}
                                        onPress={onPressHandler}
                                        scale={createScaleAnimation(color)}
                                    />
                                ))}
                            </View>
                            <View className="flex flex-row mt-4">
                                <Pressable title="Submit" onPress={() => {
                                                                handleSubmit();
                                                                setModalVisible(false);
                                                                }} className="w-1/3 mx-auto">
                                    <LinearGradient className="p-2 rounded-md " colors={['#66BB6A', '#388E3C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                        <Text className="text-center text-white font-normal text-base">Add</Text>
                                    </LinearGradient>
                                </Pressable >
                                <Pressable title="Cancel" onPress={() => setModalVisible(false)} className="w-1/3 mx-auto">
                                    <LinearGradient className="p-2 rounded-md " colors={['#EF5350', '#B71C1C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                        <Text className="text-center text-white font-normal text-base">Cancel</Text>
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Text className="text-[#BEBEBE] font-bold text-xl text-center">ADD TASK</Text>
                <View className="mx-auto -mt-1">
                    <Ionicons name="add-outline" size={20} color="#BEBEBE" />
                </View>
                <View className="h-px my-2 border-1 bg-[#6D6D6D]"/>
            </Pressable>
            <View className="p-2">
            {tasks.map(item => (
                item.taskStatus === 'NotOngoing' && <Task key={item.taskId} task={item} onStartTask={onStartTask} onRemoveTask={onRemoveTask}/>
            ))}
            </View>
        </LinearGradient>
    )
}

const styles = (scaleAnim) => StyleSheet.create({
    selectedPressable: {
        // Styles for the selected Pressable, e.g., a ring around it
        borderColor: 'white',
        borderWcolorth: 2,
        borderRadius: 10,
        transform: [{scale: scaleAnim}]
    },
});

export default AddTask;
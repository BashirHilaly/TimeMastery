import React, {useRef, useState} from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Modal, TouchableWithoutFeedback  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Task from './Task';



const AddTask = ({ tasks }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [formData, setFormData] = useState({});

    const handleInputChange = (name, value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    
    const handleSubmit = () => {
        // Handle form submission
        console.log(formData);
        setModalVisible(false);
    };
    

    // Change All buttons to Pressables

    return (
        <LinearGradient className="bg-slate-500 h-64 w-11/12 p-2 rounded-3xl" colors={['#27252F', '#335650', '#3E7969']} style={{ flex: 1 }}>
            <Pressable onPress={() => setModalVisible(true)}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback  onPress={() => setModalVisible(false)}>
                        <View className="flex-1 items-center justify-center bg-black/60 bg-opacity-20 ">
                            <View className="bg-[#141319] p-10 rounded-2xl w-4/5">
                                <TextInput 
                                className="bg-slate-200 border border-slate-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                                placeholder="Task Name" 
                                onChangeText={text => handleInputChange('name', text)} />
                                <TextInput
                                placeholder="Email"
                                className="bg-slate-200 border border-slate-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                onChangeText={text => handleInputChange('email', text)}
                                />
                                <Pressable title="Submit" onPress={handleSubmit} className="w-1/3 mx-auto">
                                    <LinearGradient className="p-2 rounded-md " colors={['#66BB6A', '#388E3C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                        <Text className="text-center text-white">Add</Text>
                                    </LinearGradient>
                                </Pressable >
                                <Pressable title="Cancel" onPress={() => setModalVisible(false)} className="w-1/3 mx-auto">
                                    <LinearGradient className="p-2 rounded-md " colors={['#EF5350', '#B71C1C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                        <Text className="text-center text-white">Cancel</Text>
                                    </LinearGradient>
                                </Pressable>
                            </View>
                        </View>
                    </TouchableWithoutFeedback >
                </Modal>

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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '80%',
    },
});

export default AddTask;
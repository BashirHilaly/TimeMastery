import { StyleSheet, Text, View, Pressable, FlatList, SafeAreaView } from 'react-native';
import React, {useRef, useState, useEffect, useContext } from 'react';
import Summary from './components/Summary';
import History from './components/History';
import AddTask from './components/AddTask';
import OngoingTasks from './components/OngoingTasks';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeWindStyleSheet } from "nativewind";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



NativeWindStyleSheet.setOutput({
  default: "native",
});


// Storage solution: https://react-native-async-storage.github.io/async-storage/


var taskData = [
  { taskId: 0, taskName: "Task 1", taskColor: "#CFAADF", taskStatus: 'NotOngoing',
  dayData: [
    { date: '3/14/2006',
      totalElapsedTime: 3 }
    ],
  totalTime: 10 },
  { taskId: 1, taskName: "Task 2", taskColor: "#FEDA98", taskStatus: 'NotOngoing',
    dayData: [
      { date: '3/14/2006',
        totalElapsedTime: 3 }
      ],
    totalTime: 10 },
  { taskId: 2, taskName: "Task 3", taskColor: "#89FC00", taskStatus: 'NotOngoing',
  dayData: [
    { date: '3/14/2006',
      totalElapsedTime: 3 }
    ],
  totalTime: 10 }]

const App = () => {

  const [tasks, setTasks] = useState(taskData);
  
  const saveTaskData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log('Saved tasks: ', value);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTasks = (newTasks) => {
    setTasks(newTasks); // Update the state
    saveTaskData('taskData', newTasks); // Save to local storage
  };  

  const loadTasksFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('taskData');
      if (storedData) {
        console.log('Loaded Tasks: ', JSON.parse(storedData));
        setTasks(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasksFromStorage();
  }, []);

  useEffect(() => {
    taskData = tasks;
    //console.log('tasks: ', taskData);
  }, [tasks]);

  const handleAddTask = (newTask) => {
    var prevID = -1
    if (tasks.length > 0){
      prevID = taskData[taskData.length - 1].taskId;
    }
    newTask.taskId = prevID + 1
    const updatedTaskData = [...taskData, newTask];
    updateTasks(updatedTaskData);
  };
  const handleRemoveTask = (task) => {
    const taskId = task.taskId;
    const updatedTaskData = taskData.filter(t => t.taskId !== taskId);
    updateTasks(updatedTaskData);
    console.log("Removed task: ", task);
  };
  

  // Fixed tasks coming back from the dead using the taskData var
  const handleStartTask = (taskToStart) => {
    //console.log('Begining of start task: ', tasks);
    const taskIndex = taskData.findIndex(task => task.taskId === taskToStart.taskId);

    if (taskIndex !== -1){
      const updatedTasks = [...taskData];

      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        taskStatus: 'Ongoing'
      };

      //console.log('Updated tasks: ', updatedTasks);
      updateTasks(updatedTasks);
    }
    //console.log('Started task: ', taskToStart);
  }

  const handleStopTask = (taskToStop) => {
    const taskIndex = taskData.findIndex(task => task.taskId === taskToStop.taskId);

    if (taskIndex !== -1){
      const updatedTasks = [...taskData];

      updatedTasks[taskIndex] = {
        ...updatedTasks[taskIndex],
        taskStatus: 'NotOngoing'
      };

      updateTasks(updatedTasks);
    }
    //console.log('Stopped task: ', taskToStop);
  }


  return (
    <View className="flex-1 items-center bg-[#141319] min-h-screen">
      <Summary tasks={tasks} />
      <Text className="text-[#5C5A5A] [text-shadow:_0_2px_4px_rgb(0_0_0_/_30%)] mt-2">Drag task to start timer</Text>
      <View className='-mt-2'>
        <FontAwesome name="long-arrow-right" size={22} color="#5C5A5A" />
      </View>
      <View className="container h-64 flex flex-row w-10/12">
        <View className="basis-1/2 items-start" style={{ zIndex: 10 }}>
            <AddTask tasks={tasks} onAddTask={handleAddTask} onStartTask={handleStartTask} onRemoveTask={handleRemoveTask}/>
        </View>
        <View className="basis-1/2 items-end" style={{ zIndex: 1 }}>
          <OngoingTasks tasks={tasks} stopTask={handleStopTask}/>
        </View>
      </View>
      <History tasks={tasks} />
    </View>
  );
};



const styles = StyleSheet.create({

});

export default App;
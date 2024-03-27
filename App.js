import { StyleSheet, Text, View, Pressable, FlatList, SafeAreaView } from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Summary from './components/Summary';
import History from './components/History';
import AddTask from './components/AddTask';
import OngoingTasks from './components/OngoingTasks';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeWindStyleSheet } from "nativewind";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

NativeWindStyleSheet.setOutput({
  default: "native",
});


// For dragging https://www.youtube.com/watch?v=tsM3N_7bNcE 

// Storage solution: https://react-native-async-storage.github.io/async-storage/


//const initialtasks = [{ taskName: "Task 1", taskColor: "#CFAADF", taskTotalTime: 2, taskCurrentTime: 0}, { taskName: "Task 2", taskColor: "#FEDA98", taskTotalTime: 2, taskCurrentTime: 0}]

const taskData = [{ 
  taskId: 0, taskName: "Task 1", taskColor: "#CFAADF", taskStatus: 'NotOngoing',
  dayData: [
    { date: '3/14/2006',
      totalElapsedTime: 3 }
    ],
  totalTime: 10
}]

const App = () => {

  const [tasks, setTasks] = useState(taskData);

  useEffect(() => {
    console.log('Tasks: ', tasks);
  }, [tasks]);

  const handleAddTask = (newTask) => {
    previousMaxID = taskData[taskData.length - 1].taskId;
    newTask.taskId = previousMaxID + 1;
    setTasks([...tasks, newTask]);
    console.log('New task: ', newTask);
  }
  const handleRemoveTask = (task) => {
    setTasks(currentTasks => currentTasks.filter(task => task.taskId !== task.taskId));
    console.log('Remove task: ', task);
  }

  const [startedTasks, setStartedTasks] = useState([]);

  const handleStartTask = (task) => {
    task.taskStatus = 'Ongoing';
    setStartedTasks(prevStartedTasks => [...prevStartedTasks, task]);
  }


  return (
    <View className="flex-1 items-center bg-[#141319] min-h-screen">
      <Summary tasks={tasks} />
      <Text className="text-[#5C5A5A] [text-shadow:_0_2px_4px_rgb(0_0_0_/_30%)] mt-2">Drag task to start timer</Text>
      <View className='-mt-2'>
        <FontAwesome name="long-arrow-right" size={22} color="#5C5A5A" />
      </View>
      <View className="container h-64 flex flex-row w-10/12">
        <View className="basis-1/2 items-start z-30">
            <AddTask tasks={tasks} onAddTask={handleAddTask} onStartTask={handleStartTask} onRemoveTask={handleRemoveTask}/>
        </View>
        <View className="basis-1/2 items-end z-10">
          <OngoingTasks startedTasks={startedTasks}/>
        </View>
      </View>
      <History />
    </View>
  );
};



const styles = StyleSheet.create({

});

export default App;
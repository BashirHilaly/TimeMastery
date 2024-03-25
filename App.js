import { StyleSheet, Text, View, Pressable, FlatList, SafeAreaView } from 'react-native';
import React, {useRef, useState} from 'react';
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

const initialData = [{ taskName: "Task 1", taskColor: "#CFAADF", taskTotalTime: 2, taskCurrentTime: 0}, { taskName: "Task 2", taskColor: "#FEDA98", taskTotalTime: 2, taskCurrentTime: 0}]

const App = () => {

  const [data, setData] = useState(initialData);

  const addTaskToList = (newTask) => {
    setData([...data, newTask])
  }

  return (
    <View className="flex-1 items-center bg-[#141319] min-h-screen">
      <Summary tasks={data} />
      <Text className="text-[#5C5A5A] [text-shadow:_0_2px_4px_rgb(0_0_0_/_30%)] mt-2">Drag task to start timer</Text>
      <View className='-mt-2'>
        <FontAwesome name="long-arrow-right" size={22} color="#5C5A5A" />
      </View>
      <View className="container h-64 flex flex-row w-10/12">
        <View className="basis-1/2 items-start z-30">
            <AddTask tasks={data} onAddTask={addTaskToList}/>
        </View>
        <View className="basis-1/2 items-end z-10">
          <OngoingTasks />
        </View>
      </View>
      <History />
    </View>
  );
};



const styles = StyleSheet.create({

});

export default App;
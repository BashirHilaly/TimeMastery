import { StyleSheet, Text, View, Pressable, FlatList, PanResponder, Animated } from 'react-native';
import React, {useRef, useState} from 'react';
import Summary from './components/Summary';
import History from './components/History';
import Task from './components/Task';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeWindStyleSheet } from "nativewind";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

NativeWindStyleSheet.setOutput({
  default: "native",
});


// For dragging https://www.youtube.com/watch?v=tsM3N_7bNcE 

const App = () => {

  const data = [{ taskName: "Task 1", taskColor: "#CFAADF"}, { taskName: "Task 2", taskColor: "#FEDA98"}]

  const [carriedTask, setCarriedTask] = useState(null);


  return (
    <View className="flex-1 items-center bg-[#141319] min-h-screen">
      <Summary />
      <Text className="text-[#5C5A5A] [text-shadow:_0_2px_4px_rgb(0_0_0_/_30%)] mt-2">Drag task to start timer</Text>
      <View className='-mt-2'>
        <FontAwesome name="long-arrow-right" size={22} color="#5C5A5A" />
      </View>
      <View className="container h-64 flex flex-row w-10/12">
        <View className="basis-1/2 items-start">
            <LinearGradient className="bg-slate-500 h-64 w-11/12 p-2 rounded-3xl" colors={['#27252F', '#335650', '#3E7969']} style={{ flex: 1 }}>
              <Pressable onPress={() => alert('You pressed a button.')}>
                <Text className="text-[#BEBEBE] font-bold text-xl text-center">ADD TASK</Text>
                <View className="mx-auto -mt-1">
                  <Ionicons name="add-outline" size={20} color="#BEBEBE" />
                </View>
                <View className="h-px my-2 border-1 bg-[#6D6D6D]"/>
              </Pressable>
              <View>
                <FlatList
                  className="p-2"
                  data={data}
                  renderItem={({ item }) => 
                  <Task taskName={item.taskName} taskColor={item.taskColor}/>
                }
                  keyExtractor={item => "" + item.taskName}
                />
              </View>
            </LinearGradient>
        </View>
        <View className="basis-1/2 items-end">
            <LinearGradient className="bg-slate-500 h-64 w-11/12 p-2 rounded-3xl" colors={['#27252F', '#3C3258', '#5A478E']} style={{ flex: 1 }}>
              <View className="mx-auto pt-2">
                <AntDesign name="clockcircleo" size={30} color="#BEBEBE" />
              </View>
              <View className="h-px my-2 border-1 bg-[#6D6D6D] mt-3"/>
              <Text className="text-[8px] text-[#5C5A5A] text-center -mt-1">Ongoing tasks</Text>
            </LinearGradient>
        </View>
      </View>
      <History />
    </View>
  );
};



const styles = StyleSheet.create({

});

export default App;
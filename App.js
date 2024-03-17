import { StyleSheet, Text, View } from 'react-native';
import Summary from './components/Summary';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  return (
    <View className="flex-1 items-center bg-[#141319] min-h-screen">
      <Summary />
      <Text className="text-[#5C5A5A] [text-shadow:_0_2px_4px_rgb(0_0_0_/_30%)] mt-2">Drag task to start timer</Text>
      <View className='-mt-2'>
        <FontAwesome name="long-arrow-right" size={22} color="#5C5A5A" />
      </View>
      <View className="container h-64 flex flex-row w-10/12">
        <View className="basis-1/2 items-start">
          <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={{ flex: 1 }}
          >
            <View className="bg-slate-500 h-64 w-11/12 p-5 rounded-3xl">
              <Text className="text-[#BEBEBE] font-bold text-xl text-center">ADD TASK</Text>
            </View>
          </LinearGradient>
        </View>
        <View className="basis-1/2 items-end">
          <LinearGradient
            // Background Linear Gradient
            colors={['rgba(0,0,0,0.8)', 'transparent']}
            style={{ flex: 1 }}
          >
            <View className="bg-slate-500 h-64 w-11/12 p-5 rounded-3xl">
              <Text className="text-[#BEBEBE] font-bold text-xl text-center">CLOCK</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({

});
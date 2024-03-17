import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Summary = () => {
  return (
    <View className="container mt-16 w-10/12 rounded-3xl bg-[#27252F] justify-center p-6">
        <Text className="text-[#BEBEBE] text-center font-bold text-2xl">SUMMARY</Text>
        <View className="flex flex-row mt-3">
            <View className="basis-1/2">
                <Text className="text-[#BEBEBE]">Circle</Text>
            </View>
            <View className="basis-1/2">
                <View className="flex flex-row mb-2">
                    <View className="basis-1/2 justify-center items-center">
                        <FontAwesome name="circle" size={18} color="#CFAADF" />
                    </View>
                    <View className="basis-1/2">
                        <Text className="text-[#BEBEBE] font-semibold text-xl">Task 1</Text>
                    </View>
                </View>
                <View className="flex flex-row mb-2">
                    <View className="basis-1/2 justify-center items-center">
                        <FontAwesome name="circle" size={18} color="#FEDA98" />
                    </View>
                    <View className="basis-1/2">
                        <Text className="text-[#BEBEBE] font-semibold text-xl">Task 2</Text>
                    </View>
                </View>
                <View className="flex flex-row mb-2">
                    <View className="basis-1/2 justify-center items-center">
                        <FontAwesome name="circle" size={18} color="#6EEADF" />
                    </View>
                    <View className="basis-1/2">
                        <Text className="text-[#BEBEBE] font-semibold text-xl">Task 3</Text>
                    </View>
                </View>                
            </View>
            
            
        </View>
    </View>
  );
};

export default Summary;
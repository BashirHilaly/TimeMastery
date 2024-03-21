import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Task = ({ taskName, taskColor }) => {
  return (
    <View className="flex flex-row mb-4">
        <View className="basis-1/2 items-start">
            <FontAwesome name="circle" size={16} color={taskColor} />
        </View>
        <View className="basis-1/2 items-end">
            <Text className="font-semibold text-[#BEBEBE]">{ taskName }</Text>
        </View>
    </View>
  )
}

export default Task;
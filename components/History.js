import { StyleSheet, Text, View } from 'react-native';

const History = () => {
    return (
        <View className="container mt-7 w-10/12 rounded-3xl bg-[#27252F] p-4 h-56">
            <View className="flex flex-row">
                <View className="w-1/2 items-end px-2">
                    <Text className="text-[#BEBEBE] font-normal">YEAR</Text>
                </View>
                <Text className="text-[#BEBEBE]">|</Text>
                <View className="w-1/2 items-start px-2">
                    <Text className="text-[#BEBEBE] font-normal">WEEK</Text>
                </View>
            </View>
        </View>
    );
};

export default History;
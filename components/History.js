import { StyleSheet, Text, View } from 'react-native';
import CalendarHeatmap from 'react-native-calendar-heatmap';



const History = ({ tasks }) => {

    const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-02-30", count: 4 }
      ];

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

            <CalendarHeatmap
                endDate={new Date("2017-04-01")}
                numDays={100}
                colorArray={["#eee", "#D44B79", "#6B1928", "#9F3251", "#360000"]}
                values={commitsData}
            />
        </View>
    );
};

export default History;
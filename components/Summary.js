import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Summary = ({ tasks }) => {

    // Max 3 tasks in the summary
    const summaryTasks = tasks.slice(0, 3);

    const colors = tasks.map(task => task.taskColor);

    return (
        <View className="container mt-16 w-10/12 rounded-3xl bg-[#27252F] justify-center p-4">
            <Text className="text-[#BEBEBE] text-center font-bold text-2xl">SUMMARY</Text>
            <View className="flex flex-row mt-3">
                <View className="basis-1/2 items-center">
                    <LinearGradient
                        colors={colors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.linearGradient}
                    >
                        <View style={styles.innerContainer}>
                        <Text className="text-[#BEBEBE] font-bold text-lg text-center">Total</Text>
                        </View>
                    </LinearGradient>
                </View>
                <View className="basis-1/2">
                    {summaryTasks.map(item => (
                        <View className="flex flex-row mb-2" key={item.taskName}>
                            <View className="basis-1/2 justify-center items-center">
                                <FontAwesome name="circle" size={18} color={item.taskColor} />
                            </View>
                            <View className="basis-1/2">
                                <Text className="text-[#BEBEBE] font-semibold text-xl">{item.taskName}</Text>
                            </View>
                        </View>
                    ))}             
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    linearGradient: {
        height: 100,
        width: 100,
        borderRadius: 50, // <-- Outer Border Radius
    },
    innerContainer: {
        borderRadius: 45, // <-- Inner Border Radius
        flex: 1,
        margin: 5, // <-- Border Width
        backgroundColor: '#27252F',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: '#cc2b5e',
        backgroundColor: 'transparent',
    },
});

export default Summary;
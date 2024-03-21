import { StyleSheet, Text, View } from 'react-native';

const Task = ({ taskName, taskColor }) => {
  return (
    <View>
        <Text>{ taskName }</Text>
    </View>
  )
}

export default Task;
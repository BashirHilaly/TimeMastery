import AsyncStorage from '@react-native-async-storage/async-storage';

const TASK_DATA_KEY = '@taskData';

const TaskDataService = {
  async getTaskData() {
    try {
      const taskData = await AsyncStorage.getItem(TASK_DATA_KEY);
      return taskData ? JSON.parse(taskData) : [];
    } catch (error) {
      console.error('Error getting task data:', error);
      return [];
    }
  },

  async saveTaskData(taskData) {
    try {
      await AsyncStorage.setItem(TASK_DATA_KEY, JSON.stringify(taskData));
    } catch (error) {
      console.error('Error saving task data:', error);
    }
  },
};

export default TaskDataService;

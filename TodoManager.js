// TodoManager.js
import AsyncStorage from '@react-native-async-storage/async-storage';

class TodoManager {
  static async saveTodo(todo) {
    try {
      const existingTodos = await this.getTodos();
      existingTodos.push(todo);
      await AsyncStorage.setItem('todos', JSON.stringify(existingTodos));
    } catch (error) {
      console.error('Error saving todo', error);
    }
  }

  static async getTodos() {
    try {
      const todos = await AsyncStorage.getItem('todos');
      return todos ? JSON.parse(todos) : [];
    } catch (error) {
      console.error('Error retrieving todos', error);
      return [];
    }
  }
}

export default TodoManager;
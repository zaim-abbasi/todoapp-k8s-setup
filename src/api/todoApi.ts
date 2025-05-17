
import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTodoInput {
  title: string;
}

export interface UpdateTodoInput {
  title?: string;
  completed?: boolean;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (todo: CreateTodoInput): Promise<Todo> => {
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id: string, todo: UpdateTodoInput): Promise<Todo> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, todo);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

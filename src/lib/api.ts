import apiClient from './apiClient';
import { Todo } from '../types/Todo';

export const fetchUsers = async () => {
  const response = await apiClient.get('/api/users');
  return response.data;
};

export const fetchTodos = async () => {
  const response = await apiClient.get<Todo[]>('/api/todos');
  return response.data;
};

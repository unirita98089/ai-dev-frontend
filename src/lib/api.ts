import apiClient from './apiClient';

export const fetchUsers = async () => {
  const response = await apiClient.get('/api/users');
  return response.data;
};

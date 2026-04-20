import axiosClient from './axiosClient';

const bookApi = {
  getAll: () => axiosClient.get('/books'),
  create: (data) => axiosClient.post('/books', data),
};
export default bookApi;
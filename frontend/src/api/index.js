import axios from 'axios';

export default {
  //Get all books
  getBooks: () => {
    return axios.get('/api/v1/books');
  },
  //Delete Book
  deleteBook: (id, config = {}) => {
    return axios.delete(`/api/v1/books/${id}`, {
      ...config,
    });
  },
  //Add Book
  addBook: (data = {}, config = {}) => {
    return axios.post(`/api/v1/books`, { ...data }, { ...config });
  },
  //Update Book
  updateBook: (id, data = {}, config = {}) => {
    console.log(data);
    return axios.patch(`/api/v1/books/${id}`, { ...data }, { ...config });
  },

  signInUser: (data = {}) => {
    return axios.post(`/api/v1/users/login`, {
      ...data,
    });
  },
  signUpUser: (data = {}) => {
    return axios.post(`/api/v1/users/signup`, { ...data });
  },
};

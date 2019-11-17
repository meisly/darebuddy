import axios from "axios";

const ID_TOKEN_KEY = 'darebuddy-id-token';
const ACCESS_TOKEN_KEY = 'darebuddy-access-token';


let instance = axios.create({
  baseURL: 'http://localhost:3000/api/dbdata',
  timeout: 1000
});




export default {
  // Gets all books
  getStuff: function (query) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get("/" + query);
  },
  getStuffWhere: function(model, column, query) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get(`/${model}/${column}/${query}`);
  },
  getUser: function(userEmail) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get(`/user/${userEmail}`);
  }
  // // Gets the book with the given id
  // getPrograms: function(programs) {
  //   return axios.get("/api/dbdata/" + programs);
  // },
  // // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // // Saves a book to the database
  // saveBook: function(bookData) {
  //   return axios.post("/api/books", bookData);
  // }
};

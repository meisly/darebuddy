import axios from "axios";

const ID_TOKEN_KEY = 'darebuddy-id-token';
const ACCESS_TOKEN_KEY = 'darebuddy-access-token';


let instance = axios.create({
  baseURL: 'http://localhost:3000/api/dbdata',
  timeout: 1500
});




export default {
  // Gets all books
  getStuff: function (query) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get("/" + query);
  },
  findWorkout: function (query) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get("/workout/id/" + query);
  },
  findProgram: function (query) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get("/program/id/" + query);
  },
  getStuffWhere: function(model, column, query) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get(`/${model}/${column}/${query}`);
  },
  getChallenges: function() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get(`/programs/challenges`);
  },
  getRecentWorkouts: function(user) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get(`/userworkouts/user/${user.id}/?:n=10`)
  },
  getUser: function(user) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.post(`/user`, {
      email: user.email,
      name: user.name,
      img: user.picture
    } );
  },
  getUserPrograms: function(user) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get(`/userprograms/user/${user.id}`);
  },
  getUserWorkouts: function(user) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.get(`/userworkouts/user/${user.id}`)
  },
  logUserWorkout: function(user, workout) {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return instance.post(`/userworkouts/user/${user.id}`, {
      id: workout.id
    })
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

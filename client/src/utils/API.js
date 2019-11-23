import axios from "axios";
const ACCESS_TOKEN_KEY = 'darebuddy-access-token';
let url = '';

if (window.location.origin === 'https://damp-earth-37383.herokuapp.com/') {
  url= 'https://damp-earth-37383.herokuapp.com/';
} else {
  url = 'http://localhost:3000/'
}
let instance = null;
if(url !== ''){
  instance = axios.create({
    baseURL: `${url}api/dbdata`,
    timeout: 1500
  });
}



const getHeader = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}



export default {
  // Gets all books
  getStuff: function (query) {
    // getHeader();
    return instance.get("/" + query);
  },
  findWorkout: function (query) {
    // getHeader();
    return instance.get("/workout/id/" + query);
  },
  findProgram: function (query) {
  // getHeader();
    return instance.get("/program/id/" + query);
  },
  getStuffWhere: function (model, column, query) {
    // getHeader();
    return instance.get(`/${model}/${column}/${query}`);
  },
  getChallenges: function () {
   // getHeader();
    return instance.get(`/programs/challenges`);
  },
  getRecentWorkouts: function (user) {
    // getHeader();
    return instance.get(`/userworkouts/user/${user.id}/?:n=10`)
  },
  getUser: function (user) {
    // getHeader();
    return instance.post(`/user`, {
      email: user.email,
      name: user.name,
      img: user.picture
    });
  },
  getUserPrograms: function (user) {
  // getHeader();
    return instance.get(`/userprograms/user/${user.id}`);
  },
  getUserWorkouts: function (user) {
    // getHeader();
    return instance.get(`/userworkouts/user/${user.id}`)
  },
  logUserWorkout: function (user, workout) {
    // getHeader();
    return instance.post(`/userworkouts/user/${user.id}`, {
      id: workout.id
    })
  }


};

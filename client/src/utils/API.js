import axios from "axios";
const ACCESS_TOKEN_KEY = 'darebuddy-access-token';
let url = '';

if (window.location.origin === 'https://damp-earth-37383.herokuapp.com') {
  url= 'https://damp-earth-37383.herokuapp.com';
} else {
  url = 'http://localhost:3000'
}
let instance = null;
if(url !== ''){
  instance = axios.create({
    baseURL: `${url}/api/dbdata`,
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
  getYourWorkouts: function (programIds) {
    return instance.get(`/workouts/?programIds=${programIds}`)
  },
  getPrograms: function() {
    return instance.get("/programs/")
  },
  findWorkout: function (query) {
    // getHeader();
    return instance.get("/workout/id/" + query);
  },
  findProgram: function (query) {
  // getHeader();
    return instance.get("/program/id/" + query);
  },
  getWorkoutInProgram: function (programId, programOrder) {
    // getHeader();
    return instance.get(`/program/workout?program=${programId}&index=${programOrder}`);
  },
  getChallenges: function () {
   // getHeader();
    return instance.get(`/programs/challenges`);
  },
  getRecentWorkouts: function (user) {
    // getHeader();
    return instance.get(`/userworkouts/user/${user.id}/last?n=10`)
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
  addUserProgram: function (user, program) {
    //getHeader();
    return instance.post(`/userprograms/user/${user.id}`, {
     data: program.program
    })
  },
  deleteUserProgram: function (userprogram) {
    return instance.delete(`/userprograms/${userprogram.id}`)
  },
  getUserWorkouts: function (user) {
    // getHeader();
    return instance.get(`/userworkouts/user/${user.id}`)
  },
  logUserWorkout: function (user, workout) {
    // getHeader();
    return instance.post(`/userworkouts/user/${user.id}`, {
      data: workout.data,
      date: workout.date,
      notes: workout.notes
    })
  }


};

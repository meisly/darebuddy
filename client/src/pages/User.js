import React, { Component } from "react";
import Profile from "../components/Profile"
import { Paper, Grid } from "@material-ui/core";
import Calendar from 'react-calendar';
import { List, ListItem } from "../components/List";
import moment from "moment";

import API from "../utils/API";


class Books extends Component {

  state = {
    workouts: null,
    programs: null,
    userData: this.props.userData
  };

  getUserWorkouts = () => {
    if (this.props.userData && !this.state.workouts) {
      API.getUserWorkouts(this.props.userData)
        .then(res => {
          this.setState({ workouts: res.data.workouts })
        })
        .catch(err => console.log(err));
    }
  };

  getUserPrograms = () => {
    if (this.props.userData && !this.state.programs) {
      API.getUserPrograms(this.props.userData)
        .then(res => {
          this.setState({ programs: res.data.programs})
        })
        .catch(err => console.log(err));
    }
  };
  updateUserData = () => {
    if(this.props.userData !== this.state.userData){
      this.setState({userData: this.props.userData})
    }
  }

  componentDidUpdate() {
    this.updateUserData();
    this.getUserWorkouts();
    this.getUserPrograms();
    
  }
  convertDate = (date) =>{
    return moment(date).format('MMMM Do YYYY')
  }
  render() {
    console.log(JSON.stringify(this.props.userData, null, 2))
    return (
      <div>
        <Profile
        programs={this.state.programs}
        userData={this.props.userData}
        ></Profile>
        <Grid
          container
          spacing={3}
          style={{ margin: "3rem" }}
        >
          <Grid
            item
            xs={12}
            sm={3}
          >
            <Calendar></Calendar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
          >
            <Paper component="div">
              <List>
                {(this.state.workouts) ? (this.state.workouts.map(workout => (
                  <ListItem key={workout.userworkouts.id} >
                    <Paper style={{ padding: ".5rem", margin: "1rem" , display: 'flex', justifyContent: 'left'}}>
                      <img style={{maxWidth: '15%'}} src={workout.imageUrl} alt={`${workout.workoutName} Poster Mini`}></img>
                      {workout.workoutName}    {this.convertDate(workout.userworkouts.createdAt)}

                    </Paper>
                  </ListItem>
                ))) : ""}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>);
  }
}

export default Books;

import React, { Component } from "react";
import Profile from "../components/Profile"
import { Paper, Grid, Typography } from "@material-ui/core";
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
          this.setState({ workouts: res.data })
        })
        .catch(err => console.log(err));
    }
  };

  getUserPrograms = () => {
    if (this.props.userData && !this.state.programs) {
      API.getUserPrograms(this.props.userData)
        .then(res => {
          console.log(res)
          this.setState({ programs: res.data })
        })
        .catch(err => console.log(err));
    }
  };
  updateUserData = () => {
    if (this.props.userData !== this.state.userData) {
      this.setState({ userData: this.props.userData })
    }
  }

  componentDidUpdate() {
    this.updateUserData();
    this.getUserWorkouts();
    this.getUserPrograms();

  }
  convertDate = (date) => {
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
                  <ListItem key={`UWO-${workout.id}`} >
                    <Paper style={{ padding: ".5rem", margin: "1rem", display: 'flex', justifyContent: 'left', overflow: 'hidden' }}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography component="h5" variant='h5' style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                            {workout.workout.workoutName}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <img style={{ maxWidth: '100%' }} src={workout.workout.imageUrl} alt={`${workout.workout.workoutName} Poster Mini`} />
                        </Grid>

                        <Grid item xs={9} container direction='column' alignItems='stretch'>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={9}>
                            <Typography component='h5' style={{ textAlign: 'left' }}>
                              <strong>Notes:</strong>{workout.notes}
                            </Typography>
                            <Typography component='p'>

                            </Typography>
                          </Grid>
                          <Grid item xs container>
                            <Grid item xs={9}>
                              <Typography component='p' style={{ float: 'left' }}>
                                <strong>Completed on </strong>{this.convertDate(workout.createdAt)}
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography component='p' style={{ float: 'left' }}>
                                <a>Comments</a>
                              </Typography>
                            </Grid>
                          </Grid>

                        </Grid>

                      </Grid>


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

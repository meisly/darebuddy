import React, { Component } from "react";
import Profile from "../components/Profile"
import { Paper, Grid, Typography, Hidden } from "@material-ui/core";
import Calendar from 'react-calendar';
import { List, ListItem } from "../components/List";
import moment from "moment";

import API from "../utils/API";


class Books extends Component {

    state = {
        workouts: null,
        programs: null
    };

    getUserWorkouts = () => {
        if (this.props.userData && !this.state.workouts) {
            API.getUserWorkouts(this.props.userData)
                .then(res => {
                    if (res.data.length > 0) {
                        this.setState({ workouts: res.data })
                    }

                })
                .catch(err => console.log(err));
        } else {
            setTimeout(this.getUserWorkouts, 200)
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
        } else {
            setTimeout(this.getUserPrograms, 200)
        }
    }
    updateUserData = () => {
        if (this.props.userData !== this.state.userData) {
            this.setState({ userData: this.props.userData })
        }
    }
    updatePrograms = () => {
        API.getUserPrograms(this.props.userData)
            .then(res => {
                console.log(res)
                this.setState({ programs: res.data })
            })
            .catch(err => console.log(err));
    }
    componentDidMount() {
        this.getUserWorkouts();
        this.getUserPrograms();
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
        return (
            <div style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
                <Profile
                    updatePrograms={this.updatePrograms}
                    programs={this.state.programs}
                    userData={this.props.userData}
                    getData={() => {
                        this.getUserPrograms()
                        this.getUserWorkouts()
                    }}
                ></Profile>
                <Grid
                    container
                    spacing={3}
                    style={{ margin: "2.5rem", maxWidth: '100vw' }}
                >
                    <Hidden smDown>
                        <Grid
                            item
                            sm={3}
                        >
                            <Calendar
                                style={{
                                    width: '100%'
                                }}
                            ></Calendar>
                        </Grid>
                    </Hidden>
                    <Grid
                        item
                        xs={10}
                        sm={8}
                    >
                        <Paper component="div" style={{ maxWidth: '100vw' }}>
                            <List>
                                {(this.state.workouts) ? (this.state.workouts.map(workout => (
                                    <ListItem key={`UWO-${workout.id}`} >
                                        <Paper style={{ padding: ".5rem", margin: "1rem", display: 'flex', justifyContent: 'left', overflow: 'hidden' }}>
                                            <Grid container spacing={3}>

                                                <Grid item sm={2} xs={1}>
                                                    <img style={{ maxWidth: '90%' }} src="/images/stretching-exercises.png" alt={`${workout.workout.workoutName} Poster Mini`} />
                                                </Grid>

                                                <Grid item xs={10} container>
                                                    <Grid item xs={12}>
                                                        <Typography component="h5" variant='h5' style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                                                            {workout.workout.workoutName}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography component='h5' style={{ textAlign: 'left' }}>
                                                            <strong>Notes:</strong>{workout.notes}
                                                        </Typography>
                                                        <Typography component='p'>

                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs container>
                                                        <Grid item sm={9} xs={12}>
                                                            <Typography component='p' style={{ float: 'left' }}>
                                                                <strong>Completed on </strong>{this.convertDate(workout.createdAt)}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item sm={3} xs={12}>
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

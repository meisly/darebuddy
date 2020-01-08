import React, { Component } from "react";
import AccordionMenu from "../components/AccordionMenu";
import LogInfo from "../components/LogInfo";
import { Grid, Hidden } from "@material-ui/core";
import API from "../utils/API";
import ResponsiveDrawer from "../components/ResponsiveDrawer";


class Log extends Component {
    state = {
        workouts: [],
        programs: [],
        challenges: [],
        userprograms: null,
        recent: [],
        currentlySelected: {}
    };


    componentDidMount() {
        if (this.props.location && this.props.location.state) {
            let { programOrder, programId, programType } = this.props.location.state;
            if (programType === 'challenge') {
                API.findProgram(programId)
                    .then(res => {
                        this.setState({ currentlySelected: res.data })
                    })
                    .catch(err => console.log(err));
            } else {
                API.getWorkoutInProgram(programId, programOrder)
                    .then(res => {
                        console.log(res)
                        this.setState({ currentlySelected: res.data })
                    });
            }
        }
        // this.getWorkouts();
        this.getUserPrograms();
        this.getPrograms();
        this.getChallenges();
        this.getRecentWorkouts(this.props.userData);
        this.getYourWorkouts();
        this.getRandomWorkouts();
    };
    getUserPrograms = () => {
        if (this.props.userData && !this.state.userprograms) {
            API.getUserPrograms(this.props.userData)
                .then(res => {
                    console.log(res)
                    this.setState({ userprograms: res.data })
                })
                .catch(err => console.log(err));
        }
    };
    getRandomWorkouts = () => {
        API.getStuff("workouts")
            .then(res => {
                this.setState({ workouts: [...res.data] })
            })
            .catch(err => { console.log(err) })
    };
    getYourWorkouts = () => {
        let programIds = [];
        if (this.state.userprograms) {
            this.state.userprograms.map(program => {
                programIds.push(program.programId);

                if (programIds.length === this.state.userprograms.length) {
                    API.getYourWorkouts(programIds)
                        .then(res => {
                            this.setState({ workouts: res.data })
                        })
                        .catch(err => console.log(err))
                }
            })
        } else {
            this.getUserPrograms();
            setTimeout(this.getYourWorkouts, 500)
        }
    };

    getChallenges = () => {
        API.getChallenges()
            .then(res => {
                this.setState({ challenges: res.data })
            })
            .catch(err => console.log(err));
    };

    getPrograms = () => {
        API.getPrograms()
            .then(res => {
                this.setState({ programs: res.data })
            })
            .catch(err => console.log(err));

    };

    getRecentWorkouts = (userData) => {
        if (userData) {
            API.getRecentWorkouts(userData)
                .then(res => {
                    this.setState({ recent: res.data })
                })
                .catch(err => console.log(err));
        } else {
            setTimeout(() => {
                this.getRecentWorkouts(this.props.userData)
            }, 5000)
        }


    };
    selectProgramOrWorkout = (event) => {
        const selected = event.currentTarget.getAttribute('data-id');
        let query = selected.split("-");
        let [model, id] = query;
        if (model === "workout") {
            API.findWorkout(id)
                .then(res => {
                    this.setState({ currentlySelected: res.data })
                    console.log("You have selected")
                    console.log(this.state.currentlySelected)
                })
                .catch(err => console.log(err));
        } else {
            API.findProgram(id)
                .then(res => {
                    this.setState({ currentlySelected: res.data })
                    console.log("You have selected")
                    console.log(this.state.currentlySelected)
                })
                .catch(err => console.log(err));
        }
    };

    logWorkout = (date, notes) => {
        if (this.props.userData) {
            return API.logUserWorkout(this.props.userData, { data: this.state.currentlySelected, date: date, notes: notes })
        }
        return Promise.resolve(undefined);
    };

    addProgram = () => {
        if (this.props.userData) {
            return API.addUserProgram(this.props.userData, { "program": this.state.currentlySelected });
        }
        return Promise.resolve(undefined);
    };

    clearSelected = () => {
        this.setState({ currentlySelected: {} })
    };

    render() {

        return (
            <div>
                <Grid container >
                    <Hidden smDown>
                        <Grid
                            item
                            xs={12}
                            sm={3}
                            style={{ margin: "2rem" }}
                        >
                            <AccordionMenu
                                previous={"Recent Workouts"}
                                workouts={this.state.workouts}
                                programs={this.state.programs}
                                challenges={this.state.challenges}
                                recent={this.state.recent}
                                onClick={this.selectProgramOrWorkout}
                            >

                            </AccordionMenu>
                        </Grid>
                    </Hidden>
                    <Hidden mdUp>
                        <ResponsiveDrawer
                            previous={"Recent Workouts"}
                            workouts={this.state.workouts}
                            programs={this.state.programs}
                            challenges={this.state.challenges}
                            recent={this.state.recent}
                            onClick={this.selectProgramOrWorkout}
                        >

                        </ResponsiveDrawer>
                    </Hidden>
                    <Grid item xs={12} sm={8}>
                        <LogInfo
                            currentlySelected={this.state.currentlySelected}
                            logWorkout={this.logWorkout}
                            addProgram={this.addProgram}
                            clearSelected={this.clearSelected}
                        >
                        </LogInfo>

                    </Grid>
                </Grid>
            </div>
        )
    };
}

export default Log;

import React, { Component } from "react";
import AccordionMenu from "../components/AccordionMenu";
import LogInfo from "../components/LogInfo";
import { Grid } from "@material-ui/core";
import API from "../utils/API";


class Log extends Component {
  state = {
    userData: this.props.userData,
    workouts: [],
    programs: [],
    challenges: [],
    recent: [],
    currentlySelected: {}
  };


  componentDidMount() {
    this.getWorkouts();
    this.getPrograms();
    this.getChallenges();
  }

  getWorkouts = () => {
    API.getStuff("workouts")
      .then(res => {
        this.setState({ workouts: res.data })

      })
      .catch(err => console.log(err));

  };
  getChallenges = () => {
    API.getChallenges()
      .then(res => {
        this.setState({ challenges: res.data })
      })
      .catch(err => console.log(err));
  };

  getPrograms = () => {
    API.getStuff("programs")
      .then(res => {
        this.setState({ programs: res.data })
      })
      .catch(err => console.log(err));

  };
  updateUserData = () => {

  };
  getRecentWorkouts = () => {
    API.getRecentWorkouts()
    .then(res => {
      this.setState({ recent: res.data })
    })
    .catch(err => console.log(err));

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
    }else {
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
      API.logUserWorkout(this.props.userData, {data: this.state.currentlySelected, date: date, notes: notes})
        .then(res => {
          console.log("You have logged a workout")
          console.log(res)
        })
        .catch(err => console.log(err));
    }
  }
  addProgram = () =>{
    if (this.props.userData) {
      API.addUserProgram(this.props.userData, {"program": this.state.currentlySelected})
        .then(res => {
          console.log("You have added a new program")
          console.log(res)
        })
        .catch(err => console.log(err));
    }
  }
  render() {

    return (
      <div>
        <Grid container>
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
          <Grid item xs={12} sm={8}>
            <LogInfo
            currentlySelected={this.state.currentlySelected}
            logWorkout={this.logWorkout}
            addProgram={this.addProgram}
            >
            </LogInfo>
            
          </Grid>
        </Grid>
      </div>
    )
  };
}

export default Log;

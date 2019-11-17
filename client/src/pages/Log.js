import React, { Component } from "react";
import AccordionMenu from "../components/AccordionMenu";
import { Grid } from "@material-ui/core"
import API from "../utils/API";

class Log extends Component {
  state = {
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
    API.getStuffWhere("programs","category", "challenge")
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
  getUserData = () => {

  };
  makeSelection = () => {

  };

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
            >

            </AccordionMenu>
          </Grid>
          <Grid item xs={12} sm={9}>
            <code>{JSON.stringify(this.state.workouts, null, 2)}</code>
          </Grid>
        </Grid>
      </div>
    )
  };
}

export default Log;

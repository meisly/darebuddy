import React, { Component } from "react";
import Navbar from "../components/Navbar";
import AccordionMenu from "../components/AccordionMenu";
import { Grid } from "@material-ui/core"


class Log extends Component {
  state = {
    workouts: [1, 2, 3, 4, 5, 6,],
    programs: [],
    challenges: [],
    recent: [],
    currentlySelected: {}
  };


  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Grid container>
          <Grid
            item
            xs='12'
            sm='3'
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
        </Grid>
      </div>
    )
  }
}

export default Log;

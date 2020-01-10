import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
require('../index.css');
require('../App.css')



class Landing extends Component {



  render() {
    return (
      <Grid
        container
        className="landingContainer"
        direction="row"
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={8} offset={2} className="mainLanding">
          <Typography variant="h2" className="blockEffect welcomeText" style={{paddingBottom: '10px'}}>
            <div className="blockReveal" >
              Welcome to Darebuddy!
            </div>
          </Typography>
          <Typography variant="h4" className="blockEffect infoText"  >
            <div className="blockReveal" >
              <span>Log in to start using darebuddy to track your Darebee workouts </span>
              <span>or <a>click here for more info.</a></span>
            </div>
          </Typography>
        </Grid>

      </Grid>
    );
  }
}

export default Landing;


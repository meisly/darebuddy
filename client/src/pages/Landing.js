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
        <Grid item md={8} md-offset={2} xs={12} className="mainLanding">
          <Typography variant="h2" className="blockEffect welcomeText" style={{paddingBottom: '10px'}}>
            <div className="blockReveal" >
              Welcome to Darebuddy!
            </div>
          </Typography>
          <Typography variant="h4" className="blockEffect infoText"  >
            <div className="blockReveal" >
              <span><Link to={{pathname: "/user"}}>Login</Link> to start tracking your Darebee workouts </span>
              <span>or <Link to={{pathname: '/about'}}>click here for more info.</Link></span>
            </div>
          </Typography>
        </Grid>

      </Grid>
    );
  }
}

export default Landing;


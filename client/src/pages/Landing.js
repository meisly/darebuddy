import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
require('../index.css');



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
          <Typography variant="h3" >
            Welcome to Darebuddy!
          </Typography>
        </Grid>

      </Grid>
    );
  }
}

export default Landing;


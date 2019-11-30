import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
// import API from "../utils/API";


class Landing extends Component {
  state = {
    workout: null,
    userData: this.props.userData
  };

  componentDidMount() {
  }
  getDailyWorkout = () => {

  }

  render() {
    console.log(this.props.isAuthenticated);

    return (
      <Grid container>
        <Grid item xs={12} sm={4} style={{ padding: '1rem', marginTop: '1rem'}}>
          <Paper rounded={true} style={{ padding: '0.21rem', maxHeight: 'fitcontent' }}>
            <Typography style={{ width: '100%', color: 'red', fontWeight: 600, textAlign: 'center' }} variant="h4" component="h4">
              Workout of the Day
            </Typography>
            <img style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }} src={"https://darebee.com/images/workouts/tough-cookie-workout.jpg"} alt="Workout of the Day Poster" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item xs={12}>
              <Paper rounded={true} style={{ padding: '1rem', margin: '2rem' }}>
              <Typography variant="h3" component="h3" style={{ fontWeight: 600 }}>
                About Darebuddy
              </Typography>
              <Typography compenent="p">
                Darebuddy is a free app for anyone who wants to improve their fitness.  Darebuddy was created for fans of the amazing, open source fitness content provider <a style={{ textDecoration: 'none', color: 'red' }} href="https://darebee.com/"> Darebee </a>but has something to offer for everybody. Whether you just want a way to track your current <a style={{ textDecoration: 'none', color: 'red' }} href="https://darebee.com/"> Darebee </a> program, are interested in beginning a fitness program or just want to break up a monotonous gym routine, Darebuddy is for you!
                <p>
                  <a>More info.....</a>
                </p>
              </Typography>
            </Paper>
            </Grid>
            <Grid item xs={12} sm={12} style={{ margin: '0' }}>
              <Grid container style={{ margin: '0' }}>
                <Grid item xs={12} sm={6}  md={12} lg={6} style={{ margin: '0' }}>
                  <Paper rounded={true} style={{ padding: '1rem', margin: '2rem' }}>
                    <Typography variant="h3" component="h3" style={{ fontWeight: 600, color: 'red' }}>
                      Darebee
                    </Typography>
                    <Typography compenent="p">
                      This site only exists because of the amazing fitness resource Darebee.  Darebee is committed to making high quality fitness resources available to everyone for free.
                      They are able to do this because the donations of users and supporters.  So if you like the workouts you see here and are able you should go over and make a donation
                      so that the amazing people at Darebee can continue to provide this great content.
                <p>
                        <a href="https://darebee.com/support.html">Support Darebee</a>
                      </p>
                    </Typography>

                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={12} lg={6} style={{ margin: '0' }}>
                  <Paper rounded={true} style={{ padding: '1rem', margin: '2rem' }}>
                    <Typography variant="h5" component="h4" style={{ fontWeight: 600 }}>
                      Support Darebuddy
                    </Typography>
                    <Typography compenent="p">
                      Because we want to honor the spirit of Darebee this site doesn't charge or advertise.  It you use it and like it consider making a donation to keep this site running.
                      <p>
                        <a href="https://darebee.com/support.html">Support Darebuddy</a>
                      </p>
                    </Typography>

                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

export default Landing;


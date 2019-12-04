// src/components/Profile.js

import React, { Fragment, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { useAuth0 } from "../../react-auth0-spa";
import { Line } from 'rc-progress';
import moment from "moment";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import API from "../../utils/API";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    outline: 'solid #80808038 1px',
    padding: '1rem'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '90%',
  },
}));

const Profile = (props) => {
  const { loading, user } = useAuth0();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Fragment>
      <Paper
        component="div"
        elevation={1}
        style={{ margin: "3rem", paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        <Grid container spacing={3}>
          <Grid
            item xs={12}
            sm={3}
          >
            <img
              src={(user.picture || "data:image/png;base64,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")}
              alt="Profile"
              style={{ maxWidth: "100%" }}
            ></img>
          </Grid>
          <Grid
            item
            xs={6}
            sm={5}
            container
          >
            <Grid item xs={12}>
              <Typography component='h4'>Hi, {user.name} </Typography>
              <Typography component='h4'>You have been using Darebuddy since {(props.userData) ? (moment(props.userData.createdAt).format('MMMM Do YYYY')) : ""} </Typography>
            </Grid>
            <Grid item xs={12}>

              {(props.programs) ? (
                <Paper
                  component="div"
                  elevation={2}
                  style={{ padding: "1.5rem" }}>
                  <Typography variant='h4' component='h4'>Current programs:</Typography>
                  {props.programs.map(program => (
                    <Grid container spacing={1}>
                      <Grid item xs={12} container style={{ paddingBottom: '0' }}>
                        <Grid item xs style={{ paddingBottom: '0' }}>
                          <Typography component='span' >{program.programName}</Typography>
                        </Grid>
                        <Grid item xs={8} style={{ paddingTop: '0' }}>
                          <Line
                            style={{ width: '80%' }}
                            percent={100 * (program.lastCompleted / program.length)}
                            strokeWidth="5"
                            trailWidth="5"
                            strokeColor="#3AFE2D"
                            trailColor="#FE1212"
                          />
                          <Tooltip title="Delete Program">
                            <IconButton style={{ width: '20%' }}
                              aria-label="delete"
                              color="primary"
                              onClick={handleClickOpen}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">{'Permanently Delete Program'}</DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                {'Would you like to permanently delete this program?  This will cause you to lose all progress'}
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                Cancel
                              </Button>
                              <Button
                                onClick={()=>{
                                  console.log(program)
                                  API.deleteUserProgram(program)
                                    .then(res=>{
                                      props.updatePrograms();
                                    })
                                  handleClose();
                                }} 
                              color="secondary"
                              >
                              Delete
                              </Button>
                            </DialogActions>
                          </Dialog>
                      </Grid>
                    </Grid>
                    <Grid item xs style={{ paddingTop: '0' }}>
                      <Link
                        to={{
                          pathname: '/log',
                          state: {
                            programType: program.category,
                            programId: program.programId,
                            programOrder: program.lastCompleted + 1
                          }
                        }}
                      >
                        <Typography
                          component='a'
                          style={{ fontSize: '.7rem', marginRight: '2rem', float: 'right' }}

                        >
                          Next workout
                          </Typography>
                      </Link>
                      <Typography
                        component='p'
                        style={{ fontSize: '.7rem', marginRight: '2rem', float: 'right' }}
                      >
                        {program.lastCompleted} of {program.length} completed
                        </Typography>

                    </Grid>
                    </Grid>
              ))}
                </Paper>
            ) : ""}
            </Grid>
          <div name="col1">



          </div>
        </Grid>
        {/* <Grid
            item
            xs={6}
            sm={4}
          >
            <Paper
              component="div"
              elevation={2}
              style={{ padding: ".5rem" }}
            >
              {/* <Grid container>
                <Grid item component="h4" xs="12" style={{ textAlign: "center" }}>Completed Programs:</Grid>
                <Grid item xs="6">
                  <h5 style={{ textAlign: "center" }}>Completed:</h5>
                </Grid>
                <Grid item xs="6">
                  <h5 style={{ textAlign: "center" }}>In Progress:</h5>
                </Grid>
              </Grid> 
            </Paper>
          </Grid> */}
        </Grid>
      </Paper>
    </Fragment >
  );
};

export default Profile;
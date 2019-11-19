import React from "react";
import { Paper, Grid } from "@material-ui/core";
import ContainedButton from "../ContainedButtons";

const LogInfo = (props) => {

    return (
        <Paper style={{ margin: '2rem' }}>
            <Grid container>
                {(props.currentlySelected.workoutName) ? (
                    <Grid item xs={9}>
                        {(props.currentlySelected.imageUrl) ? (
                            <img style={{ maxWidth: '100%' }} src={props.currentlySelected.imageUrl} alt={props.currentlySelected.workoutName}></img>
                        ) : ("")}
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                    {(props.currentlySelected.imageUrl) ? (
                        <img style={{ maxWidth: '100%' }} src={props.currentlySelected.imageUrl} alt={props.currentlySelected.programName}></img>
                    ) : ("")}
                </Grid>  
                )}

                <Grid item xs={3}>

                    {(props.currentlySelected.workoutName) ? (
                        <>
                            <h2>Details</h2>
                            <h3>{props.currentlySelected.workoutName}</h3>
                            <div>
                                <p style={{ textTransform: 'capitalize' }}> {props.currentlySelected.workoutType} </p>
                                <p style={{ textTransform: 'capitalize' }}>Equipment: {props.currentlySelected.equipment}</p>
                                <p style={{ textTransform: 'capitalize' }}>Focus: {props.currentlySelected.focus}</p>
                                <p style={{ textTransform: 'capitalize' }}>Difficulty: {props.currentlySelected.difficulty} / 5 </p>

                                <ContainedButton
                                    color="secondary"
                                    text="Log this Workout"
                                    onClick={props.logWorkout}>
                                </ContainedButton>
                            </div>
                        </>) : (
                            ""
                        )
                    }
                </Grid>
                <Grid item xs={12}>
                    {(props.currentlySelected.description) ? (
                        <div>
                            <h4 style={{ textAlign: 'center' }}>Description</h4>
                            <p>{props.currentlySelected.description}</p>
                            <ContainedButton
                                    color="secondary"
                                    text="Start Program"
                                    onClick={props.addProgram}>
                                </ContainedButton>
                        </div>
                    ) : ""}
                </Grid>
            </Grid>
        </Paper>
    )
};

export default LogInfo;

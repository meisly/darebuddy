import React from "react";
import { Paper, Grid } from "@material-ui/core";
import ContainedButton from "../ContainedButtons";
import LogForm from "../LogForm";

const LogInfo = (props) => {

    return (
        <Paper style={{ margin: '2rem', padding: '1rem' }}>
            <Grid container spacing={3}>
                {(props.currentlySelected.workoutName) ? (
                    <Grid item xs={6}>
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

                <Grid item xs={6}>

                    {(props.currentlySelected.workoutName) ? (
                        <>
                            <LogForm
                            logWorkout={props.logWorkout}
                            />

                   
                            <h3>{props.currentlySelected.workoutName}</h3>
              
                            
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

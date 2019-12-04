import React, { useState } from "react";
import {
    Paper,
    Grid,
    IconButton,
    Snackbar,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ContainedButton from "../ContainedButtons";
import LogForm from "../LogForm";

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

const LogInfo = (props) => {
    const classes = useStyles();

    const [dialogMessageText, setDialogMessageText] = useState("Congratulations, you're swell....or you will be once you finish this program");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Paper style={{ margin: '2rem', padding: '1rem' }}>
            {(props.currentlySelected.workoutName || props.currentlySelected.description) ? (
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
                                    clearSelected={props.clearSelected}
                                />

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
                                    onClick={() => {
                                        props.addProgram()
                                            .then(res => {
                                                if (res) {
                                                    handleClickOpen();
                                                    setTimeout(props.clearSelected, 1000)
                                                }
                                            })
                                            .catch(err => {
                                                console.log(err)
                                                setDialogMessageText("Oops, something has gone wrong. Try again later");
                                                handleClickOpen();

                                            })
                                    }}
                                >
                                </ContainedButton>
                                <Snackbar
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    open={open}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">{dialogMessageText}</span>}
                                    action={[
                                        <IconButton
                                            key="close"
                                            aria-label="close"
                                            color="inherit"
                                            className={classes.close}
                                            onClick={handleClose}
                                        >
                                            <CloseIcon />
                                        </IconButton>,
                                    ]}
                                />
                            </div>
                        ) : ""}
                    </Grid>
                </Grid>
            ) : (
                    <Typography
                        component="h3"
                        variant="h3"
                        style={{
                            textAlign: 'center',
                            padding: '2rem',
                            fontWeight: '500',
                            fontFamily: "'Calistoga', cursive",
                            color: 'wheat'
                        }}
                    >
                        Make today so awesome,
                        yesterday gets jealous
                    </Typography>
                )}
        </Paper>
    )
};

export default LogInfo;

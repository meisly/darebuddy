import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ContainedButton from "../ContainedButtons";
import {
    Grid,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';



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

export default function LogForm(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [dialogMessageText, setDialogMessageText] = useState("You have successfuly logged a workout!");
    const [dialogTitleText, setDialogTitleText] = useState("Workout Logged");

    const [value, setValue] = useState({
        selectedDate: new Date(),
        logNotes: [""]
    });
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDateChange = date => {
        setValue({ ...value, selectedDate: [date] })
    };
    const handleChange = event => {
        setValue({
            ...value,
            [event.target.id]: [event.target.value],
        });
    };


    return (
        <form className={classes.container} noValidate autoComplete="off">
            <div>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            margin="normal"
                            id="logDate"
                            label="Date completed"
                            format="MM/dd/yyyy"
                            value={value.selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>

                <TextField
                    id="logNotes"
                    label="Notes"
                    multiline
                    rows="4"
                    defaultValue="Log your weight, reps or any other details"
                    onChange={handleChange}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />

                <ContainedButton
                    color="secondary"
                    text="Log this Workout"
                    onClick={() => {
                        props.logWorkout(value.selectedDate, value.logNotes[0])
                            .then(res => {
                                if (res) {
                                    handleClickOpen();
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                setDialogTitleText("Error")
                                setDialogMessageText("Oops, something has gone wrong. Try again later");
                                handleClickOpen();

                            })

                    }}>
                </ContainedButton>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{dialogTitleText}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {dialogMessageText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleClose()
                                setTimeout(props.clearSelected, 300)
                            }} 
                            color="primary">
                            Continue
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </form>
    );
}
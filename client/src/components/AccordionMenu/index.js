import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem } from "../List";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '100%',
        flexShrink: 0,
    },
}));

export default function AccordionMenu(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Choose a Workout</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Box component="div" style={{ width: "100%" }}>
                        <List>
                            {props.workouts.map(workout => {
                                return (
                                    <ListItem>
                                        <a href="#">workout.title</a>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Start a New Program</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Box component="div" style={{ width: "100%" }}>
                        <List>
                            {props.programs.map(workout => {
                                return (
                                    <ListItem>
                                        <a href="#">workout.title</a>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Start a Challenge</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Box component="div" style={{ width: "100%" }}>
                        <List>
                            {props.challenges.map(workout => {
                                return (
                                    <ListItem>
                                        <a href="#">workout.title</a>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Repeat a Recent Workout</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Box component="div" style={{ width: "100%" }}>
                        <List>
                            {props.recent.map(workout => {
                                return (
                                    <ListItem>
                                        <a href="#">workout.title</a>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

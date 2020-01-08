import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useAuth0 } from "../../react-auth0-spa";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#401818',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>

            <AppBar position="static" style={{backgroundColor: '#401818'}}>
                <Toolbar>
                    <Typography style={{fontWeight: 900, fontSize: '2.5rem'}} variant="h5" className={classes.title}> 
                        <a href="/" style={{textDecoration: 'none', color: 'white'}}>DareBuddy</a>
                    </Typography>
                    {!isAuthenticated && (
                        <button
                            onClick={() =>
                                loginWithRedirect({})
                            }
                        >
                            Log in
                      </button>
                    )}
                    {isAuthenticated && (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                     <Link to="/log" style={{textDecoration: "none", color: "black"}}>
                                         Log a Workout
                                    </Link>
                                </MenuItem>
                                
                                <MenuItem onClick={handleClose}>
                                    <Link to="/user" style={{textDecoration: "none", color: "black"}}>
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={() => logout()}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;

import React, { Component } from "react";
import Profile from "../components/Profile"
import { Paper, Grid } from "@material-ui/core";
import Calendar from 'react-calendar';
import { List, ListItem } from "../components/List";


class Books extends Component {


  state = {
    books: [1, 2, 3, 5, 6]
  };

  render() {
    
    return (
      <div>
        <Profile></Profile>
        <Grid
          container
          spacing={3}
          style={{ margin: "3rem" }}
        >
          <Grid
            item
            xs={12}
            sm={3}
          >
            <Calendar></Calendar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
          >
            <Paper component="div">
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book}>
                    <Paper style={{ padding: ".5rem", margin: "1rem" }}>
                      Stuff
                    </Paper>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>);
  }
}

export default Books;

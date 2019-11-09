import React, { Component } from "react";
import Navbar from "../components/Navbar";



class Books extends Component {
  state = {
    books: []
  };
  render() {
    return (
    <div>
      <Navbar></Navbar>
    </div>);
  }
}

export default Books;

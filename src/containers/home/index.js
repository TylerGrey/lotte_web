import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Home extends Component {
  render() {
    return (
      <Button variant="contained" color="primary" onClick={
        () => {
          axios.post("http://localhost:8080/users/")
          .then((res) => {
            console.log(res);
          })
        }
      }>
        Hello World
      </Button>
    )
  }
}

export default Home;
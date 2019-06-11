import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class Home extends Component {
  render() {
    return (
      <Button variant="contained" color="primary" onClick={
        () => {
          axios.post("http://localhost:8080/api/user/account", {email: "test@gmail.com", password: "123456"})
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
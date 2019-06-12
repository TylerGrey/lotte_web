import React, { useState } from 'react';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import Home from './containers/page/home';
import SignUpModal from './containers/modal/signUp';
import SignInModal from './containers/modal/signIn';

import { signIn } from "./redux/actions";
import { getLoginUser } from "./redux/selectors";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#ffffff',
  },
  title: {
    flexGrow: 1,
  },
  signUp: {
    marginRight: theme.spacing(1)
  },
}));

const App = ({ loginUser, signIn }) => {
  const classes = useStyles();

  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleSignUpClose = () => setSignUpOpen(false);
  const handleSignUpOpen = () => setSignUpOpen(true);

  const handleSignInClose = () => setSignInOpen(false);
  const handleSignInOpen = () => setSignInOpen(true);
  const handleSignIn = (user) => {
    signIn(user)
  };

  return (
    <div>
      {/* {localStorage.removeItem('user')} */}
      <SignUpModal open={signUpOpen} handleClose={handleSignUpClose} />
      <SignInModal open={signInOpen} handleClose={handleSignInClose} handleSignIn={handleSignIn} />
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>Lotte Web</Typography>
        {
          !loginUser ?
            <>
              <Button className={classes.signUp} variant="outlined" size="small" onClick={handleSignUpOpen}>Sign Up</Button>
              <Button variant="outlined" size="small" onClick={handleSignInOpen}>Sign In</Button>
            </> :
            <Avatar>{JSON.parse(loginUser).firstName[0]}</Avatar>
        }
      </Toolbar>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </div>
  );
}

const mapStateToProps = state => {
  const loginUser = getLoginUser(state);
  return { loginUser };
};

export default connect(
  mapStateToProps,
  { signIn }
)(App);
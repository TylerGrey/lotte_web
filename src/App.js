import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Home from './containers/home';
import SignUpModal from './containers/signUp';
import SignInModal from './containers/signIn';

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: '#ffffff',
  },
  title: {
    flexGrow: 1,
  },
  signUp: {
    marginRight: theme.spacing(1)
  }
}));

export default function App() {
  const classes = useStyles();

  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const handleSignUpClose = () => setSignUpOpen(false);
  const handleSignUpOpen = () => setSignUpOpen(true);

  const handleSignInClose = () => setSignInOpen(false);
  const handleSignInOpen = () => setSignInOpen(true);

  return (
    <div>
      <SignUpModal open={signUpOpen} handleClose={handleSignUpClose} />
      <SignInModal open={signInOpen} handleClose={handleSignInClose} />
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title}>Lotte Web</Typography>
        <Button className={classes.signUp} variant="outlined" size="small" onClick={handleSignUpOpen}>Sign Up</Button>
        <Button variant="outlined" size="small" onClick={handleSignInOpen}>Sign In</Button>
      </Toolbar>
      <Container maxWidth="lg">
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </div>
  );
}
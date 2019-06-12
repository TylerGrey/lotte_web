import React, { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSnackbar } from 'notistack';

import client from '../../../util/axios';


const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RoomAddModal = ({ open, handleClose, handleSave }) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState('')

  const handleSigIn = (evt) => {
    evt.preventDefault();
    client.post("/room/add", { name })
      .then((res) => {
        if (res.data.error) {
          enqueueSnackbar(res.data.error.message, { variant: 'error' });
        } else {
          enqueueSnackbar('생성 완료!', { variant: 'success' });
          handleSave();
          handleClose();
        }
      })
      .catch((err) => {
        enqueueSnackbar('Network error', { variant: 'error' });
      });
  };
  const handleName = (evt) => {
    setName(evt.target.value)
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회의실 생성
        </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="room"
              label="Room"
              name="room"
              autoComplete="room"
              autoFocus
              onChange={handleName}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSigIn}
            >
              생성
            </Button>
          </form>
        </div>
      </Container>
    </Modal>
  );
}

export default RoomAddModal;
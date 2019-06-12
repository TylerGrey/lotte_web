import React, { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import EditOutlined from '@material-ui/icons/EditOutlined';
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

const SignUpModal = ({ open, handleClose }) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('')

  const handleSigIn = (evt) => {
    evt.preventDefault();
    client.post("/board/add", { title }, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem('user')).token || '',
      }
    })
      .then((res) => {
        if (res.data.error) {
          enqueueSnackbar(res.data.error.message, { variant: 'error' });
        } else {
          enqueueSnackbar('작성 완료!', { variant: 'success' });
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Network error', { variant: 'error' });
      });
  };
  const handleTitle = (evt) => {
    setTitle(evt.target.value)
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EditOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            게시글 작성
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={handleTitle}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSigIn}
            >
              작성하기
            </Button>
          </form>
        </div>
      </Container>
    </Modal>
  );
}

export default SignUpModal;
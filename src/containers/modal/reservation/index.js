import React, { useState, useEffect } from 'react';

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
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

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

const ReservationModal = ({ open, handleClose, rooms, handleSave }) => {
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('')
  const [startDatetime, setStartDatetime] = useState('09:00')
  const [endDatetime, setEndDatetime] = useState('10:00')
  const [roomId, setRoomId] = useState('')
  const [users, setUsers] = useState([])
  const [userIds, setUserIds] = useState([])

  useEffect(() => {
    client.get('/user/list')
      .then(res => {
        let users = []
        users = res.data.result.data.list.map(r => {
          return {
            id: r.id,
            name: r.name,
          }
        })
        setUsers(users);
      })
  }, []);

  const handleSigIn = (evt) => {
    evt.preventDefault();
    console.log(roomId);
    console.log(userIds);
    client.post("/reservation/add", {
      title,
      roomId,
      userIds,
      startDatetime,
      endDatetime,
    }, {
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
          handleSave();
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
  const handleStartDatetime = (evt) => {
    setStartDatetime(evt.target.value)
  };
  const handleEndDatetime = (evt) => {
    setEndDatetime(evt.target.value)
  };
  const handleRoomId = (evt) => {
    setRoomId(evt.target.value)
  };

  function handleUserIds(event) {
    setUserIds(event.target.value);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EditOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            예약 하기
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Select
                  value={roomId}
                  onChange={handleRoomId}
                  inputProps={{
                    name: 'age',
                    id: 'age-simple',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {
                    rooms.map(r => <MenuItem key={`room-${r.id}`} value={r.id}>{r.title}</MenuItem>)
                  }
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  multiple
                  value={userIds}
                  onChange={handleUserIds}
                  input={<Input id="select-multiple" />}
                >
                  {users.map(user => (
                    <MenuItem key={`user-${user.id}`} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="datetime-local"
                  label="시작 시간"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleStartDatetime}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="datetime-local"
                  label="종료 시간"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleEndDatetime}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSigIn}
                >
                  작성하기
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Modal >
  );
}

export default ReservationModal;
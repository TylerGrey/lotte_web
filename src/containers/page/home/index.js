import React, { useState, useEffect, Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddReservationModal from '../../modal/reservation';
import ReservationDetailModal from '../../modal/reservationDetail';
import Timeline from 'react-calendar-timeline'

import moment from 'moment'
import 'react-calendar-timeline/lib/Timeline.css'

import client from '../../../util/axios';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
}));

const Home = () => {
  const classes = useStyles();

  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [reservationDetailOpen, setReservationDetailOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    fetchRooms();
    fetchReservations();
  }, []);

  const fetchRooms = () => {
    client.get('/room/list')
      .then(res => {
        let rooms = []
        rooms = res.data.result.data.list.map(r => {
          return {
            id: r.id,
            title: r.name,
          }
        })
        setRooms(rooms);
      });
  };

  const fetchReservations = () => {
    client.get('/reservation/list')
      .then(res => {
        let reservations = []
        reservations = res.data.result.data.list.map(r => {
          return {
            id: r.id,
            group: r.room_id,
            title: r.user_name,
            start_time: moment(r.start_datetime),
            end_time: moment(r.end_datetime),
          }
        })
        setReservations(reservations);
      });
  };

  const handleReservationOpen = () => setReservationOpen(true)
  const handleReservationClose = () => setReservationOpen(false)

  const handleReservationDetailOpen = (id, e, time) => {
    setSelectedId(id)
    setReservationDetailOpen(true);
  }
  const handleReservationDetailClose = () => setReservationDetailOpen(false)

  return (
    <Fragment>
      <AddReservationModal open={reservationOpen} handleClose={handleReservationClose} rooms={rooms} handleSave={fetchReservations} />
      <ReservationDetailModal open={reservationDetailOpen} handleClose={handleReservationDetailClose} selectedId={selectedId} />
      <Button variant="contained" color="primary" className={classes.button} onClick={handleReservationOpen}>
        예약하기
    </Button>
      <Paper className={classes.root}>
        <Timeline
          groups={rooms}
          items={reservations}
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
          onItemClick={handleReservationDetailOpen}
        />
      </Paper>
    </Fragment>
  );
}

export default Home;

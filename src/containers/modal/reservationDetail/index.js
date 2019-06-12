import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import client from '../../../util/axios'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(14),
    minWidth: 275,
  },
}));

const ReservationModal = ({ open, handleClose, selectedId }) => {
  const classes = useStyles();

  const [reservation, setReservation] = useState({});

  useEffect(() => {
    client.get(`/reservation/find?id=${selectedId}`)
      .then(res => {
        const data = res.data.result.data;
        setReservation(data && data.reservation);
      });
  }, [selectedId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Container maxWidth="md">
        {
          reservation ?
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {`제목: ${reservation.title}`}
              </Typography>
              <Typography variant="h5" component="h2">
                {`예약자: ${reservation.user_name}`}
              </Typography>
              <Typography variant="h5" component="h2">
                {`
                예약 시간: 
                  ${moment(reservation.start_datetime).format('YYYY-MM-DD HH:mm:ss')}
                  ~
                  ${moment(reservation.end_datetime).format('YYYY-MM-DD HH:mm:ss')}
                `}
              </Typography>
            </CardContent>
          </Card> : <></>
        }
      </Container>
    </Modal >
  );
}

export default ReservationModal;
import React, { useState, useEffect, Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RoomAddModal from '../../modal/room';
import Button from '@material-ui/core/Button';

import moment from 'moment'

import client from '../../../util/axios';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
}));

const Home = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [roomOpen, setRoomOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
    fetchReservations();
  }, []);

  const fetchRooms = () => {
    client.get('/room/list')
      .then(res => {
        setRooms(res.data.result.data.list || []);
      });
  };

  const fetchReservations = () => {
    client.get('/reservation/list')
      .then(res => {
        setReservations(res.data.result.data.list || []);
      });
  };

  const handleRemove = (id) => {
    client.post("/room/delete", { id })
      .then((res) => {
        if (res.data.error) {
          enqueueSnackbar(res.data.error.message, { variant: 'error' });
        } else {
          enqueueSnackbar('제거 되었습니다!', { variant: 'success' });
          fetchRooms();
        }
      })
      .catch((err) => {
        enqueueSnackbar('Network error', { variant: 'error' });
      });
  }

  const handleStatus = (id, status) => {
    client.post("/reservation/status", { id, status })
      .then((res) => {
        if (res.data.error) {
          enqueueSnackbar(res.data.error.message, { variant: 'error' });
        } else {
          enqueueSnackbar('수정 되었습니다!', { variant: 'success' });
          fetchReservations();
        }
      })
      .catch((err) => {
        enqueueSnackbar('Network error', { variant: 'error' });
      });
  }

  return (
    <Fragment>
      <RoomAddModal open={roomOpen} handleClose={() => setRoomOpen(false)} handleSave={fetchRooms} />
      <Paper className={classes.root}>
        <Button variant="contained" color="primary" className={classes.button} onClick={() => setRoomOpen(true)}>
          회의실 생성
        </Button>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>회의실 명</TableCell>
              <TableCell>최소 시간</TableCell>
              <TableCell>최대 시간</TableCell>
              <TableCell>주말 사용</TableCell>
              <TableCell>생성일</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map(row => (
              <TableRow key={`room-row-${row.id}`}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.min_enable_time}</TableCell>
                <TableCell>{row.max_enable_time}</TableCell>
                <TableCell>{row.is_enable_holiday === '1' ? 'YES' : 'NO'}</TableCell>
                <TableCell>{moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleRemove(row.id)}>
                    삭제
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Paper className={classes.root}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>회의실 ID</TableCell>
              <TableCell>회의 주제</TableCell>
              <TableCell>예약자 명</TableCell>
              <TableCell>시작 시간</TableCell>
              <TableCell>종료 시간</TableCell>
              <TableCell>상태</TableCell>
              <TableCell>예약일</TableCell>
              <TableCell>기능</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map(row => (
              <TableRow key={`room-row-${row.id}`}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.room_id}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.user_name}</TableCell>
                <TableCell>{moment(row.start_datetime).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell>{moment(row.end_datetime).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{moment(row.craeted_at).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                <TableCell>
                  {
                    row.status === "WAITING" &&
                    <>
                    <Button color="primary" onClick={() => handleStatus(row.id, 'APPROVE')}>
                      승인
                    </Button>
                    <Button color="secondary" onClick={() => handleStatus(row.id, 'REJECT')}>
                      거절
                    </Button>
                    </>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  );
}

export default Home;

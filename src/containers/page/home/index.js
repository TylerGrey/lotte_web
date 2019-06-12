import React, { useState, useEffect, Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddBoardModal from '../../modal/addBoard';

import client from '../../../util/axios';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  button: {
    marginTop: theme.spacing(3),
  }
}));

const Home = () => {
  const classes = useStyles();

  const [tables, setTable] = useState([]);
  const [addBoardOpen, setAddBoardOpen] = useState(false);

  useEffect(() => {
    client.get('/board/list')
      .then(res => {
        setTable(res.data.result.data.list || []);
      })
  }, []);

  const handleAddBoardOpen = () => setAddBoardOpen(true);
  const handleAddBoardClose = () => setAddBoardOpen(false);

  return (
    <Fragment>
      <AddBoardModal open={addBoardOpen} handleClose={handleAddBoardClose} />
      <Button variant="contained" color="primary" className={classes.button} onClick={handleAddBoardOpen}>
        게시글 등록
      </Button>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">이미지</TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center">작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tables.map((row, idx) => (
              <TableRow key={`board-${row.id}`}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.image}</TableCell>
                <TableCell align="center">{row.writer}</TableCell>
                <TableCell align="center">{moment(row.created_at).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  );
}

export default Home;

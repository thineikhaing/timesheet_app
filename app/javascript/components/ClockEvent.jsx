import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  date,
  workhour,
  clockin,
  clockout
) {
  return {date,workhour,clockin,clockout};
}

const rows = [
  createData('2012-10-11',"08:00", "9:00", "6:00"),
  createData('2012-10-12',"08:00", "9:00", "6:00"),
  createData('2012-10-13',"08:00", "9:00", "6:00"),
  createData('2012-10-14',"08:00", "9:00", "6:00"),
  createData('2012-10-15',"08:00", "9:00", "6:00"),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Work Hour</TableCell>
            <TableCell align="right">Clock In</TableCell>
            <TableCell align="right">Clock Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.workhour}</TableCell>
              <TableCell align="right">{row.clockin}</TableCell>
              <TableCell align="right">{row.clockout}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
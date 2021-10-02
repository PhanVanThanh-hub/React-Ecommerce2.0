import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatPrice } from '../../../../utils/common';
 

 
 
 
 

export default function SpanningTable(props) {
  const {total_order} = props
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="spanning table">
        <TableBody>
          <TableRow>
            <TableCell >Subtotal</TableCell>
            <TableCell align="left">{formatPrice(total_order)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="left"> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell  >Total</TableCell>
            <TableCell align="left">{formatPrice(total_order)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

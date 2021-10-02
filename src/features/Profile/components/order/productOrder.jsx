import React from 'react';
 
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { formatPrice } from '../../../../utils/common';
 
export default function ProductList(props) {
   const {detail} = props
   const total = parseFloat(detail.price) * parseFloat(detail.quantity);
 
   return( 
      <TableRow key={detail.detail} >
         <TableCell component="th" scope="row">{detail.detail}</TableCell>
         <TableCell>{formatPrice(detail.price)}</TableCell>
         <TableCell align="right">{detail.quantity}</TableCell>
         <TableCell align="right">{detail.size}</TableCell>
         <TableCell align="right">{formatPrice(total.toString())}</TableCell>
      </TableRow>
      )

};
 
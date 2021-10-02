import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
 
export default function BillDetail(props) {
   const {bill} = props
   
   return (
     
     <div style={{ height: 400, width: 650 ,overflowX: 'auto',}} >
       <TableContainer component={Paper}  >
         <Table aria-label="collapsible table">
           <TableHead>
             <TableRow>
               
               <TableCell>Ngày mua  </TableCell>
               <TableCell align="right">Giá</TableCell>
               <TableCell align="right">Số lượng</TableCell>
               <TableCell align="right">Tên sản phẩm</TableCell>
             </TableRow>
           </TableHead>
           <TableBody >
             {bill.map((row) => (
               <TableRow
                 key={row.name}
                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
               >
                 <TableCell component="th" scope="row">
                   {(row.date_create).substring(0, 19).replace("T"," ")}
                 </TableCell>
                 <TableCell align="right">{row.cost}</TableCell>
                 <TableCell align="right">{row.amount}</TableCell>
                 <TableCell align="right">{row.nameProduct}</TableCell>
                 
               </TableRow>
             
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </div>
   );
 }
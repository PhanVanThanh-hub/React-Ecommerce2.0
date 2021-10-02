import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormatPercent from '../../../components/Percent/FormatPercent';
import { formatPrice } from '../../../utils/common';
import {  Grid } from '@material-ui/core';
export default function MonthDetail(props) {
   const {monthRevenue} = props
   var data=[]
   if(monthRevenue.length!==0){
      var cost = 0.0
      var revenue=0.0
      var profit=0.0
      for (var i=0;i<monthRevenue.length;i++){
         cost+=parseFloat(monthRevenue[i].total_cost)
         revenue+=parseFloat(monthRevenue[i].total_revenue)
         profit+=parseFloat(monthRevenue[i].total_profit)
      }
      data.push(cost,revenue,profit)
   }
   return (
   <Grid container> 
      <Grid item   lg={9}   md={12}  xl={9}  xs={12}>
         <Paper style={{ height: 400 ,width:900,overflowX: 'auto',}} >
            <TableContainer component={Paper} stickyHeader aria-label="sticky table"   >
               <Table aria-label="collapsible table"  >
                  <TableHead  >
                     <TableRow >
                        <TableCell >Tháng </TableCell>
                        <TableCell align="right">Chi phí bỏ ra</TableCell>
                        <TableCell align="right">Doanh thu</TableCell>
                        <TableCell align="left">Tăng trưởng</TableCell>
                        <TableCell align="right">Lợi nhuận</TableCell>
                        <TableCell align="left">Tăng trưởng</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody >
                     {monthRevenue.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                           {(row.data_create).substring(0, 10).replace("T"," ")}
                           
                        </TableCell>
                        <TableCell align="right">{formatPrice(row.total_cost)} </TableCell>
                        <TableCell align="right">{formatPrice(row.total_revenue)} </TableCell>
                        <TableCell align="left"><FormatPercent percent={row.growth_revenue} /></TableCell>
                        <TableCell align="right">{formatPrice(row.total_profit)} </TableCell>
                        <TableCell align="left"><FormatPercent percent={row.growth_profit} /></TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </TableContainer>
         </Paper>
      </Grid>
      <Grid item   lg={3}   md={6}   xl={3}   xs={12}>
         <Paper style={{ height: 220 ,width:300,overflowX: 'auto',}} >
            
                  <TableRow >
                     <TableCell>Chi phí</TableCell>
                     <TableCell align="right">{formatPrice(data[0])}</TableCell>
                     <TableCell align="right">2</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell>Doanh thu</TableCell>
                     <TableCell align="right">{formatPrice(data[1])}</TableCell>
                     <TableCell align="right">2</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell  >Lợi nhuận</TableCell>
                     <TableCell align="right">{formatPrice(data[2])}</TableCell>
                     <TableCell align="right">2</TableCell>
                  </TableRow>
                  <TableRow>
                     <TableCell colSpan={2}>Total</TableCell>
                     <TableCell align="right">2</TableCell>
                     <TableCell align="right">2</TableCell>
                  </TableRow>
               
         </Paper>
         </Grid>
   </Grid>
   );
 }

 

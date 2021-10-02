import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProductOrder from '../../../features/Profile/components/order/ListProduct'; 
function OrderDetail(props) {
  
  const {order} = props
  
  return (
    
    <div style={{ height: 400, width: 650 ,overflowX: 'auto',}} >
      <TableContainer component={Paper}  >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Ngày mua  </TableCell>
              <TableCell align="right">Mã giao dịch</TableCell>
              <TableCell align="right">Giảm giá</TableCell>
              <TableCell align="right">Tổng Tiền</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {order.map((order) => (
              <ProductOrder  key={order}   order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default OrderDetail;
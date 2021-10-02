import React,{useEffect,useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProductOrder from './ListProduct';
import orderApi from '../../../../api/orderProduct'; 
export default function ListOrder(props) {

  const {username} = props
  const [orders, setOrders] = useState([])
  useEffect(() => {
    ; (async () => {
        try {
            const response = await orderApi.getAll(username)
            setOrders(response.data.order)
        } catch (error) {
            console.log(error.message)
        }
    })()
  }, [])

  return (
    
    <div style={{ height: '100%', width: 800 }}>
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
          <TableBody>
            {orders.map((order) => (
              <ProductOrder  key={order}   order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

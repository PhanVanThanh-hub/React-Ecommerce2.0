import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import orderApi from '../../../../api/orderProduct'; 
import ProductList from './productOrder';
import { formatPrice } from '../../../../utils/common';
const useRowStyles = makeStyles({
   root: {
     '& > *': {
       borderBottom: 'unset',
     },
   },
 });
export default function ProductOrder(props) {
    const { order } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [product, setProduct] = useState([])
    useEffect(() => {
      ; (async () => {
          try {
              const response = await orderApi.getOrderProduct(order.transaction_id)
              setProduct(response.data.order)
              
               
          } catch (error) {
              console.log(error.message)
          }
      })()
    }, [order])
    const dataTime= order.data_ordered.substring(0, 19).replace("T"," ")
    
    return (
      <React.Fragment>
        <TableRow className={classes.root} >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
           
          <TableCell >{dataTime}</TableCell>
          <TableCell align="right">{order.transaction_id}</TableCell>
          <TableCell align="right">{order.discount}</TableCell>
          <TableCell align="right">{formatPrice(order.total_order)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Giá</TableCell>
                      <TableCell align="right">số lượng</TableCell>
                      <TableCell align="right">Size</TableCell>
                      <TableCell align="right">Tổng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {product.map((detail) => (
                        <ProductList detail={detail}/>
                    ))}
                      
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}
 
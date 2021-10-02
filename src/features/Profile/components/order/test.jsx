import React,{useState, useEffect} from 'react';
import orderApi from '../../../../api/orderProduct'; 
import {  makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
 
import StorageKeys from '../../../../constants/storage-keys';
// import EnhancedTableToolbar from '../order1/EnhancedTableToolbar';
import EnhancedTableHead from '../order1/EnhancedTableHead';
import ProductOrder from './ListProduct';
import Grid from '@material-ui/core/Grid';
import SpanningTable from './SpanningTable';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'data_ordered', numeric: false, disablePadding: true, label: 'Ngày mua' },
  { id: 'transaction_id', numeric: true, disablePadding: false, label: 'Mã giao dịch' },
  { id: 'discount', numeric: true, disablePadding: false, label: 'Giảm giá' },
  { id: 'total_order', numeric: true, disablePadding: false, label: 'Tổng tiền' },
   
];

 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const profile=localStorage.getItem(StorageKeys.user)
  const username = JSON.parse(profile).username
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const dense = false
  const [rowsPerPage, setRowsPerPage] = React.useState(7);
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
  }, [username])

  const total_order = orders.reduce((count, item) => count + item.total_order, 0)
  console.log("total1:",total_order)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orders.map((n) => n.transaction_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };




  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);
 
  return (
    <Grid container spacing={2} columns={12}> 
    <Grid item xs={9}>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar   numSelected={selected.length} /> */}
        <TableContainer>
          <Table className={classes.table} aria-labelledby="tableTitle" size='small' aria-label="enhanced table" >
            <EnhancedTableHead headCells={headCells} classes={classes} numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={orders.length}/>
            <TableBody>
            {stableSort(orders, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
              <ProductOrder  key={order}   order={order} />
            ))}
               
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination rowsPerPageOptions={[7, 10, 25]} component="div" count={orders.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

    </div>
    </Grid>
    <Grid item xs={3}>
      <SpanningTable total_order={total_order}/>
    </Grid>
    </Grid>
  );
}

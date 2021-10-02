import  React, {useState , useEffect} from 'react';
 
 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import EnhancedTableHead from "../components/EnhancedTableHead";
import Switch from '@mui/material/Switch';
import TableRow from '@mui/material/TableRow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import userApi from '../../../api/userList';
import TotalOrder from "../components/TotalOrder";
import {  makeStyles } from '@material-ui/core/styles';
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
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'date_joined', numeric: true, disablePadding: true, label: 'Ngày tạo',},
  { id: 'last_name', numeric: false, disablePadding: false, label: 'Tên',  },
  { id: 'first_name', numeric: false, disablePadding: false, label: 'Họ', },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email', },
  { id: 'TotalOrder', numeric: true, disablePadding: false, label: 'Tổng tiền' },
];

export default function CustomerList(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [customer , setCustomer] = useState([])
   

  useEffect(() => {
    ; (async () => {
        try {
            const response = await userApi.getAll()

            setCustomer(response.data)
            
            
        } catch (error) {
            console.log(error.message)
        }
    })()
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = customer.map((n) => n.name);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
 

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - customer.length) : 0;
   
  return (
    <div className={classes.root}>
      <Paper sx={{ width: '100%', mb: 2 }} className={classes.paper}>
        
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            className={classes.table} 
          >
            <EnhancedTableHead
              headCells={headCells}
              classes={classes} 
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={customer.length}
            />
            <TableBody>
              {stableSort(customer, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((profile, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const dataTime= profile.date_joined.substring(0, 19).replace("T"," ")
                  
                             
                  return (
                    <TableRow
                      hover   
                      tabIndex={-1}
                      key={profile.id}              
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="right"
                      >
                        {dataTime}
                      </TableCell>
                      <TableCell align="left">{profile.last_name}</TableCell>
                      <TableCell align="left">{profile.first_name}</TableCell>
                      <TableCell align="right">{profile.email}</TableCell>
                      {/* <TableCell align="right">{total}</TableCell>  */}
                      <TotalOrder id = {profile.id}/> 
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 30, 35]}
          component="div"
          count={customer.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}



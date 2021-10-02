import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EnhancedTableToolbar from './EnhancedTableProduct';
import EnhancedTableHead from './EnhancedTableHead';

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
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'sold',
    numeric: true,
    disablePadding: false,
    label: 'Đã bán',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Giá',
  },
  
];

export default function TableProduct(props) {
   const [order, setOrder] = React.useState('asc');
   const [orderBy, setOrderBy] = React.useState('calories');
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const {product} = props
   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

 

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

  
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - product.length) : 0;

   return (
      <Box sx={{ width: 600 }}>
         <Paper sx={{ width: '100%', mb: 2 }}>
         <EnhancedTableToolbar />
         <TableContainer>
            <Table
               sx={{ minWidth: 600 }}
               aria-labelledby="tableTitle"
               size= 'small' 
            >
               <EnhancedTableHead    
               order={order}
               orderBy={orderBy}
               onRequestSort={handleRequestSort}
               rowCount={product.length}
               headCells={headCells}
               />
               <TableBody>
               {stableSort(product, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                      
                     const labelId = `enhanced-table-checkbox-${index}`;

                     return (
                     <TableRow
                        hover
                         
                        tabIndex={-1}
                        key={row.name}
                         
                     >
                         
                        <TableCell
                           component="th"
                           id={labelId}
                           scope="row"
                           padding="none"
                        >
                           {row.title}
                        </TableCell>
                        <TableCell align="right">{row.sold}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        
                     </TableRow>
                     );
                  })}
               {emptyRows > 0 && (
                  <TableRow
                     style={{
                     height: 33  * emptyRows,
                     }}
                  >
                     <TableCell colSpan={6} />
                  </TableRow>
               )}
               </TableBody>
            </Table>
         </TableContainer>
         <TablePagination
            rowsPerPageOptions={[10, 20, 25]}
            component="div"
            count={product.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         />
         </Paper>
      </Box>
   );
}

import React ,{useEffect , useState} from 'react';
 
import TableCell from '@mui/material/TableCell';
import userApi from '../../../api/userList';
import { formatPrice } from '../../../utils/common';

TotalOrder.propTypes = {

};

function TotalOrder(props) {
   const [total , setTotal] = useState(0)
   const {id} = props  
   useEffect(() => {
      ; (async () => {
          try {
              const response = await userApi.totalOrder(id)
              console.log("res:",response.data.total)
              setTotal(response.data.total)
              
              
          } catch (error) {
              console.log(error.message)
          }
      })()
    }, [id])
    
   return (
         <TableCell align="right">{formatPrice(total.toString())}</TableCell>
   );
}
 

export default TotalOrder;
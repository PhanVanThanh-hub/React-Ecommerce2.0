import React , {useState} from 'react';
 
import FormControlLabel from '@mui/material/FormControlLabel';
 
import Checkbox from '@mui/material/Checkbox';

export default function Test(props) {
   const {product,changeChart} = props
   const [state , setState] = useState({product:false})
   const handleChange = (event) => {
      console.log("sa:",product.title)
      changeChart(event.target.name,event.target.checked,product.title)
      setState({
         ...state,
         [product]: event.target.checked,
      });
   };
   const {bool} = state
   return (
      <FormControlLabel
               control={
               <Checkbox checked={bool} onChange={handleChange} name={product.id}   />
               }
               label={product.title}
         />
   );
}




 
 


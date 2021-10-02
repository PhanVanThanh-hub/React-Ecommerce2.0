import React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
 
import FormHelperText from '@mui/material/FormHelperText';
 
import Test from './test';

export default function CheckboxesGroup(props) {
 
   const {product,changeChart} = props
 

   
   return (
      <Box sx={{ display: 'flex' ,height: 400, overflow: 'auto'}}>
         <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
         <FormLabel component="legend">Product</FormLabel>
         <FormGroup>
            {product.map(item=>
               <Test product={item} changeChart={changeChart}/>
                
            )}
         </FormGroup>
         <FormHelperText>Be careful</FormHelperText>
         </FormControl>
      </Box>
   );
}




 
 


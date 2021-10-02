import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
   const [day, setDay] = React.useState('7');
   const {onHello} = props
   const handleChange = (event) => {
      setDay(event.target.value);

      onHello(event.target.value)
   };

   return (
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Day</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={day}
            label="Age"
            onChange={handleChange}
         >
            <MenuItem value={7}>7 day</MenuItem>
            <MenuItem value={30}>30 day</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
         </Select>
         </FormControl>
      </Box>
   );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
   const [day, setDay] = React.useState('7');
   const {onChangeFromat} = props
   const handleChange = (event) => {
      setDay(event.target.value);

      onChangeFromat(event.target.value)
   };

   return (
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Xem theo</InputLabel>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={day}
            label="Age"
            onChange={handleChange}
         >
            <MenuItem value={7}>Hour</MenuItem>
            <MenuItem value={30}>Day</MenuItem>
         </Select>
         </FormControl>
      </Box>
   );
}

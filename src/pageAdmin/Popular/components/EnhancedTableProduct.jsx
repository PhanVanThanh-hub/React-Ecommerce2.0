import React from 'react';
 
import { alpha } from '@mui/material/styles';
 
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

EnhancedTableToolbar.propTypes = {
   numSelected: PropTypes.number.isRequired,
 };
export default  function EnhancedTableToolbar (props){
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
          
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Product Sold OverView
          </Typography>
          
  
          
      </Toolbar>
    );
};

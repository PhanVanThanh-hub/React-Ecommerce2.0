import {
   Avatar,
   Card,
   CardContent,
   Grid,
   Box,
   Typography
 } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import React from 'react'; 
import { formatPrice } from '../../../utils/common';
import FormatPercent from '../../../components/Percent/FormatPercent';
function TotalProfit(props){
    
    const {name ,revenue,growth} = props
    return(
    <Card >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h7"
            >
              
              {name}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
       
              {formatPrice(revenue)}
              
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
          
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2
          }}
        >
       
          <Typography
            variant="body2"
            sx={{
              color: green[900],
              mr: 1
            }}
          >
 
            <FormatPercent percent={growth} />
          </Typography>
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
     </CardContent>
   </Card>
    )
 };
 
 export default TotalProfit;
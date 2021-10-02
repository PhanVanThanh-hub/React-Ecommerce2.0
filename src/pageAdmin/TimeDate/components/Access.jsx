import {
   Avatar,
   Box,
   Card,
   CardContent,
   Grid,
   Typography
 } from '@material-ui/core';
 import { green } from '@material-ui/core/colors';
 
 import PeopleIcon from '@material-ui/icons/PeopleOutlined'; 
 
 import React from 'react';
 import Access from './GetAccess';
 import FormatPercent from '../../../components/Percent/FormatPercent';
function TotalAccess(props){
    const {time ,title,type} = props
    var count =[]
    if(time !== undefined){
      if(type==="overview"){
        var amount = time.length
        count =[amount,0]
      }
         
      
    if (type==="day"){
      count = Access.byDay(time)
    }
    else if(type==="week"){
      count = Access.byWeek(time)
    }
    else if(type==="month"){
      count = Access.byMonth(time)
    }
  }
    return(
    <Card >
      <CardContent>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item xs={10 }>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h7"
            >
              {title}
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              {count[0]}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
        {
          (type==="overview")?(
            <Box></Box>
          ):
          (
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                pt: 2
              }}
            >
             
             <FormatPercent percent={count[1]} />

          
            <Typography
              variant="body2"
              sx={{
                color: green[900],
                mr: 1
              }}
            >
             
            </Typography>
            <Typography
              color="textSecondary"
              variant="caption"
            >
              Since last {type}
            </Typography>
          </Box>
          )
        }
         
      </CardContent>
    </Card>
  )
}
 
 export default TotalAccess;
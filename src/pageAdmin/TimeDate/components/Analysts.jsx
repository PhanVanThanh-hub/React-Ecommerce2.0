import {
   Avatar,
   Box,
   Card,
   CardContent,
   Grid,
   Typography
 } from '@material-ui/core';
 import { green } from '@material-ui/core/colors';
 
 import React from 'react';
 import AnalystsUsed from './GetAnalystUsed';
 import AccessTimeIcon from '@material-ui/icons/AccessTime';
function msToTime(duration) {
 
   var seconds = Math.floor((duration / 1000) % 60),
   minutes = Math.floor((duration / (1000 * 60)) % 60),
   hours = Math.floor((duration / (1000 * 60 * 60)));
   hours = (hours < 10) ? "0" + hours : hours;
   minutes = (minutes < 10) ? "0" + minutes : minutes;
   seconds = (seconds < 10) ? "0" + seconds : seconds;
 
   return hours + "h" + minutes + "m" + seconds;
}

function TimeAnalyst(props){
   const {time ,title,type} = props

   var timeUsed=0
   if(time !== undefined){
      if(type==="total"){
         timeUsed=AnalystsUsed.total(time)
        console.log("timeUsed:",timeUsed)
      }
      else if(type==="average"){
         timeUsed=AnalystsUsed.average(time)
         console.log("timeUsed:",timeUsed)
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
              {msToTime(timeUsed)}
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
              <AccessTimeIcon />
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
          </Box>
      </CardContent>
    </Card>
  )
}
 
 export default TimeAnalyst;
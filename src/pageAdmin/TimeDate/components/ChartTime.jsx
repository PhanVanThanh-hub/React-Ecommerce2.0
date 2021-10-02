import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
 
} from '@material-ui/core';
import React, { useState } from 'react';

import BasicSelect from './FormatTime';
 
import Modal from '@mui/material/Modal';
import TimeLoginDetail from './CharDetail';

export default function TimeLogin(props){
   const theme = useTheme();
   const {time} = props
   const [filter , setFilter] = useState(7)
   const [day , setDay] = useState(0)
   const [title , setTitle] = useState("Sunday")
   var weekday = new Array(7); weekday[0] = "Sunday"; weekday[1] = "Monday"; weekday[2] = "Tuesday"; weekday[3] = "Wednesday"; weekday[4] = "Thursday"; weekday[5] = "Friday"; weekday[6] = "Saturday";
   var amoutLogin=[];
   var hour=[];
    

   if(filter===7){
      amoutLogin=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      hour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
      if(time !==undefined){
         var dataTime=0
         
         for(let i=0;i<time.length;i++){
            dataTime =new Date(time[i].start.substring(0, 19).replace("T"," "));
            
            amoutLogin[dataTime.getHours()]+=1
         }
         
      }
   }
   if(filter===30){
      amoutLogin=[0,0,0,0,0,0,0]
      hour = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
      if(time !==undefined){
         for(let i=0;i<time.length;i++){
            let dataTime =new Date(time[i].start.substring(0, 19).replace("T"," "));
            
            amoutLogin[dataTime.getDay()]+=1
         }
         
      }
   }
   
    
   const data = {
      datasets: [
         {
         backgroundColor: colors.indigo[500],
         barPercentage: 0.5,
         barThickness: 12,
         borderRadius: 4,
         categoryPercentage: 0.5,
         data: amoutLogin,
         label: 'Số lần đăng nhập',
         maxBarThickness: 10,
          
         },
      ],
      labels: hour
   };
   const [open, setOpen] = useState(false);
  
   const handleClose = () => setOpen(false);
   const options = {
      onClick: function(evt, element) {
         if(filter===30){
            try {
          
            if(element[0].index!==undefined){
               setDay(element[0].index)
               setTitle(weekday[element[0].index])
               setOpen(true)
            }
            } catch (error) {
               console.error(error);
            }
             
             
         }
          
      },
      animation: false,
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      
      scales: {
         xAxes: [
         {
            ticks: {
               fontColor: theme.palette.text.secondary
            },
            gridLines: {
               display: false,
               drawBorder: false
            },
            
         }
         ],
         yAxes: [
         {
            ticks: {
               fontColor: theme.palette.text.secondary,
               beginAtZero: true,
               min: 0
            },
            gridLines: {
               borderDash: [2],
               borderDashOffset: [2],
               color: theme.palette.divider,
               drawBorder: false,
               zeroLineBorderDash: [2],
               zeroLineBorderDashOffset: [2],
               zeroLineColor: theme.palette.divider
            }
         }
         ],
      
      },
      tooltips: {
         backgroundColor: theme.palette.background.paper,
         bodyFontColor: theme.palette.text.secondary,
         borderColor: theme.palette.divider,
         borderWidth: 1,
         enabled: true,
         footerFontColor: theme.palette.text.secondary,
         intersect: false,
         mode: 'index',
         titleFontColor: theme.palette.text.primary,
       
      }
   };
   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 750,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    
 
    
   function onChangeFromat(value){
      setFilter(value)
   }
   return (
      <Card {...props}>
         <CardHeader
         title="Tổng quan"
         action={(
            <BasicSelect onChangeFromat={onChangeFromat}/>
         )}
         />
         <Divider />
         <CardContent>
         <Box sx={{height: 400  ,position: 'relative' ,width:650}}>
            <Bar data={data} options={options}/>
         </Box>
         
         </CardContent>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
        <Box sx={style}>
            <TimeLoginDetail time={time} day={day} title = {title}/>
         </Box>
         </Modal>
         <Divider />
          
      </Card>
   );
};
 
 

 
 


 
 

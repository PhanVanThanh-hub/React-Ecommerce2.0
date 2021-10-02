import { Bar  } from 'react-chartjs-2';
import {
  Box,
 
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
 
} from '@material-ui/core';
import React from 'react';
 
 

export default function TimeLoginDetail(props){
   const theme = useTheme();
   const {time,day , title} = props
   
   var amoutLogin=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
   var hour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
 
   if(time !==undefined){
     
         
      for(var i=0;i<time.length;i++){
         var dataTime =new Date(time[i].start.substring(0, 19).replace("T"," "));
         if(day===dataTime.getDay()){
            amoutLogin[dataTime.getHours()]+=1
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
  
   const options = {
       
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
   
    
 
   const dayView = "Biểu đồ tổng quan vào :"+title;
   return (
      <Card {...props}>
         <CardHeader
         title={dayView}
         
         />
         <CardContent>
         <Box sx={{height: 400, width:600 ,position: 'relative' }}>
            <Bar data={data} options={options}/>
         </Box>
         </CardContent>
         <Divider />
          
      </Card>
   );
};
 
 

 
 


 
 

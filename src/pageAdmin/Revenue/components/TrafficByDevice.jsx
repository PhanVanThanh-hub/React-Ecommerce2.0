import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';

import React from 'react';
function TrafficByDevice(props){
   const {totalRevenue , totalCost , totalProfit} = props
   const theme = useTheme();
    
   const total = totalRevenue + totalCost + totalProfit
   const data = {
      datasets: [
         {
         data: [totalRevenue, totalCost, totalProfit],
         backgroundColor: [
            colors.indigo[500],
            colors.red[600],
            colors.orange[600]
         ],
         borderWidth: 8,
         borderColor: colors.common.white,
         hoverBorderColor: colors.common.white
         }
      ],
      labels: ['Revenue', 'Cost', 'Profit']
   };

   const options = {
      animation: false,
      cutoutPercentage: 80,
      layout: { padding: 0 },
      legend: {
         display: false
      },
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
         backgroundColor: theme.palette.background.paper,
         bodyFontColor: theme.palette.text.secondary,
         borderColor: theme.palette.divider,
         borderWidth: 1,
         enabled: true,
         footerFontColor: theme.palette.text.secondary,
         intersect: false,
         mode: 'index',
         titleFontColor: theme.palette.text.primary
      }
   };

   const devices = [
      {
         title: 'TOTAL REVENUE',
         value: ((totalRevenue/total)*100).toFixed(2),
         icon: LaptopMacIcon,
         color: colors.indigo[500]
      },
      {
         title: 'TOTAL COST',
         value: ((totalCost/total)*100).toFixed(2),
         icon: TabletIcon,
         color: colors.red[600]
      },
      {
         title: 'TOTAL PROFIT',
         value: ((totalProfit/total)*100).toFixed(2),
         icon: PhoneIcon,
         color: colors.orange[600]
      }
   ];

   return (
      <Card {...props}>
         <CardHeader title="Traffic by Device" />
         <Divider />
         <CardContent>
         <Box
            sx={{
               height: 300,
               position: 'relative'
            }}
         >
            <Doughnut
               data={data}
               options={options}
            />
         </Box>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'center',
               pt: 2
            }}
         >
            {devices.map(({
               color,
               icon: Icon,
               title,
               value
            }) => (
               <Box
               key={title}
               sx={{
                  p: 1,
                  textAlign: 'center'
               }}
               >
               <Icon color="action" />
               <Typography
                  color="textPrimary"
                  variant="body1"
               >
                  {title}
               </Typography>
               <Typography
                  style={{ color }}
                  variant="h6"
               >
                  {value}
                  %
               </Typography>
               </Box>
            ))}
         </Box>
         </CardContent>
      </Card>
   );
};

export default TrafficByDevice;
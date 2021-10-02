import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
 
  colors,
  useTheme
} from '@material-ui/core';
 

import React from 'react';
function TrafficByDevice(props){
   const {products} = props
   const theme = useTheme();
    
   var productSold = {}
   products.sort(function(a, b) {
      return  parseFloat(b.sold) - parseFloat(a.sold) ;
   });
   var otherProductSold = 0
   for (var  i=0;i<products.length;i++){
      
      if(i>=5){
         otherProductSold +=products[i].sold
      }
      else{
         productSold[products[i].title]=products[i].sold
      }
   }
   productSold["Product Other"] = otherProductSold
   
   const data = {
      datasets: [
         {
         data:  Object.values(productSold),
         backgroundColor: [
            colors.indigo[500],
            colors.red[600],
            colors.orange[600],
            colors.blue[500],
            colors.cyan[500],
            colors.yellow[500],
         ],
         borderWidth: 1,
         borderColor: colors.common.white,
         hoverBorderColor: colors.common.white
         }
      ],
      labels: Object.keys(productSold) 
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


   return (
      <Card {...props}>
         <CardHeader title="Percentage of products sold" />
         <Divider />
         <CardContent>
         <Box
            sx={{
               width:400,
               height: 360,
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
            
         </Box>
         </CardContent>
      </Card>
   );
};

export default TrafficByDevice;
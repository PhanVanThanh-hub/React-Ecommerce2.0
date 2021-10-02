import { Bar ,Line} from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
  Grid,
 
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React, { useState } from 'react';
import { Modal } from 'antd';
import OrderDetail from '../components/ModelDetail';
import BillDetail from '../components/BillDetail';
import BasicSelect from './ChooseLastDay';
import Revenue from './getData';
import MonthDetail from './monthDetail'; 

 

export function Sales(props){
   const theme = useTheme();
   const {order7day , bill7day ,ChangeFilter,fillterDay,monthRevenue} = props
   const [order , setOrder] = useState(order7day)
   const [bill , setBill] = useState(bill7day)
   const [title , setTitle] = useState("Order detail")
  
   

   var dataRenvenue=[]
   if(order7day.length!==0){
      if(fillterDay===2021){
         dataRenvenue = Revenue.analystMonth(monthRevenue) 
      }
      else{
         dataRenvenue = Revenue.analyst(order7day,fillterDay,bill7day)   
      }
         
   }

   const [isModalVisible, setIsModalVisible] = useState(false);

   const showModal = () => {
      setOrder(order7day)
      setBill(bill7day)
      if(fillterDay!==2021){
         setTitle("Order detail")
      }
      else{
         setTitle("Financial Overview")
      }
       
      setIsModalVisible(true);
   };
 
   const handleOk = () => {
     setIsModalVisible(false);
   };
 
   const handleCancel = () => {
     setIsModalVisible(false);
   };
   var data=[]
   data = {
      datasets: [
         {
         borderColor:  colors.indigo[500],
         backgroundColor: colors.indigo[500],
         barPercentage: 0.5,
         barThickness: 12,
         borderRadius: 4,
         categoryPercentage: 0.5,
         data: dataRenvenue[2],
         label: 'Doanh thu',
         maxBarThickness: 10,
          
         },
         {
         borderColor:  colors.red[600],
         backgroundColor: colors.red[600],
         barPercentage: 0.5,
         barThickness: 12,
         borderRadius: 4,
         categoryPercentage: 0.5,
         data: dataRenvenue[0],
         label: 'Chi phí',
         maxBarThickness: 10
         }
      ],
      labels: dataRenvenue[1]
   };
   if(fillterDay===2021){
      data["datasets"].push({
         borderColor:  colors.orange[600],
         backgroundColor: colors.orange[600],
         barPercentage: 0.5,
         barThickness: 12,
         borderRadius: 4,
         categoryPercentage: 0.5,
         data: dataRenvenue[3],
         label: 'Lợi nhuận',
         maxBarThickness: 10
         },) 
      
   }
    
    
   const options = {
      onClick: function(evt, element) {
         const i = element[0].index
          
         const days=dataRenvenue[1]
         const newOrder=[]
         var day=days[i].substr(0, 2)
         if(days[i].substr(0, 2).indexOf('-')){
            day="0"+days[i].substr(0, 1)
         }
         for(let j=0;j<order7day.length;j++){
            
            if((order7day[j].data_ordered).substring(8, 10)===day){
               newOrder.push(order7day[j])
            }
         }
          
        
         const newBill =[]
      
         for(let j=0;j<bill7day.length;j++){
            
            if((bill7day[j].date_create).substring(8, 10)===day){
               newBill.push(bill7day[j])
            }
         }
         setTitle("Order detail by:"+days[i])
         setOrder(newOrder)
         setBill(newBill)
         setIsModalVisible(true)
         
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
            }
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
   
   const hello = (value)=>{
      ChangeFilter(value)
   }
   return (
      <Card {...props}>
         <CardHeader
         action={(
            <BasicSelect onHello = {hello}/>
         )}
         title="Latest Sales"
         />
         <Divider />
         <CardContent>
         <Box sx={{height: 400,position: 'relative' }}>
            {(fillterDay!==2021)?(
               <Bar data={data} options={options}/>
            ):(
               <Line data={data}/>
            )}
             
         </Box>
         
         </CardContent>
         <Divider />
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', p:2 }} >
         <Button type="primary" color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text" onClick={showModal}>
            Open Overview
         </Button>
         <Modal width title={title}   visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          
            {(fillterDay!==2021)?(
               <Grid container   >
                <Grid item xs={6}  >
                  <OrderDetail order = {order} width={400}/>
               </Grid>
               <Grid item xs={6}>
                    <BillDetail bill = {bill}/> 
               </Grid>
               </Grid>
            
            ):(

               <Grid container   >
               <Grid item xs={12}>
                  <MonthDetail monthRevenue={monthRevenue}/>
               </Grid>
              </Grid>
            )}
             
              

         </Modal>
         </Box>
      </Card>
   );
};

export default Sales;
 

 
 

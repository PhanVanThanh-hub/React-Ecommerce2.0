 
import { Box, Container, Grid } from '@material-ui/core';
import React,{useState ,useEffect} from 'react'; 
import TotalCustomers from '../components/TotalCustomer';
import userApi from '../../../api/userList';
import revenueApi from '../../../api/revenueApi';
import TotalProfit from '../components/TotalProfit';
import TrafficByDevice from '../components/TrafficByDevice';
import orderApi from '../../../api/orderProduct';
import Sales from '../components/Sale';
 

export default function Dashboard(props){
   const [profiles, setProfiles] = useState(0)
   const [revenue , setRevenue] = useState(0)
   const [totalRevenue , setTotalRevenue] = useState(1)
   const [totalCost , setTotalCost] = useState(1)
   const [totalProfit , settotalProfit] = useState(1)
   const [order7day , setOrder7day] = useState([])
   const [bill7day , setBill7day] = useState([])
   const [fillterDay , setFilterDay] = useState(7)
   const [monthRevenue, setMonthRevenue] = useState([])
   useEffect(() => {
      ; (async () => {
         try {
            const response = await userApi.getAll()
            setProfiles(response.data)
            
         } catch (error) {
            console.log(error.message)
         }
      })()
    }, [])
    useEffect(() => {
      ; (async () => {
         try {
            const response = await revenueApi.getRevenue()
            setRevenue(response.data.slice(-1)[0])
            const re = response.data
            var totalprofit=0
            var totalcost=0
            var totalrevenue=0
            for(var i=0;i<re.length;i++){
               totalprofit = totalprofit+parseFloat(re[i].total_profit)
               totalcost = totalcost +  parseFloat(re[i].total_cost)
               totalrevenue = totalrevenue +  parseFloat(re[i].total_revenue)
            }
            setTotalRevenue(totalrevenue)
            setTotalCost(totalcost)
            settotalProfit(totalprofit)
             
          } catch (error) {
              console.log(error.message)
          }
      })()
    }, [])

   useEffect(() => {
      ; (async () => {
         try {
            if(fillterDay===2021){
               const response = await revenueApi.getRevenue({year:fillterDay})
               console.log("re:",response)
               setMonthRevenue(response.data)
            }else{
               const response = await orderApi.getOrderLast7Day({day:fillterDay})
               const response1 = await orderApi.getBillLast7Day({day:fillterDay}) 
           
               setBill7day(response1.data)
               setOrder7day(response.data)
            }
             
    
         } catch (error) {
            console.log(error.message)
         }
      })()
    }, [fillterDay])
   const ChangeFilter = (value)=>{
      setFilterDay(value)
   }
   return(
         <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}
         >
            <Container maxWidth={false}>
            <Grid
               container
               spacing={3}
            >
               <Grid item   lg={3}   sm={6}   xl={3}   xs={12}>
                  <TotalCustomers profiles = {profiles}/>
               </Grid>
               <Grid item   lg={3}   sm={6}   xl={3}   xs={12}>
                  <TotalProfit name = {"TOTAL REVENUE"} revenue={revenue.total_revenue} growth={revenue.growth_revenue}/>
               </Grid>
               <Grid item   lg={3}   sm={6}   xl={3}   xs={12}>
                  <TotalProfit name = {"TOTAL COST"} revenue={revenue.total_cost} growth={revenue.growth_cost}/>
               </Grid> 
               <Grid item   lg={3}   sm={6}   xl={3}   xs={12}>
                  <TotalProfit name = {"TOTAL PROFIT"} revenue={revenue.total_profit} growth={revenue.growth_profit}/>
               </Grid>
                
               <Grid item   lg={8}   md={12}  xl={9}  xs={12}>
               
                <Sales monthRevenue={monthRevenue} order7day={order7day} bill7day={bill7day} ChangeFilter={ChangeFilter} fillterDay={fillterDay}/>

                </Grid>
               <Grid item   lg={4}   md={6}   xl={3}   xs={12}>
                  <TrafficByDevice sx={{ height: '100%' }} totalRevenue={totalRevenue} totalCost={totalCost} totalProfit={totalProfit}/>
               </Grid>
               <Grid item   lg={4}   md={6}   xl={3}   xs={12}>
                  <h1>p12</h1>
               </Grid>
               <Grid item   lg={8}   md={12}  xl={9}  xs={12}>
                  <h1>dsadas</h1> 
               </Grid>
            </Grid>
            </Container>
         </Box>
      )
};

   
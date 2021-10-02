 
import { Box, Container, Grid } from '@material-ui/core';
import React,{useState ,useEffect} from 'react'; 
import attempt from '../../../api/loginAttemptApi';
import TimeLogin from '../components/ChartTime';
import TotalAccess from '../components/Access';
import TimeAnalyst from '../components/Analysts';
export default function UserTime(props){

   const [time ,setTime] = useState()
   useEffect(() => {
      ; (async () => {
         try {
            const response = await attempt.getTime()
            console.log("res:",response)
            setTime(response.data)
    
         } catch (error) {
            console.log(error.message)
         }
      })()
    }, [])
    
   console.log("time:",time)
  
    
   return(
         <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
            <Container maxWidth={false}>
            <Grid
               container
               spacing={2}
            >

               <Grid item   lg={3}   sm={6}   xl={3}   xs={12}>
                  <TimeAnalyst time ={time} title={"Tổng thời gian người dùng truy cập"} type={"total"}/>
               </Grid>
               <Grid item   lg={3}   sm={6}   xl={3}   xs={12}>
                  <TimeAnalyst time ={time} title={"Thời gian sử dụng mỗi lần truy cập"} type={"average"}/>
               </Grid>

               <Grid  item   xs={8}   >
                   
                   <TimeLogin time ={time}/> 
               </Grid>
               <Grid  item   xs={4 }  >
                  <Grid item  xs={12} >
                     <TotalAccess time ={time} title={"Tổng số lần truy cập"} type={"overview"}/>
                  </Grid>
                  <Grid item  xs={12}  >
                     <TotalAccess time ={time} title={"Tổng số lần truy cập trong ngày"} type={"day"}/>
                  </Grid>
                  <Grid item  xs={12}>
                     <TotalAccess time ={time} title={"Tổng số lần truy cập trong tuần"} type={"week"}/>
                  </Grid>
                  <Grid item  xs={12}>
                     <TotalAccess time ={time} title={"Tổng số lần truy cập trong tháng"} type={"month"}/>
                  </Grid>
               </Grid>
            </Grid>
            </Container>
         </Box>
      )
};

   
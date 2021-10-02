 
import { Box, Container, Grid } from '@material-ui/core';
import React,{useState ,useEffect} from 'react'; 
import productApi from '../../../api/productApi';
import TableProduct from '../components/SoldProduct';
import TrafficByDevice from '../components/TraffucByDevice';
import MediaControlCard from '../components/ChartPopular';
export default function AnalysisPopulas(props){

   const [products, setProducts] = useState([])
   useEffect(() => {
      ; (async () => {
          try {
              const response = await productApi.getAll()
              setProducts(response.data.results)
          } catch (error) {
              console.log(error.message)
          }
      })()
  }, [])
  
   return(
         <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}
         >
            <Container maxWidth={false}>
            <Grid
               container
               spacing={3}
            >
               <Grid item   lg={7}   md={12}  xl={9}  xs={12}>
                  <TableProduct product = {products}/>
               </Grid>
               <Grid item   lg={5}   md={6}   xl={3}   xs={12}>
                  <TrafficByDevice products = {products}/>
               </Grid>
               <Grid item  xs={12}>
                  <MediaControlCard product = {products}/>
               </Grid>
                
            
            </Grid>
            </Container>
         </Box>
      )
};

   
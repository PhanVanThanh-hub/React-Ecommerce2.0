import  React,{useState , useEffect} from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  Grid,
} from '@material-ui/core';
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey
} from "@material-ui/core/colors";
import {  Line} from 'react-chartjs-2';
import {addPopularProduct} from '../PopularSlice';
import CheckboxesGroup from './ChooseProductChart';
import orderApi from '../../../api/orderProduct'
import ProductPerMonth from './analystMonth';
import { useDispatch ,useSelector} from 'react-redux';
import {cartItemsSelector} from '../PopularSelector';


export default function MediaControlCard(props) {
  const {product} = props
  const dispatch = useDispatch();
  var d = new Date();
  var month = new Array();month[0] = "January";month[1] = "February";month[2] = "March";month[3] = "April";month[4] = "May";month[5] = "June";month[6] = "July";month[7] = "August";month[8] = "September";month[9] = "October";month[10] = "November";month[11] = "December";
  var data=[]
  data = {
    datasets: [
      ],

    labels: month
  };
  const [title ,setTitle]= useState()
  const [sold , setSold] = useState([])
  const [bool , setBool] = useState([])
  const [name , setName] = useState()
  const products =  useSelector(cartItemsSelector)
  const hueArray = [
    red,
    pink,
    purple,
    deepPurple,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    deepOrange,
    brown,
    grey,
    blueGrey
  ];
  var rand=0
  products.map((item)=>{
    rand+=1
    data["datasets"].push({
      borderColor:  hueArray[rand][500],
      backgroundColor: hueArray[rand][500],
      barPercentage: 0.5,
      barThickness: 12,
      borderRadius: 4,
      categoryPercentage: 0.5,
      data: item.sold,
      label: item.name,
      maxBarThickness: 10,
       
      
    })
  }
    )
  useEffect(() => {
    ; (async () => {
        try {
            const response = await orderApi.getProductPopular({ product: title })
            const sold =ProductPerMonth.soldMonth(response.data)
            setSold(sold)
            const action = addPopularProduct({
              sold: sold,
              title: title,
              name:name
          })
          dispatch(action)
        } catch (error) {
            console.log(error.message)
        }
    })()
  }, [bool,title])

  

  
  const changeChart =(value,bool,name)=>{
    setName(name)
    setTitle(value)
    setBool(bool)
  }
  return (
    <Card   >
      <CardHeader title="Latest Sales"/>
        <Grid container   >
          <Grid item xs={8}   > 
            <Divider />
              <CardContent  >
                <Box sx={{height: 400, position: 'relative' }}>    
                      <Line data={data} />
                </Box>
    
              </CardContent>
            <Divider />
          </Grid>
          <Grid item xs={4}  > 
            <Box sx={{ display: 'flex' }}>
              <CheckboxesGroup product={product} changeChart={changeChart}/>
            </Box>
          </Grid>
        </Grid>
    </Card>
  );
}





 


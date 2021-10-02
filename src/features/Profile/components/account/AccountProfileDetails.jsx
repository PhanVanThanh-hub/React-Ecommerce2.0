import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
export default function AccountProfileDetails(props) {

  const {profile ,changeProfile} = props
  const user = JSON.parse(profile)
 
  const values =({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    phone:user.phone_number ,
    
  });
  //, formState:{  }
  const { register, handleSubmit  } = useForm();
  const onSubmit =(data) => 
    {
      if(data.firstName!== values.firstName || data.lastName!==values.lastName || data.email!==values.email || data.phone!==values.phone ){
        const value={
          data:data,
          username:user.username
        }
        changeProfile(value)
      }
      else{
        console.log("nochange")
      }
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile"/>
        <Divider />
      
        <CardContent>
          <Grid
            container
            spacing={3}
          >
           <Grid item md={6} xs={12}>
              <TextField
                fullWidth label="First name"  {...register("firstName")} name="firstName" required defaultValue={values.firstName} variant="outlined"/>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Last name"  {...register("lastName")}  name="lastName" required defaultValue={values.lastName} variant="outlined"/>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Email Address"   {...register("email")}  name="email" required defaultValue={values.email} variant="outlined"/>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth label="Phone Number"   {...register("phone")} name="phone" type="number" defaultValue={values.phone} variant="outlined"/>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2}}>
          <Button type="submit" color="primary" variant="contained" >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
}
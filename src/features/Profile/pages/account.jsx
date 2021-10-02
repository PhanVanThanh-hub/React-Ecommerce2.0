import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import React from 'react';
import { changeProfileApi } from '../ProfileSlice';
 
import { useDispatch } from 'react-redux';
function Profile(props){
  const {profile} = props;
  const dispatch = useDispatch();
   
  
  const changeProfile = async (values) => {
    try {
        console.log("valuse:",values)
        const actions = changeProfileApi(values)
        await dispatch(actions)
    } catch (error) {
        
    }
   
}
  return(
    <>
      <Helmet>
        <title>Account | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile profile={profile}/>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails changeProfile={changeProfile} profile={profile}/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
 

export default Profile;
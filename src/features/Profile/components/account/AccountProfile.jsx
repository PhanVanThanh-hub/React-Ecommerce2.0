 
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import React from 'react';
 

function AccountProfile(props){
  const {profile } = props
  const user = JSON.parse(profile)
  console.log("profile:",user)
  return(
    <div>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              // src={user.avatar}
              sx={{
                height: 100,
                width: 100
              }}
            />
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h3"
            >
              {user.last_name +" "+ user.first_name}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
          >
            Upload picture
          </Button>
        </CardActions>
      </Card>
    </div>
  )
};

export default AccountProfile;
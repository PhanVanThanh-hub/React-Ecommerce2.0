import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UpdataProduct from "../pageAdmin/updataProduct/index";
import AddProduct from "../pageAdmin/AddProduct/index";
import ListCustomer from "../pageAdmin/Customer/index";
import Renvenue from "../pageAdmin/Revenue/index";
import TimeDate from "./TimeDate/index";
import Popular from "../pageAdmin/Popular/index";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function DashboardAdmin() {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="AddProduct" {...a11yProps(0)} />
        <Tab label="UpdataProduct" {...a11yProps(1)} />
        <Tab label="Customer" {...a11yProps(2)} />
        <Tab label="Dashboard" {...a11yProps(3)} />
        <Tab label="Popular" {...a11yProps(3)} />
        <Tab label="TimeData" {...a11yProps(4)} />
         
      </Tabs>
      <TabPanel value={value}   index={0}>
        <AddProduct  />
      </TabPanel>
      <TabPanel value={value}   index={1}>
        <UpdataProduct  />
      </TabPanel> 
      <TabPanel value={value}   index={2}>
        <ListCustomer  />
      </TabPanel>
      <TabPanel value={value}   index={3}>
        <Renvenue  />
      </TabPanel>
      <TabPanel value={value}   index={4}>
        <Popular  />
      </TabPanel>
      <TabPanel value={value}   index={5}>
        <TimeDate  />
      </TabPanel>
       
    </div>
  );
}

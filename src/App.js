import 'antd/dist/antd.css';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import FooterComponent from './components/Footer';
import HeaderComponent from './components/Header';
import ScrollToTop from './constants/ScrollToTop';
import AuthFeature from './features/Auth';
import CartFeature from './features/Cart';
import HomePageFeature from './features/HomePage';
import ProductFeature from './features/Product';
import {  useSelector } from 'react-redux';
 
import React, { useState , useEffect } from 'react';
import ProfileFeature from './features/Profile/index.jsx'
import DashboardAdmin from './pageAdmin/index.jsx'
 

function App() {
 
  
  const loginInAdmin = useSelector(state => state.auth.accuracy)
  var x= true
  if (loginInAdmin!=='"Is admin"'){
    x=false
  }
  const [isAdmin , setIsAdmin] = useState(x)

  useEffect(() => {
    if (loginInAdmin==='"Is admin"'){
      setIsAdmin(!!loginInAdmin)
    }
    else{
      if (loginInAdmin==='"not admin"'){
        setIsAdmin(false)
      }
    }
  
  },[loginInAdmin]);

  return (
    <div className="App">
      <HeaderComponent />
      {/* {isAdmin &&(
        <TabAdmin/>
      )} */}
      <ScrollToTop>
        { !isAdmin &&(
          <Switch>
            <Route path="/products">
              <ProductFeature />
            </Route>
            <Route path="/carts">
              <CartFeature />
            </Route>
            <Route path="/auth">
              <AuthFeature />
            </Route>
            <Route path="/" exact>
              <HomePageFeature />
            </Route>
            <Route path="/profile" exact>
              <ProfileFeature />
            </Route> 
             
          </Switch>
          )
        }
        { isAdmin &&(
          <Switch>
            <Route path="/" exact>
              <DashboardAdmin/>
            </Route>
 
          </Switch>
           
        )
        }
         
      </ScrollToTop>
      { !isAdmin &&(
          <FooterComponent />
           
        )
        }
       
    </div>
  );
}

export default App;

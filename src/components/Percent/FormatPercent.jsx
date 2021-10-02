import {ArrowDownOutlined ,ArrowUpOutlined ,MinusOutlined  } from '@ant-design/icons';
import React from 'react';
import {
 
    colors,
  } from '@material-ui/core';
function FormatPercent(props){
    const {percent} = props
   
    if(percent<0){
        
        return <div style={{color:colors.red[800],fontWeight: "bold"}}><ArrowDownOutlined />{percent}%</div>
    }else if(percent>0){
   
        return <div style={{color:colors.green[800],fontWeight: "bold"}} ><ArrowUpOutlined />{percent}%</div>
    }
    else{
         
        return <div style={{color:colors.orange[800],fontWeight: "bold"}} ><MinusOutlined />{percent}%</div>
    }

}
export default FormatPercent;
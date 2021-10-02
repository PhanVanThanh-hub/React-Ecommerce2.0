import { createAsyncThunk  } from '@reduxjs/toolkit'
import updataApi from '../../api/updataProduct';

export const postUpdataProduct = createAsyncThunk(
    'updataProduct',
    async (payload) => {
        try{
            console.log("payload:",payload)
            const response = await updataApi.updataProduct(payload);
            console.log("response:",response)
            return true
        }
        catch(error){
            return false
        }
        
         
        
    }
)
 


 
 
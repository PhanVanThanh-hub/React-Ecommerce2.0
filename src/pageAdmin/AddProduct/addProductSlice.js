import { createAsyncThunk  } from '@reduxjs/toolkit'
import addApi from '../../api/addProduct';

export const postProduct = createAsyncThunk(
    'addProduct',
    async (payload) => {
        try{
            await addApi.addProduct(payload);
            return true
        }
        catch(error){
            return false
        }
        
         
        
    }
)
 


 
 
import { createSlice } from '@reduxjs/toolkit'
import StorageKeys from '../../constants/storage-keys';
 
 


export const PopularSlice = createSlice({
    name: 'popular',
    initialState: {
        showMiniCart: false,
        productItems: JSON.parse(sessionStorage.getItem(StorageKeys.popular)) || [],
    },
    reducers: {
        
        addPopularProduct(state, action) {
            //newItem ={id, product, quantity}
            const newItem = action.payload;

            const sold = state.productItems
            const index = state.productItems.findIndex(item => (item.title === newItem.title));
            
            if(index>=0){
               delete sold[index]
             
               state.productItems = sold.filter((item) => item)
               sessionStorage.setItem(StorageKeys.popular, JSON.stringify(state.productItems))
            }
            else{
               state.productItems.push(newItem);
            
               sessionStorage.setItem(StorageKeys.popular, JSON.stringify(state.productItems))
            }
             
        },
    },
})

const { actions, reducer } = PopularSlice
export const {  addPopularProduct } = actions
export default reducer
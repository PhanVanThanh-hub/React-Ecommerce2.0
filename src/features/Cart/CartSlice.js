import { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import StorageKeys from '../../constants/storage-keys';
import cartApi from '../../api/cartApi';

export const cartData = createAsyncThunk(
    'cart',
    async (payload) => {
      
        console.log("payload:",payload)
        const response = await cartApi.cart(payload);
        console.log(response)
        
        return true
        
    }
)
 


export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: JSON.parse(localStorage.getItem(StorageKeys.cart)) || [],
    },
    reducers: {
        showMiniCart(state) {
            state.showMiniCart = true;
        },
        hideMiniCart(state) {
            state.showMiniCart = false;
        },
        addToCart(state, action) {
            //newItem ={id, product, quantity}
            const newItem = action.payload;
           
             
            const index = state.cartItems.findIndex(item => (item.id === newItem.id && item.size === newItem.size));
            if (index >= 0) {
                state.cartItems[index].quantity += newItem.quantity;
            } else {
                state.cartItems.push(newItem);
            }
            localStorage.setItem(StorageKeys.cart, JSON.stringify(state.cartItems))
        },
        setQuantity(state, action) {
            const { id, quantity, size } = action.payload;
            const index = state.cartItems.findIndex(item => (item.id === id && item.size === size));
            if (index >= 0) {
                state.cartItems[index].quantity = quantity;
            }
            localStorage.setItem(StorageKeys.cart, JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            const {id, size} = action.payload;
            const newCartItems = state.cartItems
            const index = newCartItems.findIndex((item) => (item.id === id && item.size === size))
            console.log(index)
            delete newCartItems[index]
            state.cartItems = newCartItems.filter((item) => item)
            localStorage.setItem(StorageKeys.cart, JSON.stringify(state.cartItems))
        },
        resetCart(state){
            const newCartItems = state.cartItems
            const index = Object.values(newCartItems).length
            for (let i=0;i<index;i++){
                delete newCartItems[i]
            }
            localStorage.removeItem(StorageKeys.cart)
        }
    },
})

const { actions, reducer } = CartSlice
export const { showMiniCart, hideMiniCart, addToCart, setQuantity, removeFromCart ,resetCart} = actions
export default reducer
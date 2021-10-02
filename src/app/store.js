import cartReducer from '../features/Cart/CartSlice'
import authReducer from '../features/Auth/AuthSlice'
import profileSlice from '../features/Profile/ProfileSlice'
import popularSlice from '../pageAdmin/Popular/PopularSlice'
const { configureStore } = require("@reduxjs/toolkit");


const rootReducer = {
    auth: authReducer,
    cart: cartReducer,
    profile :profileSlice,
    popular :popularSlice,
}

const store = configureStore({
    reducer: rootReducer,
})

export default store 
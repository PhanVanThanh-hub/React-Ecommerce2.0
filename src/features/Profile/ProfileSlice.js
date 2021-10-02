import { createAsyncThunk ,createSlice} from '@reduxjs/toolkit';
import authApi from '../../api/authApi';
import Swal from 'sweetalert2';
import StorageKeys from '../../constants/storage-keys';
export const changeProfileApi = createAsyncThunk(
   'changeProfile',
   async (payload) => {
      try {
             
         
          
            
         const responseProfile1 = await authApi.changeProfile(payload)
         const username = JSON.parse(responseProfile1.config.data).data.username
         

         const responseUser = await authApi.getUser({ username: username })
         const user = {...responseUser.data[0]}
            
         const responseProfile = await authApi.getProfile(user)
           
         const profile = {...responseProfile.data.user}
            
         const data = {
                ...user,
                ...profile,
                 
            }
         console.log("data:",data)
         localStorage.setItem(StorageKeys.user, JSON.stringify(data));
         Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đã thay đổi thông tin',
            showConfirmButton: false,
            timer: 1500
          })
         return data
         
      } catch (error) {
      
         return error.message;
      }
   }
)

const profileSlice = createSlice({
   name: 'profile',
   initialState: {
      current: JSON.parse(localStorage.getItem(StorageKeys.user)) || {},
      settings: {},
   },
   reducers: {
       
   },
   extraReducers: {
       //'user/register/fulfilled': () => {}
       [changeProfileApi.fulfilled]: (state, action) => {
          
         state.current = action.payload;
           
       },
       
   }
})

const {  reducer } = profileSlice
export default reducer
 

 
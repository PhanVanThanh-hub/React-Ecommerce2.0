import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storage-keys";
const cartApi = {
   
   async cart(data) {
    
      const user = localStorage.getItem(StorageKeys.user)
      const newParams = { ...data,}
      const newUser=JSON.parse(user).username                     
      
      const accessToken = localStorage.getItem(StorageKeys.access)

      const response = await axiosClient.post(`/cart/`, {
         params: {   products:newParams.values,
                     newUser:newUser,
                     location:newParams.location,
         },
         headers: {
            Authorization: `Bearer ${accessToken}`
        }
     })
     return response
   },
   
    
}

export default cartApi
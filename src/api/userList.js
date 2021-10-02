import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storage-keys";
const userApi = {
   
    getAll() {
        const accessToken = localStorage.getItem(StorageKeys.access)
        const url = 'listUser/';     
        const user= axiosClient.get(url,{

            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return  user
    },
    totalOrder(data) {
        const accessToken = localStorage.getItem(StorageKeys.access)
        const url = 'orderPerUser/';  
        console.log("data:",data)   
        const services= axiosClient.post(url,{
            data: data,
            headers: {
               Authorization: `Bearer ${accessToken}`
            }    
        });
        return  services
    },

    getProfile(){
        const accessToken = localStorage.getItem(StorageKeys.access)
        const url = 'listUser/';     
        const profile= axiosClient.get(url,{

            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return  profile;
    }

}
 
export default userApi
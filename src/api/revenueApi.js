import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storage-keys";
const revenueApi = {
   
    getRevenue(params) {
        const newParams = { ...params }
        const accessToken = localStorage.getItem(StorageKeys.access)
        const url = 'revenue/';     
        const user= axiosClient.get(url,{
            params: { ...newParams },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return  user
    },
   

}
 
export default revenueApi
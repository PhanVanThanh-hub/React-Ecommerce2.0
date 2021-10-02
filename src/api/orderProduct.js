import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storage-keys";
const orderApi = {
      getAll(data) {
                  const url = 'getOrder/';     
                  const services= axiosClient.post(url, {username:data});
                  return  services
      },
      getOrderProduct(data) {
            const url = 'orderProduct/';     
            const services= axiosClient.post(url, {transaction_id:data});
            return  services
      },
      async getOrderLast7Day(params){
            const accessToken = localStorage.getItem(StorageKeys.access)
            const newParams = { ...params }
            const  url =  'oredr7day/';
            const services=  await axiosClient.get(url,{
                  params: { ...newParams },
                  headers: {
                      Authorization: `Bearer ${accessToken}`
                  }
              });
           
            return  services
      },
      async getBillLast7Day(params){
            const accessToken = localStorage.getItem(StorageKeys.access)
            const newParams = { ...params }
            const  url =  'bill7day/';
             
            const services= axiosClient.get(url,{
                  params: { ...newParams },
                  headers: {
                      Authorization: `Bearer ${accessToken}`
                  }
              });
           
            return  services
      },
      async getProductPopular(params){
            const accessToken = localStorage.getItem(StorageKeys.access)
            const newParams = { ...params }
            const  url =  'productPopular/';
             
            const services= await axiosClient.get(url,{
                  params: { ...newParams },
                  headers: {
                      Authorization: `Bearer ${accessToken}`
                  }
              });
          
            return  services
      },

}
 
export default orderApi
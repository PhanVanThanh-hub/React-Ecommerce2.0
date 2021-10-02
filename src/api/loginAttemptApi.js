import axiosClient from "./axiosClient";
import StorageKeys from "../constants/storage-keys";
const attempt = {

      async getTime(){
            const accessToken = localStorage.getItem(StorageKeys.access)
           
            const  url =  'loginAttempt/';
            const services=  await axiosClient.get(url,{
                
                  headers: {
                      Authorization: `Bearer ${accessToken}`
                  }
              });
            console.log("srtivce:",services)
            return  services
      },


}
 
export default attempt
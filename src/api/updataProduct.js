
 
import axiosClient from "./axiosClient";

const updataApi = {
   updataProduct(data) {
      console.log("data:",data)
      const url = 'updataProduct/';
      return axiosClient.post(url, data);
   },
   
}

export default updataApi
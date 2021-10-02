
 
import axiosClient from "./axiosClient";

const addApi = {
   addProduct(data) {
      console.log("data:",data)
      const url = 'addProduct/';
      return axiosClient.post(url, data);
   },
   
}

export default addApi
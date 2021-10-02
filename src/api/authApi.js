
import StorageKeys from "../constants/storage-keys";
import axiosClient from "./axiosClient";

const authApi = {
    register(data) {
        const url = 'register/';
        return axiosClient.post(url, data);
    },
    checkAdmin(data){
        const url = 'decentralization/';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/api/token/';
        return axiosClient.post(url, data);
    },
    async logout() {
        const profile=localStorage.getItem(StorageKeys.user)
        const user = JSON.parse(profile)
        const accessToken = localStorage.getItem(StorageKeys.access)
         
         
        const  url =  'logout/';
         
        const services=  await axiosClient.post(url,{
            username:user.username,
            headers: {
                Authorization: `Bearer ${accessToken}`
                }
            });
       

        return  services
    },
    async getUser(params) {
        const newParams = { ...params }
        const accessToken = localStorage.getItem(StorageKeys.access)
        const url = `users/`;
        const response = await axiosClient.get(url, {
            params: { ...newParams },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }); 
        return response
    },
    async getProfile(params) {
        const data = { ...params }
      
        const accessToken = localStorage.getItem(StorageKeys.access)
        
        const response = await axiosClient.post(`/detail/`, {
            data: { ...data },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    },
    async changeProfile(params) {
        const newParams = { ...params }
      
        const accessToken = localStorage.getItem(StorageKeys.access)
        const response = await axiosClient.post(`/changeProfile/`, {
            data: { ...newParams },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response
    },
    
}

export default authApi
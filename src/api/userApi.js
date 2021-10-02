import StorageKeys from "../constants/storage-keys";
import axiosClient from "./axiosClient";

const userApi = {
    register(data) {
        const url = '/register/';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/api/token/';
        return axiosClient.post(url, data);
    },
    getUser(params) {
        const newParams = { ...params }
        const accessToken = localStorage.getItem(StorageKeys.TOKEN)
        const url = `users/`;
        const response = axiosClient.get(url, {
            params: { ...newParams },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response
    },
    getProfile(params) {
        const newParams = { ...params }
        const accessToken = localStorage.getItem(StorageKeys.TOKEN)
        const url = `profile/`;
        const response = axiosClient.get(url, {
            params: { ...newParams },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response
    },
}

export default userApi
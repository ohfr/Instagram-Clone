import axios from 'axios';

const api = () => {
    return axios.create({
        baseURL: "http://localhost:8000",
        headers: {
            authorization: getToken()
        }
    });
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export default api;
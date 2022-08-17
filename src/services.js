import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost/api/"
});

axiosInstance.interceptors.request.use(
    function(config) {
        const token = window.localStorage.token;
        if(token) {
            config.headers.Authorization = token
        }
        return  config;
    }
)

const axiosInstanceFile = axios.create({
    baseURL: "http://localhost/api/"
});

axiosInstanceFile.interceptors.request.use(
    function(config) {
        const token = window.localStorage.token;
        if(token) {
            config.headers.Authorization = token
        }
        return  config;
    }
)

export const api = {
    get(endpoint) {
        return axiosInstance.get(endpoint);
    },
    post(endpoint,body) {
        return axiosInstanceFile.post(endpoint,body,
        {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    put(endpoint,body) {
        return axiosInstance.put(endpoint,body);
    },
    delete(endpoint) {
        return axiosInstance.delete(endpoint);
    },
    login(body) {
        return axios.post("http://localhost/api/login",body);
    },
    validateToken() {
        return axios.post("/validate");
    }

};

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://9097-2a01-e0a-803-e070-a4cc-e3c2-a0c3-5810.ngrok-free.app"


const getToken = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error("Erreur lors de la récupération du token", error);
        return null;
    }
};

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;
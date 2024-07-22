import axios from 'axios';

export const gatewayApi = axios.create({
    baseURL:'http://localhost:3000/api'
});
import axios from 'axios';
import { baseURL } from '../ApiConfig';

const axiosInstance = axios.create({ baseURL });

export default axiosInstance;

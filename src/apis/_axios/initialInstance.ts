import axios from 'axios';
import { getToken, setToken, deleteToken } from '@utils/localStorage/token';

const initialInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default initialInstance;

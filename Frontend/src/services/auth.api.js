import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL   ||  "http://localhost:3000";


const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true 
})



export const register = async  ({name , email , password}) =>{
    const response = await api.post('/api/auth/register' , {name , email , password});
    return response.data
}


export const login  = async ({email , password}) =>{ 
    const response =  await api.post('/api/auth/login' , {email , password});
    return response.data
}

export const getMe = async () =>{ 
    const response = await api.get('/api/auth/get-me');
    return response.data
}


export const logout = async  () =>{ 
    const response = await api.post('/api/auth/logout');
    return response.data
}


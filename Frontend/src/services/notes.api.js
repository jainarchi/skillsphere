import axios from "axios";

const BASE_URL =  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";


const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true 
})


// create a new note manually or save ai summary

export const createNote = async ({ title, content, tech, isAI }) => { 
    const response = await api.post('/api/notes' , { title, content, tech, isAI } );
    console.log(response.data.message)
    return response.data
}


// get all saved notes

export const getMyNotes = async () =>{ 
    const response = await api.get('/api/notes');
    console.log(response.data.message)
    return response.data
}


// delete a note
export const deleteNote = async (id) =>{ 
    const response = await api.delete(`/api/notes/${id}`);
    console.log(response.data.message)
    return response.data
}
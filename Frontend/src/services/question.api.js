import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";


const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true 
})


// get random questions

export const getRandomQuestions = async ({technology , level , limit}) =>{ 
    const response = await api.get('/api/questions' , {params : {technology , level , limit}});
    // console.log(response.data.message)
    return response.data
}



// submit and create result 


export const createResult = async ({ title, technology, level, totalQuestions, correct, wrong }) =>{ 

    const response = await api.post('/api/results' , { title, technology, level, totalQuestions, correct, wrong });
    // console.log(response.data.message)
    return response.data
}


// get results of all previous assessments

export const listAllResults = async () =>{ 
    const response = await api.get(`/api/results`);
    // console.log(response.data.message)
    return response.data
}


//  give wrong ans for analysis and feedback

export const aiAnalyzeWrongAnswers = async (wrongAnsArr) =>{ 
    const response = await api.post('/api/ai/analyze/wrongans' , {wrongAnsArr});
    // console.log(response.data.message)
    return response.data
}
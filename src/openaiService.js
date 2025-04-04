import axios from 'axios';
import OpenAI from 'openai';

const API_KEY = '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';
const openai = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${API_KEY}`
    },
});

// const openai = new OpenAI({
//     apiKey: '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'
// })
export const getOpenAIResponse = async (prompt) => {
    const response = await openai.post('/chat/completions',{
        model : 'gpt-4o-mini',
        messages : prompt,        
    });
    return response.data;
};
// export const getOpenAIResponse = async (prompt) => {
//     const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         store: true,
//         messages: prompt,
//     });    
//     return response.data;
// }   

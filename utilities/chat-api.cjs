import sendRequest from "./send-request.cjs";

const BASE_URL = '/api/chat'

export function createChat(friendId){
    return sendRequest(`${BASE_URL}/createChat/${friendId}`,'POST') 
}
export function getChat(chatId){
    return sendRequest(`${BASE_URL}/${chatId}`) 
}
export function deleteChat(chatId){
    return sendRequest(`${BASE_URL}/${chatId}`, 'DELETE') 
}
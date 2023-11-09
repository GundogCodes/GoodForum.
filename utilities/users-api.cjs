import sendRequest from './send-request.cjs'

const BASE_URL = '/api/users'

export function signUp(userData) {
    console.log(userData)
    return sendRequest(`${BASE_URL}/new`, 'POST', userData)

}

export function login(credentials) {
    return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}

export function updateUserInfo(userId,newData){
    return sendRequest(`${BASE_URL}/${userId}`, 'PUT', newData)
}

export function getUsersPosts(){
    return sendRequest (`${BASE_URL}/posts`)
}

export function getUser(id){
    return sendRequest (`${BASE_URL}/${id}`)
    
}
export function addFriend(id){
    return sendRequest (`${BASE_URL}/${id}`)

}
export function removeFriend(id){
    return sendRequest (`${BASE_URL}/${id}`)

}
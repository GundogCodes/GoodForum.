import sendRequest from './send-request.cjs'

const BASE_URL = '/api/forum'

export function getAll(){
    return sendRequest(BASE_URL)
}

export function createForum(newForumBasics){ //forum basics are title,topic,description
    return sendRequest(`${BASE_URL}/new`, 'POST', newForumBasics)
}
export function updateForum(forumId,newForumInfo){
    return sendRequest(`${BASE_URL}/${forumId}`, 'PUT', newForumInfo)
}
export function addMember(forumId){
    return sendRequest(`${BASE_URL}/add/${forumId}`, 'PUT')
}
export function removeMember(forumId){
    return sendRequest(`${BASE_URL}/remove/${forumId}`, 'PUT')
}
export function postToForum(forumId, postData){
    return sendRequest(`${BASE_URL}/post/${forumId}`, 'PUT', postData)
}
export function getForum(forumId){
    return sendRequest(`${BASE_URL}/${forumId}`)
}
export function deleteAForum(forumId){
    return sendRequest(`${BASE_URL}/${forumId}`, 'DELETE')
}
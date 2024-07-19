import sendRequest from "./send-request.cjs";

const BASE_URL = "/api/post";

export function getPost(postId) {
  return sendRequest(`${BASE_URL}/${postId}`); //works
}
export function getAllUserPosts(userId) {
  return sendRequest(`${BASE_URL}/byuser/${userId}`); //works
}
export function makePost(postData) {
  return sendRequest(`${BASE_URL}}`, "POST", postData);
}
export function deletePost(postId) {
  return sendRequest(`${BASE_URL}/${postId}`, "DELETE");
}
export function editPost(postId) {
  return sendRequest(`${BASE_URL}/${postId}`, "PUT");
}
export function likePost(postId) {
  return sendRequest(`${BASE_URL}/like/${postId}`, "PUT");
}
export function unlikePost(postId) {
  return sendRequest(`${BASE_URL}/unlike/${postId}`, "PUT");
}
export function dislikePost(postId) {
  return sendRequest(`${BASE_URL}/dislike/${postId}`, "PUT");
}
export function undislikePost(postId) {
  return sendRequest(`${BASE_URL}/undislike/${postId}`, "PUT");
}
export function commentOnPost(commentText, postId) {
  return sendRequest(`${BASE_URL}/comment/${postId}`, "PUT", commentText);
}
export function allPosts() {
  return sendRequest(`${BASE_URL}`);
}

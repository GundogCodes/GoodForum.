import sendRequest from "./send-request.cjs";

const BASE_URL = "/api/message";

export function sendMessage(chatId, messageContent) {
  return sendRequest(`${BASE_URL}/${chatId}`, "POST", messageContent);
}

export function getMessages(chatId) {
  return sendRequest(`${BASE_URL}/${chatId}`);
}

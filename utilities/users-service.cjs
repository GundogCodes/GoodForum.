import * as usersAPI from "./users-api.cjs";
function base64urlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  return atob(str);
}

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("token", token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem("token", token);
  return getUser();
}

export function getToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = JSON.parse(base64urlDecode(token.split(".")[1]));

    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
      return null;
    }

    return token;
  } catch (error) {
    console.error("Error decoding token payload:", error);
    return null;
  }
}

// export function getToken() {
//   const token = localStorage.getItem("token");
//   if (!token) return null;
//   const payload = JSON.parse(atob(token.split(".")[1]));
//   if (payload.exp < Date.now() / 1000) {
//     localStorage.removeItem("token");
//     return null;
//   }
//   return token;
// }

export async function getUser() {
  const token = getToken();
  return token ? JSON.parse(base64urlDecode(token.split(".")[1])).user : null;
}

export function logOut() {
  localStorage.removeItem("token");
}

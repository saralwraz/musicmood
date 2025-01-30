import { request } from "./api";

const signup = (data) => {
  return request(`signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const logIn = (data) => {
  return request(`signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const getUserProfile = (token) => {
  return request(`users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const authorize = (email, password) => {
  return new Promise((resolve) => {
    resolve({ token: "fake-auth-token-123" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        _id: "65f73a1b2c3d4e5f6g7h8i9j",
        name: "Demo User",
        email: "demo@example.com",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png",
      },
    });
  });
};

export const register = (name, email, password) => {
  return new Promise((resolve) => {
    resolve({
      data: {
        _id: "65f73a1b2c3d4e5f6g7h8i9j",
        name,
        email,
      },
    });
  });
};

export { signup, logIn, getUserProfile };

import { request } from "./api";

const signup = (userData) => {
  // Store user data in localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if email already exists
  if (users.some((user) => user.email === userData.email)) {
    return Promise.reject(new Error("Email already exists"));
  }

  const newUser = {
    id: Date.now().toString(),
    ...userData,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return Promise.resolve(newUser);
};

const logIn = ({ email, password }) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return Promise.reject(new Error("Invalid email or password"));
  }

  const token = `fake-token-${Date.now()}`;
  localStorage.setItem("jwt", token);
  return Promise.resolve({ token, user });
};

const getUserProfile = () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return Promise.reject(new Error("No token found"));
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const currentUser = users.find((user) => `fake-token-${user.id}` === token);

  if (!currentUser) {
    return Promise.reject(new Error("User not found"));
  }

  return Promise.resolve(currentUser);
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

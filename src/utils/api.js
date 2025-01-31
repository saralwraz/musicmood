import { SPOTIFY_CONFIG } from "./config";

const baseUrl = "http://localhost:3000";

// Add checkResponse function directly in api.js
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

let accessToken = null;
let tokenExpirationTime = null;

const getAccessToken = async () => {
  try {
    if (
      accessToken &&
      tokenExpirationTime &&
      Date.now() < tokenExpirationTime
    ) {
      return accessToken;
    }

    const authString = btoa(
      `${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`
    );

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${authString}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Spotify API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(
        `HTTP error! status: ${response.status}, details: ${errorData}`
      );
    }

    const data = await response.json();
    accessToken = data.access_token;
    tokenExpirationTime = Date.now() + (data.expires_in - 60) * 1000;
    return accessToken;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

// Ensure valid token
const ensureToken = async () => {
  if (!accessToken) {
    await getAccessToken();
  }
  return accessToken;
};

// Add error handling wrapper for API calls
const handleApiCall = async (apiCall) => {
  try {
    const token = await ensureToken();
    const response = await apiCall(token);

    if (response.status === 429) {
      // Rate limit exceeded
      const retryAfter = response.headers.get("Retry-After");
      throw new Error(
        `Rate limit exceeded. Try again in ${retryAfter} seconds`
      );
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};

// Search for tracks
export const searchSpotifyTracks = async (query) => {
  return handleApiCall(async (token) =>
    fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  ).then((data) => data.tracks.items);
};

// Get track details
export const getTrackDetails = async (trackId) => {
  try {
    const token = await ensureToken();
    const response = await fetch(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get track details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting track details:", error);
    throw error;
  }
};

// Get several tracks at once
export const getSeveralTracks = async (trackIds) => {
  try {
    const token = await ensureToken();
    const response = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${trackIds.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get tracks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error getting tracks:", error);
    throw error;
  }
};

// Like/Save a track
export const likeSong = async (trackId) => {
  try {
    const response = await fetch("/api/spotify/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ trackId }),
    });

    if (!response.ok) {
      throw new Error("Failed to like track");
    }
    return await response.json();
  } catch (error) {
    console.error("Error liking track:", error);
    throw error;
  }
};

// Unlike/Remove a saved track
export const unlikeSong = async (trackId) => {
  try {
    const response = await fetch("/api/spotify/unlike", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ trackId }),
    });

    if (!response.ok) {
      throw new Error("Failed to unlike track");
    }
    return await response.json();
  } catch (error) {
    console.error("Error unliking track:", error);
    throw error;
  }
};

export const getUserLikedSongs = async () => {
  try {
    const response = await fetch("/api/spotify/liked-songs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch liked songs");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    throw error;
  }
};

// Mock user for getUserProfile
const MOCK_USER = {
  _id: "679680494e6a3af61b0783f4",
  name: "Demo User",
  email: "demo@example.com",
  avatar:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png",
};

export const signup = (userData) => {
  // Create the new user object
  const newUser = {
    _id: `user-${Date.now()}`, // Generate a unique ID
    name: userData.name,
    email: userData.email,
    avatar: userData.avatar,
  };

  // Store the new user in localStorage immediately
  localStorage.setItem("user", JSON.stringify(newUser));

  return Promise.resolve({
    message: "Success",
    user: newUser,
    token: "fake-auth-token-123",
  });
};

export const logIn = ({ email, password }) => {
  // Try to get stored user data
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // Only use MOCK_USER if no stored user exists AND it's the demo email
  if (!storedUser && email === "demo@example.com") {
    return Promise.resolve({
      token: "fake-auth-token-123",
      user: MOCK_USER,
    });
  }

  // Use stored user data from signup
  return Promise.resolve({
    token: "fake-auth-token-123",
    user: storedUser,
  });
};

export const getUserProfile = (token) => {
  // Get the stored user data if it exists, otherwise use demo user
  const storedUser = JSON.parse(localStorage.getItem("user")) || MOCK_USER;

  return new Promise((resolve) => {
    resolve(storedUser);
  });
};

//Edit profile
export const editUserProfile = (userData) => {
  // Update local storage with new user data
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const updatedUser = {
    ...currentUser,
    name: userData.name,
    avatar: userData.avatar,
  };
  localStorage.setItem("user", JSON.stringify(updatedUser));

  // For demo/mock purposes, return a promise that resolves with the updated user
  return Promise.resolve(updatedUser);
};

import { SPOTIFY_CONFIG } from "./config";

let accessToken = null;

const getAccessToken = async () => {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(
          `${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`
        )}`,
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    accessToken = data.access_token;
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

// Search for tracks
export const searchSpotifyTracks = async (query) => {
  try {
    const token = await ensureToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search tracks");
    }
    const data = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.error("Error searching tracks:", error);
    throw error;
  }
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
  avatar: "https://placekitten.com/100/100",
};

export const logIn = ({ email, password }) => {
  return new Promise((resolve) => {
    resolve({ token: "fake-auth-token-123" });
  });
};

export const signup = (userData) => {
  return new Promise((resolve) => {
    resolve({
      message: "Success",
      user: {
        _id: "65f73a1b2c3d4e5f6g7h8i9j",
        name: userData.name,
        email: userData.email,
      },
    });
  });
};

export const getUserProfile = (token) => {
  return new Promise((resolve) => {
    resolve(MOCK_USER);
  });
};

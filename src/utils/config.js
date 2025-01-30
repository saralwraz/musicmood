const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("Missing Spotify credentials:", {
    clientId: !!clientId,
    clientSecret: !!clientSecret,
  });
}

export const SPOTIFY_CONFIG = {
  CLIENT_ID: clientId,
  CLIENT_SECRET: clientSecret,
  REDIRECT_URI: "http://localhost:3000/callback",
  AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
  TOKEN_ENDPOINT: "https://accounts.spotify.com/api/token",
  RESPONSE_TYPE: "code",
  SCOPES: [
    "user-read-private",
    "user-read-email",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-library-modify",
    "user-library-read",
  ].join(" "),
};

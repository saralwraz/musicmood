export const SPOTIFY_CONFIG = {
  CLIENT_ID: "daf74b0386444b0cac1678097d227fa1",
  CLIENT_SECRET: "313582fab63645519f338d2e0513dbaf",
  REDIRECT_URI: "http://localhost:5173/callback",
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

import { createContext, useState, useEffect } from "react";

export const LikedSongsContext = createContext({
  likedSongs: [],
  toggleLike: () => {},
  isLoading: false,
  error: null,
});

export function LikedSongsProvider({ children }) {
  const [likedSongs, setLikedSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedSongs = localStorage.getItem("likedSongs");
    if (savedSongs) {
      setLikedSongs(JSON.parse(savedSongs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleLike = async (track) => {
    try {
      setIsLoading(true);
      setError(null);

      setLikedSongs((prev) => {
        const exists = prev.some((song) => song.id === track.id);
        if (exists) {
          return prev.filter((song) => song.id !== track.id);
        } else {
          return [...prev, track];
        }
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LikedSongsContext.Provider
      value={{ likedSongs, toggleLike, isLoading, error }}
    >
      {children}
    </LikedSongsContext.Provider>
  );
}

import { createContext, useState, useEffect } from "react";

export const LikedSongsContext = createContext({
  likedSongs: [],
  toggleLike: () => {},
});

export function LikedSongsProvider({ children }) {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const savedSongs = localStorage.getItem("likedSongs");
    if (savedSongs) {
      setLikedSongs(JSON.parse(savedSongs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
  }, [likedSongs]);

  const toggleLike = (track) => {
    setLikedSongs((prev) => {
      const exists = prev.some((song) => song.id === track.id);
      if (exists) {
        return prev.filter((song) => song.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  };

  return (
    <LikedSongsContext.Provider value={{ likedSongs, toggleLike }}>
      {children}
    </LikedSongsContext.Provider>
  );
}

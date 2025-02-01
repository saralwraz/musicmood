import { createContext, useState, useEffect } from "react";

export const LikedSongsContext = createContext();

export const LikedSongsProvider = ({ children, isLoggedIn }) => {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      const savedLikes = localStorage.getItem("likedSongs");
      if (savedLikes) {
        setLikedSongs(JSON.parse(savedLikes));
      }
    } else {
      setLikedSongs([]);
    }
  }, [isLoggedIn]);

  const toggleLike = (song) => {
    if (!isLoggedIn) return;

    setLikedSongs((prevLikedSongs) => {
      const isLiked = prevLikedSongs.some(
        (likedSong) => likedSong.id === song.id
      );
      const newLikedSongs = isLiked
        ? prevLikedSongs.filter((likedSong) => likedSong.id !== song.id)
        : [...prevLikedSongs, song];

      localStorage.setItem("likedSongs", JSON.stringify(newLikedSongs));
      return newLikedSongs;
    });
  };

  return (
    <LikedSongsContext.Provider value={{ likedSongs, toggleLike }}>
      {children}
    </LikedSongsContext.Provider>
  );
};

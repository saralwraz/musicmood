import "./LikedSongs.css";
import { useState, useEffect } from "react";
// Import your API utilities for fetching liked songs

function LikedSongs({ userId }) {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    // Fetch liked songs for the user
    // Update this with your actual API call
    const fetchLikedSongs = async () => {
      try {
        // const response = await getLikedSongs(userId);
        // setLikedSongs(response.data);
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    fetchLikedSongs();
  }, [userId]);

  return (
    <div className="liked-songs">
      {likedSongs.length === 0 ? (
        <p>no liked songs yet</p>
      ) : (
        <div className="liked-songs__grid">
          {likedSongs.map((song) => (
            <div key={song.id} className="liked-songs__card">
              <div className="liked-songs__image-container">
                <img
                  src={song.albumCover}
                  alt={song.title}
                  className="liked-songs__image"
                />
              </div>
              <div className="liked-songs__info">
                <div className="liked-songs__text-content">
                  <h3 className="liked-songs__track-name">{song.title}</h3>
                  <p className="liked-songs__artist">{song.artist}</p>
                  <p className="liked-songs__album">{song.album}</p>
                </div>
                <button className="liked-songs__unlike-button">
                  <img
                    src="/path-to-your-unlike-icon.svg"
                    alt="Unlike"
                    className="liked-songs__unlike-icon"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedSongs;

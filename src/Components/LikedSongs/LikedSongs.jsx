import "./LikedSongs.css";
import { useContext } from "react";
import { LikedSongsContext } from "../../contexts/LikedSongsContext";
import headphonesLiked from "../../assets/headphones_liked.png";

function LikedSongs() {
  const { likedSongs, toggleLike } = useContext(LikedSongsContext);

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
                  src={song.album.images[0]?.url}
                  alt={song.name}
                  className="liked-songs__image"
                />
              </div>
              <div className="liked-songs__info">
                <div className="liked-songs__text-content">
                  <h3 className="liked-songs__track-name">{song.name}</h3>
                  <p className="liked-songs__artist">
                    {song.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  <p className="liked-songs__album">{song.album.name}</p>
                </div>
                <button
                  className="liked-songs__unlike-button"
                  onClick={() => toggleLike(song)}
                >
                  <img
                    src={headphonesLiked}
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

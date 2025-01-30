import "./SearchResults.css";
import { useContext } from "react";
import { LikedSongsContext } from "../../contexts/LikedSongsContext";
import headphonesLiked from "../../assets/headphones_liked.png";
import headphonesUnliked from "../../assets/headphones_unliked.png";

function SearchResults({ tracks }) {
  const { likedSongs, toggleLike } = useContext(LikedSongsContext);

  return (
    <div className="search-results">
      <h2 className="search-results__title">your matches</h2>
      <div className="search-results__grid">
        {tracks.slice(0, 6).map((track) => (
          <div key={track.id} className="search-results__card">
            <div className="search-results__image-container">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="search-results__image"
              />
            </div>
            <div className="search-results__info">
              <div className="search-results__text-content">
                <h3 className="search-results__track-name">{track.name}</h3>
                <p className="search-results__artist">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
                <p className="search-results__album">{track.album.name}</p>
              </div>
              <button
                className="search-results__like-button"
                onClick={() => toggleLike(track)}
              >
                <img
                  src={
                    likedSongs.some((song) => song.id === track.id)
                      ? headphonesLiked
                      : headphonesUnliked
                  }
                  alt={
                    likedSongs.some((song) => song.id === track.id)
                      ? "Unlike"
                      : "Like"
                  }
                  className="search-results__like-icon"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

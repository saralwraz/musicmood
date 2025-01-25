import "./SearchResults.css";
import { useState } from "react";

function SearchResults({ tracks }) {
  const [likedTracks, setLikedTracks] = useState(new Set());

  const toggleLike = (trackId) => {
    setLikedTracks((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(trackId)) {
        newLiked.delete(trackId);
      } else {
        newLiked.add(trackId);
      }
      return newLiked;
    });
  };

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
                onClick={() => toggleLike(track.id)}
              >
                <img
                  src={
                    likedTracks.has(track.id)
                      ? "/headphones_unliked.png"
                      : "/headphones_liked.png"
                  }
                  alt={likedTracks.has(track.id) ? "Unlike" : "Like"}
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

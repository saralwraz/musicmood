import "./SearchResults.css";
import { useContext, useState } from "react";
import { LikedSongsContext } from "../../contexts/LikedSongsContext";
import Preloader from "../Preloader/Preloader";
import headphonesLiked from "../../assets/headphones_liked.png";
import headphonesUnliked from "../../assets/headphones_unliked.png";

function SearchResults({ tracks, isLoading, error }) {
  const { likedSongs, toggleLike } = useContext(LikedSongsContext);
  const [visibleTracks, setVisibleTracks] = useState(3);
  const MAX_TRACKS = 9;

  const showMore = () => {
    setVisibleTracks((prev) => Math.min(prev + 3, MAX_TRACKS));
  };

  if (isLoading) {
    return <Preloader isLoading={true} />;
  }

  if (error) {
    return <Preloader error={error} />;
  }

  if (!tracks || tracks.length === 0) {
    return <Preloader isEmpty={true} />;
  }

  const displayedTracks = tracks.slice(0, Math.min(tracks.length, MAX_TRACKS));

  return (
    <div className="search-results">
      <h2 className="search-results__title">your matches</h2>
      <div className="search-results__grid">
        {displayedTracks.slice(0, visibleTracks).map((track) => (
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
      {visibleTracks < displayedTracks.length && (
        <button className="search-results__more-button" onClick={showMore}>
          Show more
        </button>
      )}
    </div>
  );
}

export default SearchResults;

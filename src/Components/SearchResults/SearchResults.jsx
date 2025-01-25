import "./SearchResults.css";

function SearchResults({ tracks }) {
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
              <h3 className="search-results__track-name">{track.name}</h3>
              <p className="search-results__artist">
                {track.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p className="search-results__album">{track.album.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;

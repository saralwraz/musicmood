import { useState, useContext } from "react";
import { searchSpotifyTracks } from "../../utils/api";
import moodSuggestions from "../Moods/Moods";
import { LikedSongsContext } from "../../contexts/LikedSongsContext";
import headphonesLiked from "../../assets/headphones_liked.png";
import headphonesUnliked from "../../assets/headphones_unliked.png";
import "./Header.css";

function Header() {
  const [randomTrack, setRandomTrack] = useState(null);
  const { likedSongs, toggleLike } = useContext(LikedSongsContext);

  const getRandomTrack = async () => {
    try {
      const randomMood =
        moodSuggestions[Math.floor(Math.random() * moodSuggestions.length)];
      const tracks = await searchSpotifyTracks(randomMood);
      const track = tracks[Math.floor(Math.random() * tracks.length)];
      setRandomTrack(track);
    } catch (error) {
      console.error("Error fetching random track:", error);
    }
  };

  return (
    <div className="header">
      <div className="header__content">
        <button className="header__random-button" onClick={getRandomTrack}>
          feeling random?
        </button>

        {randomTrack && (
          <div className="header__track-card">
            <img
              src={randomTrack.album.images[0]?.url}
              alt={randomTrack.name}
              className="header__album-art"
            />
            <div className="header__track-info">
              <h3 className="header__track-name">{randomTrack.name}</h3>
              <p className="header__artist">
                {randomTrack.artists.map((artist) => artist.name).join(", ")}
              </p>
            </div>
            <button
              className="header__like-button"
              onClick={() => toggleLike(randomTrack)}
            >
              <img
                src={
                  likedSongs.some((song) => song.id === randomTrack.id)
                    ? headphonesLiked
                    : headphonesUnliked
                }
                alt={
                  likedSongs.some((song) => song.id === randomTrack.id)
                    ? "Unlike"
                    : "Like"
                }
                className="header__like-icon"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

import React, { useState, useEffect } from "react";
import "./main.css";
import Moods from "../Moods/Moods";

function Main() {
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const MAX_KEYWORDS = 3;

  useEffect(() => {
    if (inputValue.trim()) {
      const filteredSuggestions = Moods.filter((mood) =>
        mood.toLowerCase().includes(inputValue.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (keywords.length < MAX_KEYWORDS) {
        setKeywords([...keywords, inputValue.trim()]);
        setInputValue("");
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (keywords.length < MAX_KEYWORDS) {
      setKeywords([...keywords, suggestion]);
      setInputValue("");
      setShowSuggestions(false);
    }
  };

  const handleDeleteKeyword = (indexToDelete) => {
    setKeywords(keywords.filter((_, index) => index !== indexToDelete));
  };

  const showInput = keywords.length < MAX_KEYWORDS;

  return (
    <main className="main">
      <h1 className="main__headline">
        music that fits your <span className="main__headline_mood">mood.</span>
      </h1>
      <h2 className="main__subheading">
        discover the perfect song for the moment
      </h2>
      <div className="main__input-container">
        <div className="main__input-row">
          <p className="main__text">I'm feeling</p>
          {showInput ? (
            <div className="main__input-wrapper">
              <input
                type="text"
                className="main__input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder={`add up to ${MAX_KEYWORDS} moods`}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="main__suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="main__suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="main__limit-message">maximum moods reached</p>
          )}
        </div>
        <div className="main__keywords-container">
          {keywords.map((keyword, index) => (
            <span key={index} className="main__keyword">
              {keyword}
              <button
                className="main__keyword-delete"
                onClick={() => handleDeleteKeyword(index)}
                aria-label="Delete keyword"
              />
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Main;

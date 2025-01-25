import React, { useState } from "react";
import "./main.css";

function Main() {
  const [keywords, setKeywords] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <main className="main">
      <h1 className="main__headline">
        music that fits your <span className="main__headline_mood">mood.</span>
      </h1>
      <h2 className="main__subheading">
        discover the perfect song for the moment
      </h2>
      <div className="main__input-container">
        <p className="main__text">I'm feeling</p>
        <input
          type="text"
          className="main__input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Enter keywords..."
        />
      </div>
      <div className="main__keywords">
        {keywords.map((keyword, index) => (
          <span key={index} className="main__keyword">
            {keyword}
          </span>
        ))}
      </div>
    </main>
  );
}

export default Main;

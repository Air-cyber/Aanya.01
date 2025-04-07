import React from 'react';
import './TeachMeTopic.css';

function TeachMeTopic() {
  return (
    <div className="teach-container">
      <div className="teach-content">
        <div className="selection-group">
          <div className="select-wrapper">
            <select defaultValue="" className="form-select">
              <option value="" disabled>Math</option>
              <option value="math">Mathematics</option>
              <option value="science">Science</option>
              <option value="english">English</option>
            </select>
          </div>
          
          <div className="select-wrapper">
            <select defaultValue="" className="form-select">
              <option value="" disabled>Trigonometry</option>
              <option value="trigonometry">Trigonometry</option>
              <option value="algebra">Algebra</option>
              <option value="geometry">Geometry</option>
            </select>
          </div>

          <button className="start-button">
            Start
          </button>
        </div>

        <div className="description-section">
          <p className="main-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="sub-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          </p>
        </div>

        <div className="response-section">
          <div className="response-input">
            <input 
              type="text" 
              placeholder="Enter Your Response"
              className="response-field"
            />
            <div className="input-actions">
              <button className="mic-button">🎤</button>
              <button className="camera-button">📷</button>
              <button className="send-button">➡️</button>
            </div>
          </div>
          <button className="voice-toggle">
            <span className="voice-icon">🔊</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeachMeTopic; 
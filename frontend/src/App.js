import React, { useState } from 'react';
import './App.css';
import Assessment from './components/Assessment';
import PracticeQuestions from './components/PracticeQuestions';
import TeachMeTopic from './components/TeachMeTopic';
import ProfileMenu from './components/ProfileMenu';
import Profile from './components/Profile';
import Home from './components/home';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const renderContent = () => {
    if (showProfile) {
      return <Profile />;
    }
    switch (currentTab) {
      case 'assessment':
        return <Assessment />;
      case 'practice':
        return <PracticeQuestions />;
      case 'teach':
        return <TeachMeTopic />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="app-container">
      <aside className={`sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            {sidebarExpanded ? <h2>Aanya Tutor</h2> : <h2>AT</h2>}
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {sidebarExpanded ? '◀' : '▶'}
          </button>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="nav-item">
              <span className="icon">⏱️</span>
              {sidebarExpanded && <span className="nav-text">View History</span>}
            </li>
            <li
              className={`nav-item ${currentTab === 'home' ? 'active' : ''}`}
              onClick={() => {
                setCurrentTab('home');
                setShowProfile(false);
              }}
            >
              <span className="icon">❓</span>
              {sidebarExpanded && <span className="nav-text">Get Help</span>}
            </li>
            <li
              className={`nav-item ${currentTab === 'assessment' ? 'active' : ''}`}
              onClick={() => {
                setCurrentTab('assessment');
                setShowProfile(false);
              }}
            >
              <span className="icon">📝</span>
              {sidebarExpanded && <span className="nav-text">Assessments</span>}
            </li>
            <li
              className={`nav-item ${currentTab === 'practice' ? 'active' : ''}`}
              onClick={() => {
                setCurrentTab('practice');
                setShowProfile(false);
              }}
            >
              <span className="icon">✏️</span>
              {sidebarExpanded && <span className="nav-text">Practice Questions</span>}
            </li>
            <li
              className={`nav-item ${currentTab === 'teach' ? 'active' : ''}`}
              onClick={() => {
                setCurrentTab('teach');
                setShowProfile(false);
              }}
            >
              <span className="icon">🆕</span>
              {sidebarExpanded && <span className="nav-text">New Topics</span>}
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="top-nav">
          <nav>
            <ul>
              <li
                className={currentTab === 'home' ? 'active' : ''}
                onClick={() => {
                  setCurrentTab('home');
                  setShowProfile(false);
                }}
              >
                Home
              </li>
              <li
                className={currentTab === 'assessment' ? 'active' : ''}
                onClick={() => {
                  setCurrentTab('assessment');
                  setShowProfile(false);
                }}
              >
                Assessment
              </li>
              <li
                className={currentTab === 'practice' ? 'active' : ''}
                onClick={() => {
                  setCurrentTab('practice');
                  setShowProfile(false);
                }}
              >
                Practice Questions
              </li>
              <li
                className={currentTab === 'teach' ? 'active' : ''}
                onClick={() => {
                  setCurrentTab('teach');
                  setShowProfile(false);
                }}
              >
                Teach Me a Topic
              </li>
            </ul>
          </nav>
          <ProfileMenu onViewProfile={() => setShowProfile(true)} />
        </header>
        <div className="content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;

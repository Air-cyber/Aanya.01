// components/Dashboard.js
import React, { useState } from 'react';
import TabButtons from './TabButtons';
import StrengthAreas from './StrengthAreas';
import GrowthAreas from './GrowthAreas';
import OverallProgress from './OverallProgress';
import PracticeChallenges from './PracticeChallenges';
import WeeklyProgress from './WeeklyProgress';
import ChallengeInProgress from './ChallengeInProgress';
import { calculateGrowthTrends } from '../services/dataService';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('strength');

  // Get growth trends data from service
  const growthTrends = calculateGrowthTrends();

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Learning Dashboard</h1>
        <p>Track your progress and plan your learning journey</p>

        <div className="growth-trends">
          <div className="trend-item">
            <span className="trend-label">Weekly Improvement</span>
            <span className="trend-value positive">{growthTrends.weeklyImprovementRate}</span>
          </div>
          <div className="trend-item">
            <span className="trend-label">Most Improved</span>
            <span className="trend-value">{growthTrends.mostImprovedSubject}</span>
            <span className="trend-subvalue positive">{growthTrends.improvementRate}</span>
          </div>
          <div className="trend-item">
            <span className="trend-label">Recommended Focus</span>
            <span className="trend-value">{growthTrends.recommendedFocusArea}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-navigation">
        <button
          className={`dash-nav-button ${activeSection === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveSection('dashboard')}
        >
          Subject Areas
        </button>
        <button
          className={`dash-nav-button ${activeSection === 'practice' ? 'active' : ''}`}
          onClick={() => setActiveSection('practice')}
        >
          Practice Challenges
        </button>
        <button
          className={`dash-nav-button ${activeSection === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveSection('progress')}
        >
          Challenge in Progress
        </button>
        <button
          className={`dash-nav-button ${activeSection === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveSection('weekly')}
        >
          Weekly Progress
        </button>
      </div>

      {activeSection === 'dashboard' && (
        <>
          <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="content-area">
            {activeTab === 'strength' && <StrengthAreas />}
            {activeTab === 'growth' && <GrowthAreas />}
            {activeTab === 'overall' && <OverallProgress />}
          </div>
        </>
      )}

      {activeSection === 'practice' && <PracticeChallenges />}
      {activeSection === 'progress' && <ChallengeInProgress />}
      {activeSection === 'weekly' && <WeeklyProgress />}
    </div>
  );
}

export default Dashboard;
// App.jsx
import React, { useEffect, useState } from 'react';
import {
  fetchDashboardData,
  fetchPracticeChallenges,
  fetchChallengeInProgress,
  fetchWeeklyProgress
} from './dataService';
import './dashboard.css';

const App = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [practiceChallenges, setPracticeChallenges] = useState([]);
  const [challengeInProgress, setChallengeInProgress] = useState(null);
  const [weeklyProgressData, setWeeklyProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMainTab, setActiveMainTab] = useState('Dashboard');
  const [activeSubTab, setActiveSubTab] = useState('Strength Areas');

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const data = await fetchDashboardData();
        const challenges = await fetchPracticeChallenges();
        const currentChallenge = await fetchChallengeInProgress();
        const weeklyData = await fetchWeeklyProgress();

        setDashboardData(data);
        setPracticeChallenges(challenges);
        setChallengeInProgress(currentChallenge);
        setWeeklyProgressData(weeklyData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        setLoading(false);
      }
    };

    loadAllData();
  }, []);

  if (loading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  if (!dashboardData) {
    return <div className="error">Failed to load dashboard data</div>;
  }

  const calculateOverallProgress = () => {
    let totalSkills = 0;
    let totalProgress = 0;

    // Calculate from strength areas
    Object.values(dashboardData.strengthAreas).forEach(skills => {
      skills.forEach(skill => {
        totalProgress += skill.progress;
        totalSkills++;
      });
    });

    // Calculate from growth areas
    Object.values(dashboardData.growthAreas).forEach(skills => {
      skills.forEach(skill => {
        totalProgress += skill.progress;
        totalSkills++;
      });
    });

    return totalSkills > 0 ? Math.round(totalProgress / totalSkills) : 0;
  };

  const renderProgressBar = (level, progress) => {
    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          <span className="progress-level">{level}</span>
        </div>
      </div>
    );
  };

  const renderSkillsSection = (area, areaData) => {
    const skills = areaData[area] || [];

    return (
      <div className="skill-area">
        <h3>{area}</h3>
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className={`skill-level ${skill.level.toLowerCase()}`}>{skill.level}</span>
            </div>
            {renderProgressBar(skill.level, skill.progress)}
          </div>
        ))}
      </div>
    );
  };

  const renderPracticeChallenges = () => {
    return (
      <div className="challenges-container">
        <h2>Practice Challenges</h2>
        <div className="challenges-grid">
          {practiceChallenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card">
              <div className="challenge-header">
                <h3>{challenge.title}</h3>
                <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
                  {challenge.difficulty}
                </span>
              </div>
              <div className="challenge-details">
                <div className="detail">
                  <span className="label">Category:</span>
                  <span>{challenge.category}</span>
                </div>
                <div className="detail">
                  <span className="label">Points:</span>
                  <span>{challenge.points}</span>
                </div>
                <div className="detail">
                  <span className="label">Time Limit:</span>
                  <span>{challenge.timeLimit}</span>
                </div>
                <div className="detail">
                  <span className="label">Completion Rate:</span>
                  <span>{challenge.completionRate}</span>
                </div>
              </div>
              <button className="start-challenge-btn">Start Challenge</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderChallengeInProgress = () => {
    if (!challengeInProgress) {
      return (
        <div className="no-challenge">
          <h2>No Challenge In Progress</h2>
          <p>You haven't started any challenges yet. Head over to Practice Challenges to begin!</p>
          <button
            className="start-new-challenge-btn"
            onClick={() => setActiveMainTab('Practice Challenges')}
          >
            Find a Challenge
          </button>
        </div>
      );
    }

    return (
      <div className="challenge-in-progress">
        <h2>Challenge In Progress</h2>
        <div className="active-challenge">
          <div className="challenge-header">
            <h3>{challengeInProgress.title}</h3>
            <span className={`difficulty ${challengeInProgress.difficulty.toLowerCase()}`}>
              {challengeInProgress.difficulty}
            </span>
          </div>

          <div className="challenge-progress">
            <div className="progress-stats">
              <div className="stat">
                <span className="label">Time Remaining:</span>
                <span>{challengeInProgress.timeRemaining}</span>
              </div>
              <div className="stat">
                <span className="label">Questions Completed:</span>
                <span>{challengeInProgress.questionsCompleted} / {challengeInProgress.totalQuestions}</span>
              </div>
              <div className="stat">
                <span className="label">Current Score:</span>
                <span>{challengeInProgress.currentScore} points</span>
              </div>
            </div>

            <div className="completion-progress">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{
                    width: `${(challengeInProgress.questionsCompleted / challengeInProgress.totalQuestions) * 100}%`
                  }}
                ></div>
              </div>
              <span className="progress-percentage">
                {Math.round((challengeInProgress.questionsCompleted / challengeInProgress.totalQuestions) * 100)}% Complete
              </span>
            </div>
          </div>

          <div className="challenge-actions">
            <button className="resume-btn">Resume Challenge</button>
            <button className="abandon-btn">Abandon Challenge</button>
          </div>
        </div>
      </div>
    );
  };

  const renderWeeklyProgress = () => {
    if (!weeklyProgressData) return null;

    // Calculate max value for scaling
    const maxValue = Math.max(...Object.values(weeklyProgressData.dailyPoints));

    return (
      <div className="weekly-progress">
        <h2>Weekly Progress</h2>

        <div className="stats-summary">
          <div className="stat-card">
            <h4>Points Earned</h4>
            <p className="stat-value">{weeklyProgressData.totalPoints}</p>
          </div>
          <div className="stat-card">
            <h4>Skills Improved</h4>
            <p className="stat-value">{weeklyProgressData.skillsImproved}</p>
          </div>
          <div className="stat-card">
            <h4>Challenges Completed</h4>
            <p className="stat-value">{weeklyProgressData.challengesCompleted}</p>
          </div>
          <div className="stat-card">
            <h4>Study Time</h4>
            <p className="stat-value">{weeklyProgressData.totalStudyHours} hrs</p>
          </div>
        </div>

        <div className="chart-container">
          <h3>Daily Activity</h3>
          <div className="bar-chart">
            {Object.entries(weeklyProgressData.dailyPoints).map(([day, points]) => (
              <div key={day} className="chart-bar-column">
                <div
                  className="chart-bar"
                  style={{
                    height: `${(points / maxValue) * 100}%`,
                    backgroundColor: points > weeklyProgressData.dailyGoal ? '#6c5ce7' : '#a29bfe'
                  }}
                >
                  <span className="bar-value">{points}</span>
                </div>
                <span className="day-label">{day.substring(0, 3)}</span>
              </div>
            ))}
            <div className="goal-line" style={{ bottom: `${(weeklyProgressData.dailyGoal / maxValue) * 100}%` }}>
              <span className="goal-label">Daily Goal: {weeklyProgressData.dailyGoal}pts</span>
            </div>
          </div>
        </div>

        <div className="recent-achievements">
          <h3>Recent Achievements</h3>
          <div className="achievements-list">
            {weeklyProgressData.recentAchievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-details">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <span className="achievement-date">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container fullscreen">
      <header className="dashboard-header">
        <h1>Welcome to Your Learning Adventure</h1>
        <p>Let's discover where you are on your learning journey</p>
      </header>

      <nav className="dashboard-nav">
        <button
          className={activeMainTab === 'Dashboard' ? 'active' : ''}
          onClick={() => setActiveMainTab('Dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeMainTab === 'Practice Challenges' ? 'active' : ''}
          onClick={() => setActiveMainTab('Practice Challenges')}
        >
          Practice Challenges
        </button>
        <button
          className={activeMainTab === 'Challenge in Progress' ? 'active' : ''}
          onClick={() => setActiveMainTab('Challenge in Progress')}
        >
          Challenge in Progress
        </button>
        <button
          className={activeMainTab === 'Weekly Progress' ? 'active' : ''}
          onClick={() => setActiveMainTab('Weekly Progress')}
        >
          Weekly Progress
        </button>
      </nav>

      <main className="dashboard-content">
        {activeMainTab === 'Dashboard' && (
          <>
            <div className="tab-navigation">
              <button
                className={activeSubTab === 'Strength Areas' ? 'active' : ''}
                onClick={() => setActiveSubTab('Strength Areas')}
              >
                Strength Areas
              </button>
              <button
                className={activeSubTab === 'Growth Areas' ? 'active' : ''}
                onClick={() => setActiveSubTab('Growth Areas')}
              >
                Growth Areas
              </button>
              <button
                className={activeSubTab === 'Overall Progress' ? 'active' : ''}
                onClick={() => setActiveSubTab('Overall Progress')}
              >
                Overall Progress
              </button>
            </div>

            {activeSubTab === 'Strength Areas' && (
              <div className="strength-areas">
                <h2>Strength Areas</h2>
                <div className="skills-grid">
                  {Object.keys(dashboardData.strengthAreas).map(area => (
                    renderSkillsSection(area, dashboardData.strengthAreas)
                  ))}
                </div>
              </div>
            )}

            {activeSubTab === 'Growth Areas' && (
              <div className="growth-areas">
                <h2>Growth Areas</h2>
                <div className="skills-grid">
                  {Object.keys(dashboardData.growthAreas).map(area => (
                    renderSkillsSection(area, dashboardData.growthAreas)
                  ))}
                </div>
              </div>
            )}

            {activeSubTab === 'Overall Progress' && (
              <div className="overall-progress">
                <h2>Overall Progress</h2>

                <div className="overall-stats">
                  <div className="overall-progress-circle">
                    <svg width="150" height="150" viewBox="0 0 150 150">
                      <circle cx="75" cy="75" r="60" fill="none" stroke="#f1f1f1" strokeWidth="12" />
                      <circle
                        cx="75"
                        cy="75"
                        r="60"
                        fill="none"
                        stroke="#6c5ce7"
                        strokeWidth="12"
                        strokeDasharray={2 * Math.PI * 60}
                        strokeDashoffset={2 * Math.PI * 60 * (1 - calculateOverallProgress() / 100)}
                        transform="rotate(-90 75 75)"
                      />
                    </svg>
                    <div className="progress-text">
                      <span className="progress-percentage">{calculateOverallProgress()}%</span>
                      <span className="progress-label">Overall</span>
                    </div>
                  </div>

                  <div className="stats-breakdown">
                    <div className="stat-card">
                      <h4>Total Skills</h4>
                      <p className="stat-value">
                        {Object.values(dashboardData.strengthAreas).reduce((sum, skills) => sum + skills.length, 0) +
                          Object.values(dashboardData.growthAreas).reduce((sum, skills) => sum + skills.length, 0)}
                      </p>
                    </div>
                    <div className="stat-card">
                      <h4>Mastered Skills</h4>
                      <p className="stat-value">
                        {Object.values(dashboardData.strengthAreas).reduce((sum, skills) =>
                          sum + skills.filter(skill => skill.level === 'Mastery').length, 0) +
                          Object.values(dashboardData.growthAreas).reduce((sum, skills) =>
                            sum + skills.filter(skill => skill.level === 'Mastery').length, 0)}
                      </p>
                    </div>
                    <div className="stat-card">
                      <h4>Advanced Skills</h4>
                      <p className="stat-value">
                        {Object.values(dashboardData.strengthAreas).reduce((sum, skills) =>
                          sum + skills.filter(skill => skill.level === 'Advanced').length, 0) +
                          Object.values(dashboardData.growthAreas).reduce((sum, skills) =>
                            sum + skills.filter(skill => skill.level === 'Advanced').length, 0)}
                      </p>
                    </div>
                    <div className="stat-card">
                      <h4>Skill Points</h4>
                      <p className="stat-value">{dashboardData.user.points}</p>
                    </div>
                  </div>
                </div>

                <div className="skills-distribution">
                  <h3>Skills Distribution</h3>
                  <div className="skills-pie-chart">
                    {/* This would be a pie chart in a real implementation */}
                    <div className="pie-chart-placeholder">
                      <div className="pie-segment mastery" style={{ transform: 'rotate(0deg)', clip: 'rect(0px, 75px, 150px, 0px)' }}></div>
                      <div className="pie-segment advanced" style={{ transform: 'rotate(90deg)', clip: 'rect(0px, 75px, 150px, 0px)' }}></div>
                      <div className="pie-segment proficient" style={{ transform: 'rotate(180deg)', clip: 'rect(0px, 75px, 150px, 0px)' }}></div>
                      <div className="pie-segment beginner" style={{ transform: 'rotate(270deg)', clip: 'rect(0px, 75px, 150px, 0px)' }}></div>
                    </div>
                    <div className="pie-legend">
                      <div className="legend-item">
                        <span className="color-box mastery"></span>
                        <span>Mastery</span>
                      </div>
                      <div className="legend-item">
                        <span className="color-box advanced"></span>
                        <span>Advanced</span>
                      </div>
                      <div className="legend-item">
                        <span className="color-box proficient"></span>
                        <span>Proficient</span>
                      </div>
                      <div className="legend-item">
                        <span className="color-box beginner"></span>
                        <span>Beginner</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeMainTab === 'Practice Challenges' && renderPracticeChallenges()}

        {activeMainTab === 'Challenge in Progress' && renderChallengeInProgress()}

        {activeMainTab === 'Weekly Progress' && renderWeeklyProgress()}
      </main>
    </div>
  );
};

export default App;
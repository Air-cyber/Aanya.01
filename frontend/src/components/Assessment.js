import React, { useState } from 'react';
import './Assessment.css';

function Assessment() {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [finished, setFinished] = useState(false); // NEW STATE

  const subjectTopics = {
    Mathematics: ['Algebra', 'Geometry', 'Calculus', 'Trigonometry', 'Statistics', 'Probability'],
    Science: ['Mechanics', 'Thermodynamics','Optics', 'Electromagnetism', 'Waves and Oscillations', 'Modern Physics','Fluid Mechanics','Properties of Matter','Nuclear Physics','Acoustics','Electronics', 
      'Polymer Chemistry', 
      'Biology', 
      'Environmental Science', 
      'Astronomy',
      'Physical Chemistry', 
      'Organic Chemistry', 
      'Inorganic Chemistry', 
      'Biochemistry', 
      'Environmental Chemistry', 
      'Industrial Chemistry', 
      'Analytical Chemistry', 
      'Surface Chemistry', 
      'Nuclear Chemistry', 
      'Geology', 
      'Botany', 
      'Zoology', 
      'Genetics', 
      'Ecology', 
      'Evolution', 
      'Microbiology', 
      'Human Anatomy and Physiology', 
      'Biochemistry', 
      'Immunology', 
    'Stars and Galaxies', 
    'Cosmology', 
    'Planetary Science', 
    'Astrophysics', 
    'Space Exploration', 
    'Telescopes and Observatories', 
    'Black Holes', 
    'Nebulae', 
    'The Big Bang Theory'
    ],
    English: ['Grammar', 'Literature', 'Vocabulary', 'Writing Skills', 'Reading Comprehension'],
    'Computer Science': ['Programming Basics', 'Data Structures', 'Algorithms', 'Databases', 'Networking', 'Cybersecurity'],
    'Social Studies': ['Civics', 'World Politics', 'Cultural Studies', 'Globalization'],
    History: ['Ancient History', 'Modern History', 'World Wars', 'Indian Freedom Struggle', 'Medieval History'],
    Geography: ['Physical Geography', 'Human Geography', 'World Geography', 'Maps and Diagrams'],
    Economics: ['Microeconomics', 'Macroeconomics', 'Banking & Finance', 'International Trade', 'Economic Policies']
  };

  const handleSubjectChange = (e) => {
    const selected = e.target.value;
    setSubject(selected);
    setTopic('');
  };

  const handleLaunch = async () => {
    if (!subject || !topic || !numQuestions) {
      setError('Please select all fields.');
      return;
    }

    setError('');
    setLoading(true);
    setFinished(false); // Reset finish state

    try {
      const response = await fetch('http://localhost:8000/api/questions/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, topic, numQuestions }),
      });

      const data = await response.json();
      if (data.questions) {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setSelectedOption(null);
        setShowAnswer(false);
      } else {
        throw new Error('No questions returned.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option) => {
    if (!showAnswer) {
      setSelectedOption(option);
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const handleFinish = () => {
    setFinished(true);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="assessment-container">
      <div className="assessment-content">
        <div className="assessment-form">
          {!questions.length && (
            <>
              <div className="form-group">
                <div className="select-wrapper">
                  <select value={subject} onChange={handleSubjectChange} className="form-select">
                    <option value="" disabled>Subject</option>
                    {Object.keys(subjectTopics).map((subj, index) => (
                      <option key={index} value={subj}>{subj}</option>
                    ))}
                  </select>
                </div>

                <div className="select-wrapper">
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="form-select"
                    disabled={!subject}
                  >
                    <option value="" disabled>Topics</option>
                    {subject && subjectTopics[subject].map((t, index) => (
                      <option key={index} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="select-wrapper">
                  <select value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} className="form-select">
                    <option value="" disabled>Number of Questions</option>
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="15">15 Questions</option>
                    <option value="20">20 Questions</option>
                  </select>
                </div>
              </div>

              <button className="launch-button" onClick={handleLaunch} disabled={loading}>
                {loading ? 'Loading...' : 'Launch Assessment'}
              </button>
            </>
          )}

          {error && <p className="error-text">{error}</p>}

          {questions.length > 0 && currentQuestion && !finished && (
            <div className="question-card">
              <p><strong>Q{currentIndex + 1}:</strong> {currentQuestion.question}</p>
              <ul className="options-list">
                {currentQuestion.options.map((opt, i) => {
                  const isCorrect = opt === currentQuestion.answer;
                  const isSelected = opt === selectedOption;

                  let className = 'option';
                  if (showAnswer) {
                    if (isSelected && isCorrect) className += ' correct';
                    else if (isSelected && !isCorrect) className += ' incorrect';
                    else if (isCorrect) className += ' correct';
                  }

                  return (
                    <li
                      key={i}
                      className={className}
                      onClick={() => handleOptionClick(opt)}
                    >
                      {opt}
                      {showAnswer && isSelected && isCorrect && <span> ✅</span>}
                      {showAnswer && isSelected && !isCorrect && <span> ❌</span>}
                      {showAnswer && !isSelected && isCorrect && <span> ✅</span>}
                    </li>
                  );
                })}
              </ul>

              {showAnswer && currentIndex < questions.length - 1 && (
                <button className="launch-button" onClick={handleNext}>Next</button>
              )}

              {showAnswer && currentIndex === questions.length - 1 && (
                <button className="launch-button" onClick={handleFinish}>Finish</button>
              )}
            </div>
          )}

          {finished && (
            <p className="completion-message"> You have completed your assessment!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Assessment;

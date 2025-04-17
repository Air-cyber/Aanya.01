// services/dataService.js
// This file contains all the dummy data and calculation functions

export const strengthAreasData = [
  {
    title: 'Linear Equations',
    level: 'Advanced',
    progressPercentage: 85,
    topics: [
      { name: 'Slope-Intercept Form', level: 'Mastery' },
      { name: 'Point-Slope Form', level: 'Advanced' },
      { name: 'Systems of Equations', level: 'Advanced' }
    ]
  },
  {
    title: 'Number Theory',
    level: 'Advanced',
    progressPercentage: 80,
    topics: [
      { name: 'Prime Factorization', level: 'Mastery' },
      { name: 'GCD and LCM', level: 'Advanced' },
      { name: 'Modular Arithmetic', level: 'Proficient' }
    ]
  },
  {
    title: 'Basic Geometry',
    level: 'Advanced',
    progressPercentage: 75,
    topics: [
      { name: 'Angles and Lines', level: 'Mastery' },
      { name: 'Triangles', level: 'Advanced' },
      { name: 'Circles', level: 'Proficient' }
    ]
  }
];

export const growthAreasData = [
  {
    title: 'Calculus',
    level: 'Developing',
    progressPercentage: 45,
    topics: [
      { name: 'Derivatives', level: 'Proficient' },
      { name: 'Integrals', level: 'Developing' },
      { name: 'Series', level: 'Beginner' }
    ]
  },
  {
    title: 'Statistics',
    level: 'Proficient',
    progressPercentage: 60,
    topics: [
      { name: 'Descriptive Stats', level: 'Advanced' },
      { name: 'Probability', level: 'Proficient' },
      { name: 'Hypothesis Testing', level: 'Developing' }
    ]
  },
  {
    title: 'Trigonometry',
    level: 'Proficient',
    progressPercentage: 55,
    topics: [
      { name: 'Basic Functions', level: 'Advanced' },
      { name: 'Identities', level: 'Proficient' },
      { name: 'Applications', level: 'Developing' }
    ]
  }
];

export const practiceChallengesTodo = [
  {
    title: 'Linear Equations Master',
    description: 'Test your skills with advanced linear equations',
    questions: 10,
    duration: '20 minutes'
  },
  {
    title: 'Geometry Explorer',
    description: 'Practice with angles, triangles and circles',
    questions: 15,
    duration: '25 minutes'
  },
  {
    title: 'Number Theory Fundamentals',
    description: 'Strengthen your number theory foundations',
    questions: 12,
    duration: '18 minutes'
  }
];

export const weeklyProgressData = {
  currentWeek: {
    weekLabel: 'April 10 - April 16, 2025',
    timeSpent: '8.5 hours',
    timeChange: '+1.2 hrs from last week',
    challengesCompleted: 12,
    challengesChange: '+3 from last week',
    averageScore: '87%',
    scoreChange: '+4% from last week',
    dailyActivity: [
      { day: 'Mon', hours: 1.2, heightPercentage: 60 },
      { day: 'Tue', hours: 0.8, heightPercentage: 40 },
      { day: 'Wed', hours: 1.8, heightPercentage: 90 },
      { day: 'Thu', hours: 1.5, heightPercentage: 75 },
      { day: 'Fri', hours: 1.6, heightPercentage: 80 },
      { day: 'Sat', hours: 1.0, heightPercentage: 50 },
      { day: 'Sun', hours: 0.6, heightPercentage: 30 }
    ]
  },
  previousWeek: {
    weekLabel: 'April 3 - April 9, 2025',
    timeSpent: '7.3 hours',
    timeChange: '-0.5 hrs from last week',
    challengesCompleted: 9,
    challengesChange: '-1 from last week',
    averageScore: '83%',
    scoreChange: '+2% from last week',
    dailyActivity: [
      { day: 'Mon', hours: 0.9, heightPercentage: 45 },
      { day: 'Tue', hours: 1.2, heightPercentage: 60 },
      { day: 'Wed', hours: 0.8, heightPercentage: 40 },
      { day: 'Thu', hours: 1.3, heightPercentage: 65 },
      { day: 'Fri', hours: 1.4, heightPercentage: 70 },
      { day: 'Sat', hours: 1.1, heightPercentage: 55 },
      { day: 'Sun', hours: 0.6, heightPercentage: 30 }
    ]
  }
};

export const recentActivitiesData = [
  {
    name: 'Linear Equations Quiz',
    status: 'completed',
    score: '95%',
    date: 'Yesterday'
  },
  {
    name: 'Calculus Practice',
    status: 'in-progress',
    progress: '35%',
    date: 'Today'
  },
  {
    name: 'Geometry Challenge',
    status: 'completed',
    score: '88%',
    date: '2 days ago'
  }
];

// Function to calculate overall progress based on strength and growth areas
export const calculateOverallProgress = () => {
  const allSubjects = [...strengthAreasData, ...growthAreasData];

  // Count topics by level
  const levelCounts = {
    mastery: 0,
    advanced: 0,
    proficient: 0,
    developing: 0,
    beginner: 0
  };

  let totalTopics = 0;

  allSubjects.forEach(subject => {
    subject.topics.forEach(topic => {
      const level = topic.level.toLowerCase();
      if (levelCounts.hasOwnProperty(level)) {
        levelCounts[level]++;
        totalTopics++;
      }
    });
  });

  // Calculate weighted completion percentage
  // Weights: Mastery=100%, Advanced=80%, Proficient=60%, Developing=30%, Beginner=10%
  const weightedCompletion =
    (levelCounts.mastery * 100 +
      levelCounts.advanced * 80 +
      levelCounts.proficient * 60 +
      levelCounts.developing * 30 +
      levelCounts.beginner * 10) /
    (totalTopics * 100);

  const totalCompletionPercentage = Math.round(weightedCompletion * 100);

  // Calculate percentage of each level
  const masteryPercentage = Math.round((levelCounts.mastery / totalTopics) * 100);
  const advancedPercentage = Math.round((levelCounts.advanced / totalTopics) * 100);
  const proficientPercentage = Math.round((levelCounts.proficient / totalTopics) * 100);
  const developingPercentage = Math.round((levelCounts.developing / totalTopics) * 100);
  const beginnerPercentage = Math.round((levelCounts.beginner / totalTopics) * 100);

  return {
    totalCompletion: totalCompletionPercentage,
    breakdownStats: [
      { category: 'Mastery Topics', percentage: masteryPercentage, type: 'mastery' },
      { category: 'Advanced Topics', percentage: advancedPercentage, type: 'advanced' },
      { category: 'Proficient Topics', percentage: proficientPercentage, type: 'proficient' },
      { category: 'Developing Topics', percentage: developingPercentage, type: 'developing' },
      { category: 'Beginner Topics', percentage: beginnerPercentage, type: 'beginner' }
    ].filter(stat => stat.percentage > 0),  // Only include levels that have topics
    recentActivities: recentActivitiesData
  };
};

// Function to get challenge in progress data
export const getChallengeInProgress = () => {
  // This would normally come from API/database
  // For now, we're using dummy data
  return {
    title: 'Calculus Fundamentals',
    progress: 35,
    currentQuestion: 7,
    totalQuestions: 20,
    timeRemaining: '18:45',
    currentQuestionData: {
      questionText: 'Find the derivative of f(x) = 3x² + 2x - 5',
      options: [
        'f\'(x) = 6x + 2',
        'f\'(x) = 3x + 2',
        'f\'(x) = 6x - 2',
        'f\'(x) = 3x² + 2'
      ],
      correctOption: 0
    }
  };
};

// Mock function to simulate API call for fetching subjects
export const fetchSubjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        strengthAreas: strengthAreasData,
        growthAreas: growthAreasData
      });
    }, 500);
  });
};

// Function to get learning recommendations based on user progress
export const getLearningRecommendations = () => {
  // This would normally be calculated based on user data
  // For now, we're using dummy recommendations
  return [
    {
      type: 'topic',
      title: 'Integrals',
      category: 'Calculus',
      reason: 'This is a growth area that needs improvement'
    },
    {
      type: 'challenge',
      title: 'Calculus Fundamentals',
      difficulty: 'Medium',
      reason: 'This challenge will help improve your calculus skills'
    },
    {
      type: 'resource',
      title: 'Calculus Made Easy',
      format: 'Video Course',
      duration: '45 minutes',
      reason: 'Recommended based on your learning style'
    }
  ];
};

// Function to format practice time for display
export const formatPracticeTime = (hours) => {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  }

  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);

  if (minutes === 0) {
    return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''}`;
  }

  return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''} ${minutes} min`;
};

// Function to calculate user growth trends
export const calculateGrowthTrends = () => {
  return {
    weeklyImprovementRate: '+5.2%',
    mostImprovedSubject: 'Calculus',
    improvementRate: '+12%',
    recommendedFocusArea: 'Integrals'
  };
};
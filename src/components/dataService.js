// dataService.js
const dummyDashboardData = {
  user: {
    name: "Alex Johnson",
    level: "Intermediate",
    points: 2450,
    streak: 14
  },
  strengthAreas: {
    "Linear Equations": [
      {
        name: "Slope-Intercept Form",
        level: "Mastery",
        progress: 100
      },
      {
        name: "Point-Slope Form",
        level: "Advanced",
        progress: 75
      },
      {
        name: "Systems of Equations",
        level: "Advanced",
        progress: 80
      }
    ],
    "Number Theory": [
      {
        name: "Prime Factorization",
        level: "Mastery",
        progress: 95
      },
      {
        name: "GCD and LCM",
        level: "Advanced",
        progress: 85
      },
      {
        name: "Modular Arithmetic",
        level: "Proficient",
        progress: 60
      }
    ],
    "Basic Geometry": [
      {
        name: "Angles and Lines",
        level: "Mastery",
        progress: 98
      },
      {
        name: "Triangles",
        level: "Advanced",
        progress: 75
      },
      {
        name: "Circles",
        level: "Proficient",
        progress: 55
      }
    ]
  },
  growthAreas: {
    "Calculus": [
      {
        name: "Limits",
        level: "Beginner",
        progress: 30
      },
      {
        name: "Derivatives",
        level: "Beginner",
        progress: 15
      }
    ],
    "Probability": [
      {
        name: "Basic Probability",
        level: "Proficient",
        progress: 50
      },
      {
        name: "Conditional Probability",
        level: "Beginner",
        progress: 25
      }
    ]
  },
  recentActivities: [
    {
      type: "Challenge",
      title: "Quadratic Equations Master",
      date: "2025-04-16",
      score: 95
    },
    {
      type: "Quiz",
      title: "Geometry Basics",
      date: "2025-04-15",
      score: 88
    },
    {
      type: "Practice",
      title: "Linear Equations",
      date: "2025-04-14",
      score: 92
    }
  ]
};

// Dummy data for practice challenges
const dummyPracticeChallenges = [
  {
    id: 1,
    title: "Algebraic Mastery",
    difficulty: "Intermediate",
    category: "Algebra",
    points: 150,
    timeLimit: "25 minutes",
    completionRate: "78%",
    prerequisites: ["Basic Algebra"],
    description: "Test your skills with advanced algebraic expressions and equations."
  },
  {
    id: 2,
    title: "Geometry Challenge",
    difficulty: "Advanced",
    category: "Geometry",
    points: 200,
    timeLimit: "30 minutes",
    completionRate: "65%",
    prerequisites: ["Basic Geometry", "Trigonometry"],
    description: "Solve complex geometry problems involving circles, triangles, and coordinate systems."
  },
  {
    id: 3,
    title: "Number Theory Fundamentals",
    difficulty: "Beginner",
    category: "Number Theory",
    points: 100,
    timeLimit: "20 minutes",
    completionRate: "89%",
    prerequisites: [],
    description: "Learn the basics of number theory with simple problems on primes, factors, and multiples."
  },
  {
    id: 4,
    title: "Calculus Concepts",
    difficulty: "Expert",
    category: "Calculus",
    points: 250,
    timeLimit: "40 minutes",
    completionRate: "45%",
    prerequisites: ["Pre-Calculus", "Limits"],
    description: "Advanced calculus problems covering derivatives, integrals, and applications."
  },
  {
    id: 5,
    title: "Probability Puzzles",
    difficulty: "Intermediate",
    category: "Statistics",
    points: 175,
    timeLimit: "25 minutes",
    completionRate: "72%",
    prerequisites: ["Basic Probability"],
    description: "Test your understanding of probability concepts through engaging puzzles."
  },
  {
    id: 6,
    title: "Linear Algebra Foundations",
    difficulty: "Advanced",
    category: "Algebra",
    points: 225,
    timeLimit: "35 minutes",
    completionRate: "58%",
    prerequisites: ["Advanced Algebra", "Matrices"],
    description: "Explore vectors, matrices, and linear transformations through challenging problems."
  }
];

// Dummy data for current challenge in progress
const dummyChallengeInProgress = {
  id: 2,
  title: "Geometry Challenge",
  difficulty: "Advanced",
  category: "Geometry",
  totalQuestions: 15,
  questionsCompleted: 8,
  timeLimit: "30:00",
  timeRemaining: "18:45",
  currentScore: 120,
  potentialPoints: 200,
  startedAt: "2025-04-18T14:30:00",
  lastActivityAt: "2025-04-18T14:42:15"
};

// Dummy data for weekly progress
const dummyWeeklyProgress = {
  weekOf: "April 12-18, 2025",
  totalPoints: 950,
  skillsImproved: 6,
  challengesCompleted: 8,
  quizzesTaken: 5,
  totalStudyHours: 12.5,
  dailyGoal: 150,
  dailyPoints: {
    "Monday": 120,
    "Tuesday": 180,
    "Wednesday": 200,
    "Thursday": 90,
    "Friday": 160,
    "Saturday": 140,
    "Sunday": 60
  },
  skillsProgress: {
    "Algebra": 12,
    "Geometry": 18,
    "Calculus": 5,
    "Number Theory": 15,
    "Statistics": 8
  },
  recentAchievements: [
    {
      title: "Streak Master",
      description: "Completed challenges for 7 consecutive days",
      date: "April 16, 2025",
      icon: "🔥"
    },
    {
      title: "Geometry Pro",
      description: "Reached Advanced level in Basic Geometry",
      date: "April 14, 2025",
      icon: "📐"
    },
    {
      title: "Quick Solver",
      description: "Solved 10 problems in under 5 minutes",
      date: "April 13, 2025",
      icon: "⚡"
    }
  ]
};

// Simulate API delay
export const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyDashboardData);
    }, 800);
  });
};

export const fetchPracticeChallenges = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyPracticeChallenges);
    }, 600);
  });
};

export const fetchChallengeInProgress = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Randomly return null sometimes to simulate not having an active challenge
      // const hasActiveChallenge = Math.random() > 0.3;
      // resolve(hasActiveChallenge ? dummyChallengeInProgress : null);

      // For now, always return a challenge in progress
      resolve(dummyChallengeInProgress);
    }, 700);
  });
};

export const fetchWeeklyProgress = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyWeeklyProgress);
    }, 650);
  });
};

// Additional service functions
export const updateUserProgress = (skillArea, skillName, newProgress) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would update data in a backend
      console.log(`Updated ${skillArea} - ${skillName} to ${newProgress}%`);
      resolve({ success: true });
    }, 500);
  });
};

export const startNewChallenge = (challengeId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Starting challenge ID: ${challengeId}`);
      resolve({
        success: true,
        challenge: {
          ...dummyPracticeChallenges.find(c => c.id === challengeId),
          questionsCompleted: 0,
          timeRemaining: dummyPracticeChallenges.find(c => c.id === challengeId).timeLimit,
          currentScore: 0
        }
      });
    }, 600);
  });
};

export const abandonChallenge = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Abandoning current challenge");
      resolve({ success: true });
    }, 400);
  });
};

export const submitChallengeAnswer = (challengeId, questionId, answer) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isCorrect = Math.random() > 0.3; // Simulate correct/incorrect answer
      console.log(`Submitting answer for challenge ${challengeId}, question ${questionId}: ${isCorrect ? 'Correct' : 'Incorrect'}`);
      resolve({
        success: true,
        isCorrect,
        pointsEarned: isCorrect ? Math.floor(Math.random() * 15) + 10 : 0
      });
    }, 300);
  });
};
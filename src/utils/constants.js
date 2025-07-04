// API Configuration
// export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const API_BASE_URL = 'http://localhost:3001/api';

export const ROUTES = {
    DASHBOARD: '/admin/dashboard',
    QUIZ: '/admin/quiz',
    FORUM: '/admin/forum',
    PENCAPAIAN: '/admin/pencapaian',
    INSTRUKTUR: '/admin/instruktur',
};

// Local Storage Keys
export const STORAGE_KEYS = {
    USER_PREFERENCES: 'userPreferences',
    THEME: 'theme',
    QUIZ_PROGRESS: 'quizProgress',
    FORUM_DRAFT: 'forumDraft',
    ACHIEVEMENT_PROGRESS: 'achievementProgress',
    STUDY_STREAK: 'studyStreak',
    DAILY_GOAL: 'dailyGoal',
};

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
};

// Quiz Configuration
export const QUIZ_CONFIG = {
    DEFAULT_TIME_LIMIT: 30, // minutes
    PASSING_SCORE: 70, // percentage
    MAX_ATTEMPTS: 3,
    QUESTION_TYPES: {
      MULTIPLE_CHOICE: 'multiple_choice',
      TRUE_FALSE: 'true_false',
      ESSAY: 'essay',
    },
};

// Forum Configuration
export const FORUM_CONFIG = {
    CATEGORIES: [
      'Programming',
      'Database',
      'Network',
      'Web Development',
      'Mobile Development',
      'Data Science',
      'General Discussion',
    ],
    POST_TYPES: {
      DISCUSSION: 'discussion',
      QUESTION: 'question',
      ANNOUNCEMENT: 'announcement',
    },
    SORT_OPTIONS: {
      NEWEST: 'newest',
      OLDEST: 'oldest',
      MOST_POPULAR: 'most_popular',
      MOST_REPLIES: 'most_replies',
    },
};

// Achievement Configuration
export const ACHIEVEMENT_CONFIG = {
    TYPES: {
      STREAK: 'streak',
      COMPLETION: 'completion',
      QUIZ_SCORE: 'quiz_score',
      FORUM_PARTICIPATION: 'forum_participation',
      STUDY_TIME: 'study_time',
    },
    BADGE_LEVELS: {
      BRONZE: 'bronze',
      SILVER: 'silver',
      GOLD: 'gold',
      PLATINUM: 'platinum',
    },
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
    CHART_COLORS: [
      '#3b82f6', // blue
      '#10b981', // green
      '#f59e0b', // yellow
      '#ef4444', // red
      '#8b5cf6', // purple
      '#06b6d4', // cyan
      '#f97316', // orange
      '#84cc16', // lime
    ],
    TIME_RANGES: {
      LAST_7_DAYS: 'last_7_days',
      LAST_30_DAYS: 'last_30_days',
      LAST_90_DAYS: 'last_90_days',
      LAST_YEAR: 'last_year',
    },
};

// User Roles
export const USER_ROLES = {
    STUDENT: 'student',
    INSTRUCTOR: 'instructor',
    ADMIN: 'admin',
};

// Module Categories
export const MODULE_CATEGORIES = [
    'Programming',
    'Database',
    'Network',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Computer Graphics',
    'Software Engineering',
    'Algorithms',
    'Operating Systems',
];

// Status Constants
export const STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
    IDLE: 'idle',
};

// Module Status
export const MODULE_STATUS = {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    LOCKED: 'locked',
};

// Notification Types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};
  
// Validation Rules
export const VALIDATION_RULES = {
    MIN_PASSWORD_LENGTH: 8,
    MAX_POST_LENGTH: 5000,
    MAX_REPLY_LENGTH: 2000,
    MIN_QUIZ_QUESTIONS: 5,
    MAX_QUIZ_QUESTIONS: 50,
};
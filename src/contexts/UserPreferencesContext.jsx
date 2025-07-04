import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS } from '../utils/constants';

// User preferences actions
const PREFERENCES_ACTIONS = {
    SET_LANGUAGE: 'SET_LANGUAGE',
    SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
    SET_DAILY_GOAL: 'SET_DAILY_GOAL',
    SET_STUDY_REMINDER: 'SET_STUDY_REMINDER',
    SET_DASHBOARD_LAYOUT: 'SET_DASHBOARD_LAYOUT',
    SET_QUIZ_PREFERENCES: 'SET_QUIZ_PREFERENCES',
    SET_FORUM_PREFERENCES: 'SET_FORUM_PREFERENCES',
    UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
    RESET_PREFERENCES: 'RESET_PREFERENCES',
    INITIALIZE_PREFERENCES: 'INITIALIZE_PREFERENCES',
};

// Available languages
export const LANGUAGES = {
    ID: 'id',
    EN: 'en',
};

// Dashboard layouts
export const DASHBOARD_LAYOUTS = {
    COMPACT: 'compact',
    COMFORTABLE: 'comfortable',
    SPACIOUS: 'spacious',
};

// Initial state
const initialState = {
    language: LANGUAGES.ID,
    notifications: {
        email: true,
        push: true,
        achievements: true,
        forum: true,
        quiz: true,
        deadlines: true,
    },
    dailyGoal: {
        studyTime: 60, // minutes
        modules: 2,
        quizzes: 1,
    },
    studyReminder: {
        enabled: true,
        time: '19:00',
        days: [1, 2, 3, 4, 5], // Monday to Friday
    },
    dashboardLayout: DASHBOARD_LAYOUTS.COMFORTABLE,
    quizPreferences: {
        autoSave: true,
        showCorrectAnswers: true,
        randomizeQuestions: false,
        timeWarning: 5, // minutes before time expires
    },
    forumPreferences: {
        defaultSort: 'newest',
        showCategories: true,
        emailNotifications: true,
        autoSubscribe: false,
    },
    privacy: {
        showProfile: true,
        showProgress: true,
        showAchievements: true,
    },
    accessibility: {
        highContrast: false,
        reduceMotion: false,
        screenReader: false,
    },
    isInitialized: false,
};

// Preferences reducer
const preferencesReducer = (state, action) => {
    switch (action.type) {
        case PREFERENCES_ACTIONS.SET_LANGUAGE:
            return {
                ...state,
                language: action.payload,
            };

        case PREFERENCES_ACTIONS.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    ...action.payload,
                },
            };

        case PREFERENCES_ACTIONS.SET_DAILY_GOAL:
            return {
                ...state,
                dailyGoal: {
                    ...state.dailyGoal,
                    ...action.payload,
                },
            };

        case PREFERENCES_ACTIONS.SET_STUDY_REMINDER:
            return {
                ...state,
                studyReminder: {
                    ...state.studyReminder,
                    ...action.payload,
                },
            };

        case PREFERENCES_ACTIONS.SET_DASHBOARD_LAYOUT:
            return {
                ...state,
                dashboardLayout: action.payload,
            };

        case PREFERENCES_ACTIONS.SET_QUIZ_PREFERENCES:
            return {
                ...state,
                quizPreferences: {
                    ...state.quizPreferences,
                    ...action.payload,
                },
            };

        case PREFERENCES_ACTIONS.SET_FORUM_PREFERENCES:
            return {
                ...state,
                forumPreferences: {
                    ...state.forumPreferences,
                    ...action.payload,
                },
            };

        case PREFERENCES_ACTIONS.UPDATE_PREFERENCES:
            return {
                ...state,
                ...action.payload,
            };

        case PREFERENCES_ACTIONS.RESET_PREFERENCES:
            return {
                ...initialState,
                isInitialized: true,
            };

        case PREFERENCES_ACTIONS.INITIALIZE_PREFERENCES:
            return {
                ...state,
                ...action.payload,
                isInitialized: true,
            };

        default:
            return state;
    }
};

// Create context
const UserPreferencesContext = createContext();

// User preferences provider component
export const UserPreferencesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(preferencesReducer, initialState);

    // Load preferences from localStorage
    useEffect(() => {
        const loadPreferences = () => {
            try {
                const savedPreferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
                if (savedPreferences) {
                    const preferences = JSON.parse(savedPreferences);
                    dispatch({
                        type: PREFERENCES_ACTIONS.INITIALIZE_PREFERENCES,
                        payload: preferences,
                    });
                } else {
                    dispatch({
                        type: PREFERENCES_ACTIONS.INITIALIZE_PREFERENCES,
                        payload: {},
                    });
                }
            } catch (error) {
                console.error('Error loading user preferences:', error);
                dispatch({
                    type: PREFERENCES_ACTIONS.INITIALIZE_PREFERENCES,
                    payload: {},
                });
            }
        };

        loadPreferences();
    }, []);

    // Save preferences to localStorage
    useEffect(() => {
        if (state.isInitialized) {
            try {
                const { isInitialized, ...preferencesToSave } = state;
                localStorage.setItem(
                    STORAGE_KEYS.USER_PREFERENCES,
                    JSON.stringify(preferencesToSave)
                );
            } catch (error) {
                console.error('Error saving user preferences:', error);
            }
        }
    }, [state]);

    // Actions
    const setLanguage = (language) => {
        dispatch({ type: PREFERENCES_ACTIONS.SET_LANGUAGE, payload: language });
    };

    const setNotifications = (notifications) => {
        dispatch({ type: PREFERENCES_ACTIONS.SET_NOTIFICATIONS, payload: notifications });
    };

    const setDailyGoal = (goal) => {
        dispatch({ type: PREFERENCES_ACTIONS.SET_DAILY_GOAL, payload: goal });
    };

    const setStudyReminder = (reminder) => {
        dispatch({ type: PREFERENCES_ACTIONS.SET_STUDY_REMINDER, payload: reminder });
    };

    const setDashboardLayout = (layout) => {
        dispatch({ type: PREFERENCES_ACTIONS.SET_DASHBOARD_LAYOUT, payload: layout });
    };

    const setQuizPreferences = (preferences) => {
        dispatch({ type: PREFERENCES_ACTIONS.SET_QUIZ_PREFERENCES, payload: preferences });
    };

    const setForumPreferences = (preferences) => {
        dispatch({ type: PREFERENCES_ACTIONS.SET_FORUM_PREFERENCES, payload: preferences });
    };

    const updatePreferences = (preferences) => {
        dispatch({ type: PREFERENCES_ACTIONS.UPDATE_PREFERENCES, payload: preferences });
    };

    const resetPreferences = () => {
        dispatch({ type: PREFERENCES_ACTIONS.RESET_PREFERENCES });
    };

    // Utility functions
    const isNotificationEnabled = (type) => {
        return state.notifications[type] || false;
    };

    const getDailyGoalProgress = (currentProgress) => {
        const { studyTime, modules, quizzes } = state.dailyGoal;

        return {
            studyTime: {
                current: currentProgress.studyTime || 0,
                target: studyTime,
                percentage: Math.min(((currentProgress.studyTime || 0) / studyTime) * 100, 100),
            },
            modules: {
                current: currentProgress.modules || 0,
                target: modules,
                percentage: Math.min(((currentProgress.modules || 0) / modules) * 100, 100),
            },
            quizzes: {
                current: currentProgress.quizzes || 0,
                target: quizzes,
                percentage: Math.min(((currentProgress.quizzes || 0) / quizzes) * 100, 100),
            },
        };
    };

    const getStudyReminderText = () => {
        const { enabled, time, days } = state.studyReminder;

        if (!enabled) return 'Pengingat tidak aktif';

        const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const selectedDays = days.map(day => dayNames[day]).join(', ');

        return `Setiap ${selectedDays} pada ${time}`;
    };

    const getLayoutClasses = () => {
        switch (state.dashboardLayout) {
            case DASHBOARD_LAYOUTS.COMPACT:
                return 'space-y-4 text-sm';
            case DASHBOARD_LAYOUTS.SPACIOUS:
                return 'space-y-8 text-lg';
            default:
                return 'space-y-6 text-base';
        }
    };

    // Context value
    const value = {
        // State
        ...state,

        // Actions
        setLanguage,
        setNotifications,
        setDailyGoal,
        setStudyReminder,
        setDashboardLayout,
        setQuizPreferences,
        setForumPreferences,
        updatePreferences,
        resetPreferences,

        // Utility functions
        isNotificationEnabled,
        getDailyGoalProgress,
        getStudyReminderText,
        getLayoutClasses,

        // Constants
        LANGUAGES,
        DASHBOARD_LAYOUTS,
    };

    return (
        <UserPreferencesContext.Provider value={value}>
            {children}
        </UserPreferencesContext.Provider>
    );
};

// Custom hook to use user preferences context
export const useUserPreferences = () => {
    const context = useContext(UserPreferencesContext);
    if (!context) {
        throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
    }
    return context;
};

export default UserPreferencesContext;
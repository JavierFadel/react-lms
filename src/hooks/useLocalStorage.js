// src/hooks/useLocalStorage.js
import { useState, useEffect, useCallback } from 'react';

export const useLocalStorage = (key, initialValue) => {
    // Get from local storage then parse stored json or return initialValue
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that persists the new value to localStorage
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have the same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    // Remove value from localStorage
    const removeValue = () => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue];
};

export const useSessionStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading sessionStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting sessionStorage key "${key}":`, error);
        }
    };

    const removeValue = () => {
        try {
            window.sessionStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing sessionStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue, removeValue];
};

// Hook for managing user preferences
export const usePreferences = () => {
    const [preferences, setPreferences, removePreferences] = useLocalStorage('userPreferences', {
        theme: 'light',
        notifications: true,
        dailyGoal: 2,
        language: 'id',
        autoSave: true,
        studyReminders: true,
        emailNotifications: false
    });

    const updatePreference = (key, value) => {
        setPreferences(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const resetPreferences = () => {
        removePreferences();
    };

    return {
        preferences,
        updatePreference,
        resetPreferences,
        setPreferences
    };
};

// Hook for managing quiz progress
export const useQuizProgress = () => {
    const [progress, setProgress, removeProgress] = useLocalStorage('quizProgress', {});

    const saveQuizProgress = (quizId, questionIndex, answers, timeSpent) => {
        setProgress(prev => ({
            ...prev,
            [quizId]: {
                currentQuestion: questionIndex,
                answers,
                timeSpent,
                lastSaved: new Date().toISOString()
            }
        }));
    };

    // const getQuizProgress = (quizId) => {
    //     return progress[quizId] || null;
    // };

    const getQuizProgress = useCallback((quizId) => {
        try {
            const item = window.localStorage.getItem(`quiz_progress_${quizId}`);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error("Error getting quiz progress:", error);
            return null;
        }
    }, []);

    const clearQuizProgress = (quizId) => {
        setProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[quizId];
            return newProgress;
        });
    };

    const clearAllProgress = () => {
        removeProgress();
    };

    return {
        progress,
        saveQuizProgress,
        getQuizProgress,
        clearQuizProgress,
        clearAllProgress
    };
};
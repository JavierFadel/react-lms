import { api, handleApiError } from './api.js';

// User Service - handles all user-related API operations
export const userService = {
    // Authentication
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    logout: async () => {
        try {
            const response = await api.post('/auth/logout');
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // User profile management
    getUserProfile: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    updateUserProfile: async (userId, profileData) => {
        try {
            const response = await api.put(`/users/${userId}`, profileData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // User preferences
    getUserPreferences: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/preferences`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    updateUserPreferences: async (userId, preferences) => {
        try {
            const response = await api.put(`/users/${userId}/preferences`, preferences);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // User achievements
    getUserAchievements: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/achievements`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    unlockAchievement: async (userId, achievementId) => {
        try {
            const response = await api.post(`/users/${userId}/achievements/${achievementId}/unlock`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // User progress tracking
    getUserProgress: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/progress`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    updateUserProgress: async (userId, progressData) => {
        try {
            const response = await api.put(`/users/${userId}/progress`, progressData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Learning path management
    getUserLearningPath: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/learning-path`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    updateLearningPath: async (userId, pathData) => {
        try {
            const response = await api.put(`/users/${userId}/learning-path`, pathData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // User activity tracking
    trackUserActivity: async (userId, activity) => {
        try {
            const response = await api.post(`/users/${userId}/activity`, {
                ...activity,
                timestamp: new Date().toISOString()
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    getUserActivity: async (userId, dateRange = '30d') => {
        try {
            const response = await api.get(`/users/${userId}/activity`, {
                dateRange
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Bookmarks and favorites
    getUserBookmarks: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/bookmarks`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    addBookmark: async (userId, bookmarkData) => {
        try {
            const response = await api.post(`/users/${userId}/bookmarks`, bookmarkData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    removeBookmark: async (userId, bookmarkId) => {
        try {
            const response = await api.delete(`/users/${userId}/bookmarks/${bookmarkId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // User notifications
    getUserNotifications: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/notifications`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    markNotificationAsRead: async (userId, notificationId) => {
        try {
            const response = await api.put(`/users/${userId}/notifications/${notificationId}/read`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // User statistics
    getUserStatistics: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/statistics`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};
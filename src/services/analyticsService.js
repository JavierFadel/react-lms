import { api, handleApiError } from './api.js';

// Analytics Service - handles all analytics and reporting operations
export const analyticsService = {
    // Get dashboard summary metrics
    getDashboardMetrics: async (userId, dateRange = '30d') => {
        try {
            const response = await api.get(`/analytics/dashboard/${userId}`, {
                dateRange
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get learning progress over time
    getLearningProgress: async (userId, period = 'weekly') => {
        try {
            const response = await api.get(`/analytics/learning-progress/${userId}`, {
                period
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get study time analytics
    getStudyTimeAnalytics: async (userId, groupBy = 'category') => {
        try {
            const response = await api.get(`/analytics/study-time/${userId}`, {
                groupBy
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get module status distribution
    getModuleStatusDistribution: async (userId) => {
        try {
            const response = await api.get(`/analytics/module-status/${userId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get cumulative study hours
    getCumulativeStudyHours: async (userId, dateRange = '30d') => {
        try {
            const response = await api.get(`/analytics/cumulative-hours/${userId}`, {
                dateRange
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get skill assessment radar data
    getSkillAssessment: async (userId) => {
        try {
            const response = await api.get(`/analytics/skill-assessment/${userId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get quiz performance analytics
    getQuizPerformanceAnalytics: async (userId, quizId = null) => {
        try {
            const endpoint = quizId
                ? `/analytics/quiz-performance/${userId}/${quizId}`
                : `/analytics/quiz-performance/${userId}`;
            const response = await api.get(endpoint);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get learning streak data
    getLearningStreak: async (userId) => {
        try {
            const response = await api.get(`/analytics/learning-streak/${userId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Track learning activity
    trackLearningActivity: async (userId, activityData) => {
        try {
            const response = await api.post(`/analytics/track-activity/${userId}`, {
                ...activityData,
                timestamp: new Date().toISOString()
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get instructor analytics (class overview)
    getInstructorAnalytics: async (instructorId, classId = null) => {
        try {
            const endpoint = classId
                ? `/analytics/instructor/${instructorId}/class/${classId}`
                : `/analytics/instructor/${instructorId}`;
            const response = await api.get(endpoint);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get class performance metrics
    getClassPerformanceMetrics: async (classId) => {
        try {
            const response = await api.get(`/analytics/class-performance/${classId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get student engagement metrics
    getStudentEngagementMetrics: async (classId, period = 'weekly') => {
        try {
            const response = await api.get(`/analytics/student-engagement/${classId}`, {
                period
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get content analytics
    getContentAnalytics: async (contentId, contentType) => {
        try {
            const response = await api.get(`/analytics/content/${contentType}/${contentId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get learning recommendations
    getLearningRecommendations: async (userId) => {
        try {
            const response = await api.get(`/analytics/recommendations/${userId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Generate analytics report
    generateAnalyticsReport: async (reportType, parameters) => {
        try {
            const response = await api.post('/analytics/generate-report', {
                reportType,
                parameters,
                generatedAt: new Date().toISOString()
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};
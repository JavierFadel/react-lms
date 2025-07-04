import { api, handleApiError } from "./api";

// Quiz Service - handles all quiz-related API operations
export const quizServices = {
    // Get all quizzes
    getAllQuizzes: async () => {
        try {
            const response = await api.get('/quizzes');
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get quiz by ID
    getQuizById: async (quizId) => {
        try {
            const response = await api.get(`/quizzes/${quizId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Create new quiz
    createQuiz: async (quizData) => {
        try {
            const response = await api.post('/quizzes', quizData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Update quiz
    updateQuiz: async (quizId, quizData) => {
        try {
            const response = await api.put(`/quizzes/${quizId}`, quizData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Delete quiz
    deleteQuiz: async (quizId) => {
        try {
            const response = await api.delete(`/quizzes/${quizId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Submit quiz answers
    submitQuizAnswers: async (quizId, answers, timeTaken) => {
        try {
            const submissionData = {
                quizId,
                answers,
                timeTaken,
                submittedAt: new Date().toISOString()
            };
            const response = await api.post(`/quizzes/${quizId}/submit`, submissionData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get quiz results
    getQuizResults: async (quizId, userId) => {
        try {
            const response = await api.get(`/quizzes/${quizId}/results/${userId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get quiz statistics
    getQuizStatistics: async (quizId) => {
        try {
            const response = await api.get(`/quizzes/${quizId}/statistics`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get user's quiz history
    getUserQuizHistory: async (userId) => {
        try {
            const response = await api.get(`/users/${userId}/quiz-history`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Save quiz progress (for auto-save functionality)
    saveQuizProgress: async (quizId, currentAnswers, currentQuestionIndex) => {
        try {
            const progressData = {
                quizId,
                currentAnswers,
                currentQuestionIndex,
                savedAt: new Date().toISOString()
            };
            const response = await api.post(`/quizzes/${quizId}/progress`, progressData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get saved quiz progress
    getQuizProgress: async (quizId, userId) => {
        try {
            const response = await api.get(`/quizzes/${quizId}/progress/${userId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    }
}
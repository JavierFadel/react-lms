import { api, handleApiError } from './api.js';

// Forum Service - handles all forum-related API operations
export const forumService = {
    // Get all forum categories
    getCategories: async () => {
        try {
            const response = await api.get('/forum/categories');
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get threads by category
    getThreadsByCategory: async (categoryId, page = 1, limit = 10) => {
        try {
            const response = await api.get(`/forum/categories/${categoryId}/threads`, {
                page,
                limit
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get all threads with pagination
    getAllThreads: async (page = 1, limit = 10, sortBy = 'newest') => {
        try {
            const response = await api.get('/forum/threads', {
                page,
                limit,
                sortBy
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get thread by ID with replies
    getThreadById: async (threadId) => {
        try {
            const response = await api.get(`/forum/threads/${threadId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Create new thread
    createThread: async (threadData) => {
        try {
            const response = await api.post('/forum/threads', threadData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Update thread
    updateThread: async (threadId, threadData) => {
        try {
            const response = await api.put(`/forum/threads/${threadId}`, threadData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Delete thread
    deleteThread: async (threadId) => {
        try {
            const response = await api.delete(`/forum/threads/${threadId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Add reply to thread
    addReply: async (threadId, replyData) => {
        try {
            const response = await api.post(`/forum/threads/${threadId}/replies`, replyData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Update reply
    updateReply: async (threadId, replyId, replyData) => {
        try {
            const response = await api.put(`/forum/threads/${threadId}/replies/${replyId}`, replyData);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Delete reply
    deleteReply: async (threadId, replyId) => {
        try {
            const response = await api.delete(`/forum/threads/${threadId}/replies/${replyId}`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Vote on thread (upvote/downvote)
    voteOnThread: async (threadId, voteType) => {
        try {
            const response = await api.post(`/forum/threads/${threadId}/vote`, { voteType });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Vote on reply
    voteOnReply: async (threadId, replyId, voteType) => {
        try {
            const response = await api.post(`/forum/threads/${threadId}/replies/${replyId}/vote`, { voteType });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Search threads
    searchThreads: async (query, filters = {}) => {
        try {
            const response = await api.get('/forum/search', {
                query,
                ...filters
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Mark thread as solved
    markThreadAsSolved: async (threadId, solutionReplyId) => {
        try {
            const response = await api.post(`/forum/threads/${threadId}/solve`, {
                solutionReplyId
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Pin/unpin thread
    pinThread: async (threadId, isPinned) => {
        try {
            const response = await api.post(`/forum/threads/${threadId}/pin`, { isPinned });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Report thread/reply
    reportContent: async (contentType, contentId, reason) => {
        try {
            const response = await api.post('/forum/report', {
                contentType,
                contentId,
                reason,
                reportedAt: new Date().toISOString()
            });
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    },

    // Get user's forum statistics
    getUserForumStats: async (userId) => {
        try {
            const response = await api.get(`/forum/users/${userId}/stats`);
            return response;
        } catch (error) {
            throw handleApiError(error);
        }
    }
};
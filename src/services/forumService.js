import { forumThreads, forumCategories, forumThreadDetail, users } from '../utils/dummyData.js';

// Simulate API delays
const simulateApiDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate unique IDs
const generateId = (prefix = 'item') => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Forum Service - handles all forum-related operations with dummy data
export const forumService = {
    // Get all threads with pagination and sorting
    getThreads: async ({ page = 1, limit = 10, sortBy = 'newest', categoryId = null } = {}) => {
        await simulateApiDelay(400);
        
        let filteredThreads = [...forumThreads];
        
        // Filter by category if provided
        if (categoryId) {
            filteredThreads = filteredThreads.filter(thread => thread.categoryId === categoryId);
        }
        
        // Sort threads
        switch (sortBy) {
            case 'newest':
                filteredThreads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                filteredThreads.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'mostVoted':
                filteredThreads.sort((a, b) => b.votes - a.votes);
                break;
            case 'mostReplied':
                filteredThreads.sort((a, b) => b.replies - a.replies);
                break;
            case 'mostViewed':
                filteredThreads.sort((a, b) => b.views - a.views);
                break;
            default:
                filteredThreads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        
        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedThreads = filteredThreads.slice(startIndex, endIndex);
        
        return {
            data: paginatedThreads,
            pagination: {
                page,
                limit,
                total: filteredThreads.length,
                totalPages: Math.ceil(filteredThreads.length / limit),
                hasNext: endIndex < filteredThreads.length,
                hasPrev: page > 1
            }
        };
    },

    // Get all categories
    getCategories: async () => {
        await simulateApiDelay(300);
        return forumCategories;
    },

    // Get thread by ID with full details
    getThreadById: async (threadId) => {
        await simulateApiDelay(400);
        
        // First try to find in forumThreadDetail
        const threadDetail = forumThreadDetail[`thread${threadId}`];
        if (threadDetail) {
            return {
                ...threadDetail,
                replies: threadDetail.replies || []
            };
        }
        
        // Fallback to forumThreads
        const thread = forumThreads.find(t => t.id === parseInt(threadId));
        if (!thread) {
            throw new Error('Thread not found');
        }
        
        return {
            ...thread,
            replies: []
        };
    },

    // Create new thread
    createThread: async (threadData) => {
        await simulateApiDelay(500);
        
        const newThread = {
            id: forumThreads.length + 1,
            title: threadData.title,
            content: threadData.content,
            excerpt: threadData.content.substring(0, 150) + '...',
            author: users[0], // Use first user as current user
            categoryId: threadData.categoryId || 1,
            tags: threadData.tags || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            views: 0,
            votes: 0,
            replies: 0,
            isPinned: false,
            isSolved: false,
            isHot: false,
            lastReply: null
        };
        
        // In a real app, this would be saved to the backend
        // For now, we'll just return the new thread
        return newThread;
    },

    // Update thread
    updateThread: async ({ threadId, threadData }) => {
        await simulateApiDelay(400);
        
        const thread = forumThreads.find(t => t.id === parseInt(threadId));
        if (!thread) {
            throw new Error('Thread not found');
        }
        
        const updatedThread = {
            ...thread,
            ...threadData,
            updatedAt: new Date().toISOString()
        };
        
        return updatedThread;
    },

    // Delete thread
    deleteThread: async (threadId) => {
        await simulateApiDelay(300);
        
        const thread = forumThreads.find(t => t.id === parseInt(threadId));
        if (!thread) {
            throw new Error('Thread not found');
        }
        
        return { success: true, message: 'Thread deleted successfully' };
    },

    // Add reply to thread
    addReply: async ({ threadId, replyData }) => {
        await simulateApiDelay(500);
        
        const newReply = {
            id: generateId('reply'),
            threadId: parseInt(threadId),
            content: replyData.content,
            author: users[0], // Use first user as current user
            createdAt: new Date().toISOString(),
            votes: 0,
            isAccepted: false,
            mentions: replyData.mentions || []
        };
        
        // In a real app, this would be saved to the backend
        return newReply;
    },

    // Update reply
    updateReply: async ({ threadId, replyId, replyData }) => {
        await simulateApiDelay(400);
        
        const updatedReply = {
            id: replyId,
            threadId: parseInt(threadId),
            content: replyData.content,
            author: users[0],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            votes: 0,
            isAccepted: false,
            mentions: replyData.mentions || []
        };
        
        return updatedReply;
    },

    // Delete reply
    deleteReply: async ({ threadId, replyId }) => {
        await simulateApiDelay(300);
        
        return { success: true, message: 'Reply deleted successfully' };
    },

    // Vote on thread
    voteOnThread: async ({ threadId, voteType }) => {
        await simulateApiDelay(300);
        
        const thread = forumThreads.find(t => t.id === parseInt(threadId));
        if (!thread) {
            throw new Error('Thread not found');
        }
        
        // Simulate vote update
        const updatedVotes = voteType === 'upvote' ? thread.votes + 1 : thread.votes - 1;
        
        return {
            threadId: parseInt(threadId),
            newVoteCount: updatedVotes,
            userVote: voteType
        };
    },

    // Vote on reply
    voteOnReply: async ({ threadId, replyId, voteType }) => {
        await simulateApiDelay(300);
        
        return {
            replyId,
            threadId: parseInt(threadId),
            newVoteCount: voteType === 'upvote' ? 1 : -1,
            userVote: voteType
        };
    },

    // Search threads
    searchThreads: async ({ query, filters = {} }) => {
        await simulateApiDelay(600);
        
        let filteredThreads = [...forumThreads];
        
        // Apply search query
        if (query) {
            const searchTerm = query.toLowerCase();
            filteredThreads = filteredThreads.filter(thread => 
                thread.title.toLowerCase().includes(searchTerm) ||
                thread.content.toLowerCase().includes(searchTerm) ||
                thread.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        // Apply filters
        if (filters.categoryId) {
            filteredThreads = filteredThreads.filter(thread => thread.categoryId === filters.categoryId);
        }
        
        if (filters.isSolved !== undefined) {
            filteredThreads = filteredThreads.filter(thread => thread.isSolved === filters.isSolved);
        }
        
        if (filters.isPinned !== undefined) {
            filteredThreads = filteredThreads.filter(thread => thread.isPinned === filters.isPinned);
        }
        
        // Sort results
        const sortBy = filters.sortBy || 'newest';
        switch (sortBy) {
            case 'newest':
                filteredThreads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'mostRelevant':
                // Simple relevance scoring based on title match
                filteredThreads.sort((a, b) => {
                    const aScore = a.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 1;
                    const bScore = b.title.toLowerCase().includes(query.toLowerCase()) ? 2 : 1;
                    return bScore - aScore;
                });
                break;
        }
        
        return {
            data: filteredThreads,
            total: filteredThreads.length,
            query,
            filters
        };
    },

    // Mark thread as solved
    markThreadAsSolved: async ({ threadId, solutionReplyId }) => {
        await simulateApiDelay(400);
        
        const thread = forumThreads.find(t => t.id === parseInt(threadId));
        if (!thread) {
            throw new Error('Thread not found');
        }
        
        return {
            threadId: parseInt(threadId),
            isSolved: true,
            solutionReplyId,
            updatedAt: new Date().toISOString()
        };
    },

    // Pin/unpin thread
    pinThread: async ({ threadId, isPinned }) => {
        await simulateApiDelay(300);
        
        const thread = forumThreads.find(t => t.id === parseInt(threadId));
        if (!thread) {
            throw new Error('Thread not found');
        }
        
        return {
            threadId: parseInt(threadId),
            isPinned,
            updatedAt: new Date().toISOString()
        };
    },

    // Report content
    reportContent: async ({ contentType, contentId, reason }) => {
        await simulateApiDelay(400);
        
        return {
            reportId: generateId('report'),
            contentType,
            contentId,
            reason,
            reportedAt: new Date().toISOString(),
            status: 'pending'
        };
    },

    // Get user's forum statistics
    getUserForumStats: async (userId) => {
        await simulateApiDelay(400);
        
        const user = users.find(u => u.id === parseInt(userId));
        if (!user) {
            throw new Error('User not found');
        }
        
        return {
            userId: parseInt(userId),
            totalPosts: user.stats.forumPosts,
            totalThreads: Math.floor(user.stats.forumPosts * 0.3), // Estimate
            totalReplies: Math.floor(user.stats.forumPosts * 0.7), // Estimate
            reputation: user.reputation,
            badges: [user.badge],
            joinDate: user.joinedAt,
            lastActive: user.lastActive
        };
    },

    // Get threads by category
    getThreadsByCategory: async ({ categoryId, page = 1, limit = 10 } = {}) => {
        return forumService.getThreads({ page, limit, categoryId });
    },

    // Get all threads (alias for getThreads)
    getAllThreads: async (params = {}) => {
        return forumService.getThreads(params);
    }
};

// Legacy function for backward compatibility
export const getForumThreads = async () => {
    const result = await forumService.getThreads();
    return result.data;
};
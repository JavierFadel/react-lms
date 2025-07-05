// src/hooks/useForum.js
import { 
    useState, 
    useEffect, 
    useCallback,
    useMemo
} from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getForumThreads } from '../services/forumService';
import { forumService } from '../services/forumService.js';

// Query keys for forum data
export const forumKeys = {
    all: ['forum'],
    threads: (params) => [...forumKeys.all, 'threads', params],
    thread: (id) => [...forumKeys.all, 'thread', id],
    categories: () => [...forumKeys.all, 'categories'],
    search: (query, filters) => [...forumKeys.all, 'search', query, filters],
    userStats: (userId) => [...forumKeys.all, 'user-stats', userId],
};

export const useForum = () => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const [filters, setFilters] = useState({
        keyword: '',
        category: 'all',
        tag: '',
        sortBy: 'latest',
    });

    // Mock forum data
    const mockThreads = [
        {
            id: 1,
            title: 'Help with React useState Hook',
            content: 'I am having trouble understanding how useState works...',
            author: {
                id: 1,
                name: 'John Doe',
                avatar: '/api/placeholder/32/32',
                reputation: 150
            },
            category: 'programming',
            tags: ['react', 'hooks', 'javascript'],
            replies: 5,
            views: 120,
            votes: 8,
            solved: false,
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T14:20:00Z',
            isPinned: false
        },
        {
            id: 2,
            title: 'Database Design Best Practices',
            content: 'What are the best practices for designing a database schema?',
            author: {
                id: 2,
                name: 'Jane Smith',
                avatar: '/api/placeholder/32/32',
                reputation: 200
            },
            category: 'database',
            tags: ['database', 'design', 'sql'],
            replies: 12,
            views: 300,
            votes: 15,
            solved: true,
            createdAt: '2024-01-14T09:15:00Z',
            updatedAt: '2024-01-15T16:45:00Z',
            isPinned: true
        }
    ];

    // Load forum data
    useEffect(() => {
        const loadThreads = async () => {
            setLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setThreads(mockThreads);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadThreads();
    }, []);

    // Mengambil semua categories
    const categories = useMemo(() => {
        // Mengambil semua nama kategori unik dari data threads
        const uniqueCategoryNames = [...new Set(threads.map(thread => thread.category))];
        
        // Membuat array objek kategori yang sesuai untuk dropdown filter
        return uniqueCategoryNames.map((name, index) => ({
            id: index + 1, // atau gunakan nama sebagai id jika unik
            name: name,
        }));
    }, [threads]);

    // Filter and search threads
    const filteredThreads = useCallback(() => {
        let filtered = threads;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(thread =>
                thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                thread.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Apply category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(thread => thread.category === selectedCategory);
            console.log(filtered)
        }

        // Apply sorting
        filtered = filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'most_replies':
                    return b.replies - a.replies;
                case 'most_views':
                    return b.views - a.views;
                case 'most_votes':
                    return b.votes - a.votes;
                default:
                    return 0;
            }
        });

        // Separate pinned threads
        const pinnedThreads = filtered.filter(thread => thread.isPinned);
        const regularThreads = filtered.filter(thread => !thread.isPinned);

        return [...pinnedThreads, ...regularThreads];
    }, [threads, searchTerm, selectedCategory, sortBy]);

    // Pagination
    const paginatedThreads = useCallback(() => {
        const filtered = filteredThreads();
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filtered.slice(startIndex, endIndex);
    }, [filteredThreads, currentPage, pageSize]);

    const totalPages = Math.ceil(filteredThreads().length / pageSize);

    // Thread actions
    const createThread = useCallback(async (threadData) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newThread = {
                id: Date.now(),
                ...threadData,
                author: {
                    id: 1,
                    name: 'Current User',
                    avatar: '/api/placeholder/32/32',
                    reputation: 100
                },
                replies: 0,
                views: 0,
                votes: 0,
                solved: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isPinned: false
            };

            setThreads(prev => [newThread, ...prev]);
            return { success: true, thread: newThread };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const updateThread = useCallback(async (threadId, updates) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            setThreads(prev => prev.map(thread =>
                thread.id === threadId
                    ? { ...thread, ...updates, updatedAt: new Date().toISOString() }
                    : thread
            ));

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteThread = useCallback(async (threadId) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            setThreads(prev => prev.filter(thread => thread.id !== threadId));
            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }, []);

    const voteThread = useCallback(async (threadId, voteType) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 300));

            setThreads(prev => prev.map(thread =>
                thread.id === threadId
                    ? {
                        ...thread,
                        votes: voteType === 'up' ? thread.votes + 1 : thread.votes - 1
                    }
                    : thread
            ));

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    const markAsSolved = useCallback(async (threadId) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 300));

            setThreads(prev => prev.map(thread =>
                thread.id === threadId
                    ? { ...thread, solved: true, updatedAt: new Date().toISOString() }
                    : thread
            ));

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    const pinThread = useCallback(async (threadId) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 300));

            setThreads(prev => prev.map(thread =>
                thread.id === threadId
                    ? { ...thread, isPinned: !thread.isPinned }
                    : thread
            ));

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        }
    }, []);

    // Search and filter actions
    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, []);

    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    }, []);

    const handleSortChange = useCallback((sort) => {
        setSortBy(sort);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    // Get thread by ID
    const getThreadById = useCallback((threadId) => {
        return threads.find(thread => thread.id === parseInt(threadId));
    }, [threads]);

    // Get forum statistics
    const getForumStats = useCallback(() => {
        return {
            totalThreads: threads.length,
            totalReplies: threads.reduce((sum, thread) => sum + thread.replies, 0),
            totalViews: threads.reduce((sum, thread) => sum + thread.views, 0),
            solvedThreads: threads.filter(thread => thread.solved).length,
            categories: [...new Set(threads.map(thread => thread.category))],
            topTags: [...new Set(threads.flatMap(thread => thread.tags))].slice(0, 10)
        };
    }, [threads]);

    return {
        // Data
        threads: paginatedThreads(),
        allThreads: threads,
        categories: categories,
        loading,
        error,

        // Filters and search
        searchTerm,
        selectedCategory,
        sortBy,
        currentPage,
        totalPages,

        // Actions
        createThread,
        updateThread,
        deleteThread,
        voteThread,
        markAsSolved,
        pinThread,

        // Search and filter
        handleSearch,
        handleCategoryChange,
        handleSortChange,
        handlePageChange,

        // Utilities
        getThreadById,
        getForumStats,
        filteredThreads
    };
};

// FIXME: bind this to the rest of the hooks above
// Hook to fetch all forum threads
export const useForumThreads = () => {
    return useQuery({
        queryKey: ['forumThreads'],
        queryFn: getForumThreads,
    });
};

// Hook to get all threads with pagination and filtering
export const useThreads = (params = {}) => {
    return useQuery({
        queryKey: forumKeys.threads(params),
        queryFn: () => forumService.getThreads(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Hook to get threads by category
export const useThreadsByCategory = (categoryId, params = {}) => {
    return useQuery({
        queryKey: forumKeys.threads({ ...params, categoryId }),
        queryFn: () => forumService.getThreadsByCategory({ categoryId, ...params }),
        enabled: !!categoryId,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
    });
};

// Hook to get all categories
export const useCategories = () => {
    return useQuery({
        queryKey: forumKeys.categories(),
        queryFn: () => forumService.getCategories(),
        staleTime: 30 * 60 * 1000, // 30 minutes
        gcTime: 60 * 60 * 1000, // 1 hour
    });
};

// Hook to get a single thread by ID
export const useThread = (threadId) => {
    return useQuery({
        queryKey: forumKeys.thread(threadId),
        queryFn: () => forumService.getThreadById(threadId),
        enabled: !!threadId,
        staleTime: 2 * 60 * 1000, // 2 minutes
        gcTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to search threads
export const useSearchThreads = (query, filters = {}) => {
    return useQuery({
        queryKey: forumKeys.search(query, filters),
        queryFn: () => forumService.searchThreads({ query, filters }),
        enabled: !!query && query.length > 2, // Only search if query is longer than 2 characters
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    });
};

// Hook to get user forum statistics
export const useUserForumStats = (userId) => {
    return useQuery({
        queryKey: forumKeys.userStats(userId),
        queryFn: () => forumService.getUserForumStats(userId),
        enabled: !!userId,
        staleTime: 10 * 60 * 1000, // 10 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
    });
};

// Mutation hooks
export const useCreateThread = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (threadData) => forumService.createThread(threadData),
        onSuccess: (newThread) => {
            // Invalidate and refetch threads
            queryClient.invalidateQueries({ queryKey: forumKeys.threads() });
            
            // Add the new thread to the cache
            queryClient.setQueryData(
                forumKeys.thread(newThread.id),
                newThread
            );
        },
        onError: (error) => {
            console.error('Failed to create thread:', error);
        },
    });
};

export const useUpdateThread = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ threadId, threadData }) => forumService.updateThread({ threadId, threadData }),
        onSuccess: (updatedThread) => {
            // Update the thread in cache
            queryClient.setQueryData(
                forumKeys.thread(updatedThread.id),
                updatedThread
            );
            
            // Invalidate threads list to reflect changes
            queryClient.invalidateQueries({ queryKey: forumKeys.threads() });
        },
        onError: (error) => {
            console.error('Failed to update thread:', error);
        },
    });
};

export const useDeleteThread = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (threadId) => forumService.deleteThread(threadId),
        onSuccess: (_, threadId) => {
            // Remove thread from cache
            queryClient.removeQueries({ queryKey: forumKeys.thread(threadId) });
            
            // Invalidate threads list
            queryClient.invalidateQueries({ queryKey: forumKeys.threads() });
        },
        onError: (error) => {
            console.error('Failed to delete thread:', error);
        },
    });
};

export const useAddReply = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ threadId, replyData }) => forumService.addReply({ threadId, replyData }),
        onSuccess: (newReply, { threadId }) => {
            // Update the thread with the new reply
            queryClient.setQueryData(
                forumKeys.thread(threadId),
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        replies: [...(oldData.replies || []), newReply],
                        replies: (oldData.replies || 0) + 1,
                    };
                }
            );
            
            // Invalidate threads list to update reply count
            queryClient.invalidateQueries({ queryKey: forumKeys.threads() });
        },
        onError: (error) => {
            console.error('Failed to add reply:', error);
        },
    });
};

export const useUpdateReply = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ threadId, replyId, replyData }) => 
            forumService.updateReply({ threadId, replyId, replyData }),
        onSuccess: (updatedReply, { threadId }) => {
            // Update the reply in the thread cache
            queryClient.setQueryData(
                forumKeys.thread(threadId),
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        replies: (oldData.replies || []).map(reply => 
                            reply.id === updatedReply.id ? updatedReply : reply
                        ),
                    };
                }
            );
        },
        onError: (error) => {
            console.error('Failed to update reply:', error);
        },
    });
};

export const useDeleteReply = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ threadId, replyId }) => forumService.deleteReply({ threadId, replyId }),
        onSuccess: (_, { threadId, replyId }) => {
            // Remove reply from thread cache
            queryClient.setQueryData(
                forumKeys.thread(threadId),
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        replies: (oldData.replies || []).filter(reply => reply.id !== replyId),
                        replies: Math.max(0, (oldData.replies || 0) - 1),
                    };
                }
            );
            
            // Invalidate threads list to update reply count
            queryClient.invalidateQueries({ queryKey: forumKeys.threads() });
        },
        onError: (error) => {
            console.error('Failed to delete reply:', error);
        },
    });
};

export const useVoteThread = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ threadId, voteType }) => forumService.voteOnThread({ threadId, voteType }),
        onSuccess: (result, { threadId }) => {
            // Update thread vote count in cache
            queryClient.setQueryData(
                forumKeys.thread(threadId),
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        votes: result.newVoteCount,
                    };
                }
            );
            
            // Update vote count in threads list
            queryClient.setQueryData(
                forumKeys.threads(),
                (oldData) => {
                    if (!oldData?.data) return oldData;
                    return {
                        ...oldData,
                        data: oldData.data.map(thread => 
                            thread.id === parseInt(threadId) 
                                ? { ...thread, votes: result.newVoteCount }
                                : thread
                        ),
                    };
                }
            );
        },
        onError: (error) => {
            console.error('Failed to vote on thread:', error);
        },
    });
};

export const useVoteReply = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ threadId, replyId, voteType }) => 
            forumService.voteOnReply({ threadId, replyId, voteType }),
        onSuccess: (result, { threadId, replyId }) => {
            // Update reply vote count in thread cache
            queryClient.setQueryData(
                forumKeys.thread(threadId),
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        replies: (oldData.replies || []).map(reply => 
                            reply.id === replyId 
                                ? { ...reply, votes: (reply.votes || 0) + result.newVoteCount }
                                : reply
                        ),
                    };
                }
            );
        },
        onError: (error) => {
            console.error('Failed to vote on reply:', error);
        },
    });
};

export const useMarkThreadSolved = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ threadId, solutionReplyId }) => 
            forumService.markThreadAsSolved({ threadId, solutionReplyId }),
        onSuccess: (result, { threadId }) => {
            // Update thread solved status in cache
            queryClient.setQueryData(
                forumKeys.thread(threadId),
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        isSolved: result.isSolved,
                        solutionReplyId: result.solutionReplyId,
                        updatedAt: result.updatedAt,
                    };
                }
            );
            
            // Update in threads list
            queryClient.setQueryData(
                forumKeys.threads(),
                (oldData) => {
                    if (!oldData?.data) return oldData;
                    return {
                        ...oldData,
                        data: oldData.data.map(thread => 
                            thread.id === parseInt(threadId) 
                                ? { ...thread, isSolved: result.isSolved }
                                : thread
                        ),
                    };
                }
            );
        },
        onError: (error) => {
            console.error('Failed to mark thread as solved:', error);
        },
    });
};

export const usePinThread = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ threadId, isPinned }) => forumService.pinThread({ threadId, isPinned }),
        onSuccess: (result, { threadId }) => {
            // Update thread pinned status in cache
            queryClient.setQueryData(
                forumKeys.thread(threadId),
                (oldData) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        isPinned: result.isPinned,
                        updatedAt: result.updatedAt,
                    };
                }
            );
            
            // Update in threads list
            queryClient.setQueryData(
                forumKeys.threads(),
                (oldData) => {
                    if (!oldData?.data) return oldData;
                    return {
                        ...oldData,
                        data: oldData.data.map(thread => 
                            thread.id === parseInt(threadId) 
                                ? { ...thread, isPinned: result.isPinned }
                                : thread
                        ),
                    };
                }
            );
        },
        onError: (error) => {
            console.error('Failed to pin/unpin thread:', error);
        },
    });
};

export const useReportContent = () => {
    return useMutation({
        mutationFn: ({ contentType, contentId, reason }) => 
            forumService.reportContent({ contentType, contentId, reason }),
        onError: (error) => {
            console.error('Failed to report content:', error);
        },
    });
};

// Utility function to prefetch thread data
export const prefetchThread = (queryClient, threadId) => {
    return queryClient.prefetchQuery({
        queryKey: forumKeys.thread(threadId),
        queryFn: () => forumService.getThreadById(threadId),
        staleTime: 2 * 60 * 1000,
    });
};

// Utility function to prefetch threads list
export const prefetchThreads = (queryClient, params = {}) => {
    return queryClient.prefetchQuery({
        queryKey: forumKeys.threads(params),
        queryFn: () => forumService.getThreads(params),
        staleTime: 5 * 60 * 1000,
    });
};
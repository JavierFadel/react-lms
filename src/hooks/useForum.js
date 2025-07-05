// src/hooks/useForum.js
import { 
    useState, 
    useEffect, 
    useCallback,
    useMemo
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getForumThreads } from '../services/forumService';

export const useForum = () => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

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
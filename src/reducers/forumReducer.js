// Forum Reducer - manages forum state and actions
const initialForumState = {
    // Forum data
    categories: [],
    threads: [],
    currentThread: null,
    replies: [],

    // Search and filter state
    searchQuery: '',
    searchResults: [],
    activeFilters: {
        category: null,
        sortBy: 'newest',
        status: 'all', // all, solved, unsolved
        tags: [],
    },

    // Pagination state
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,

    // Form state
    newThreadForm: {
        title: '',
        content: '',
        category: '',
        tags: [],
    },
    newReplyForm: {
        content: '',
        parentReplyId: null,
    },

    // UI state
    showNewThreadModal: false,
    showReplyForm: false,
    showSearchModal: false,
    expandedReplies: [],

    // Loading and error states
    loading: false,
    submitting: false,
    error: null,

    // User interaction state
    votedThreads: [],
    votedReplies: [],
    bookmarkedThreads: [],
};

// Action types
export const FORUM_ACTIONS = {
    // Data loading actions
    LOAD_CATEGORIES_START: 'LOAD_CATEGORIES_START',
    LOAD_CATEGORIES_SUCCESS: 'LOAD_CATEGORIES_SUCCESS',
    LOAD_CATEGORIES_ERROR: 'LOAD_CATEGORIES_ERROR',

    LOAD_THREADS_START: 'LOAD_THREADS_START',
    LOAD_THREADS_SUCCESS: 'LOAD_THREADS_SUCCESS',
    LOAD_THREADS_ERROR: 'LOAD_THREADS_ERROR',

    LOAD_THREAD_DETAIL_START: 'LOAD_THREAD_DETAIL_START',
    LOAD_THREAD_DETAIL_SUCCESS: 'LOAD_THREAD_DETAIL_SUCCESS',
    LOAD_THREAD_DETAIL_ERROR: 'LOAD_THREAD_DETAIL_ERROR',

    // Search actions
    SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
    SEARCH_THREADS_START: 'SEARCH_THREADS_START',
    SEARCH_THREADS_SUCCESS: 'SEARCH_THREADS_SUCCESS',
    SEARCH_THREADS_ERROR: 'SEARCH_THREADS_ERROR',
    CLEAR_SEARCH: 'CLEAR_SEARCH',

    // Filter actions
    SET_FILTER: 'SET_FILTER',
    CLEAR_FILTERS: 'CLEAR_FILTERS',

    // Pagination actions
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    SET_ITEMS_PER_PAGE: 'SET_ITEMS_PER_PAGE',

    // Thread actions
    CREATE_THREAD_START: 'CREATE_THREAD_START',
    CREATE_THREAD_SUCCESS: 'CREATE_THREAD_SUCCESS',
    CREATE_THREAD_ERROR: 'CREATE_THREAD_ERROR',

    UPDATE_THREAD_START: 'UPDATE_THREAD_START',
    UPDATE_THREAD_SUCCESS: 'UPDATE_THREAD_SUCCESS',
    UPDATE_THREAD_ERROR: 'UPDATE_THREAD_ERROR',

    DELETE_THREAD_START: 'DELETE_THREAD_START',
    DELETE_THREAD_SUCCESS: 'DELETE_THREAD_SUCCESS',
    DELETE_THREAD_ERROR: 'DELETE_THREAD_ERROR',

    // Reply actions
    CREATE_REPLY_START: 'CREATE_REPLY_START',
    CREATE_REPLY_SUCCESS: 'CREATE_REPLY_SUCCESS',
    CREATE_REPLY_ERROR: 'CREATE_REPLY_ERROR',

    UPDATE_REPLY_START: 'UPDATE_REPLY_START',
    UPDATE_REPLY_SUCCESS: 'UPDATE_REPLY_SUCCESS',
    UPDATE_REPLY_ERROR: 'UPDATE_REPLY_ERROR',

    DELETE_REPLY_START: 'DELETE_REPLY_START',
    DELETE_REPLY_SUCCESS: 'DELETE_REPLY_SUCCESS',
    DELETE_REPLY_ERROR: 'DELETE_REPLY_ERROR',

    // Voting actions
    VOTE_THREAD: 'VOTE_THREAD',
    VOTE_REPLY: 'VOTE_REPLY',

    // Form actions
    UPDATE_NEW_THREAD_FORM: 'UPDATE_NEW_THREAD_FORM',
    UPDATE_NEW_REPLY_FORM: 'UPDATE_NEW_REPLY_FORM',
    RESET_NEW_THREAD_FORM: 'RESET_NEW_THREAD_FORM',
    RESET_NEW_REPLY_FORM: 'RESET_NEW_REPLY_FORM',

    // UI actions
    SHOW_NEW_THREAD_MODAL: 'SHOW_NEW_THREAD_MODAL',
    HIDE_NEW_THREAD_MODAL: 'HIDE_NEW_THREAD_MODAL',
    SHOW_REPLY_FORM: 'SHOW_REPLY_FORM',
    HIDE_REPLY_FORM: 'HIDE_REPLY_FORM',
    TOGGLE_REPLY_EXPANSION: 'TOGGLE_REPLY_EXPANSION',

    // Moderation actions
    PIN_THREAD: 'PIN_THREAD',
    MARK_THREAD_SOLVED: 'MARK_THREAD_SOLVED',
    REPORT_CONTENT: 'REPORT_CONTENT',

    // Error handling
    CLEAR_ERROR: 'CLEAR_ERROR',
};

// Forum reducer function
export const forumReducer = (state = initialForumState, action) => {
    switch (action.type) {
        // Categories loading
        case FORUM_ACTIONS.LOAD_CATEGORIES_START:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FORUM_ACTIONS.LOAD_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                categories: action.payload,
            };

        case FORUM_ACTIONS.LOAD_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Threads loading
        case FORUM_ACTIONS.LOAD_THREADS_START:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FORUM_ACTIONS.LOAD_THREADS_SUCCESS:
            return {
                ...state,
                loading: false,
                threads: action.payload.threads,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };

        case FORUM_ACTIONS.LOAD_THREADS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Thread detail loading
        case FORUM_ACTIONS.LOAD_THREAD_DETAIL_START:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FORUM_ACTIONS.LOAD_THREAD_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                currentThread: action.payload.thread,
                replies: action.payload.replies,
            };

        case FORUM_ACTIONS.LOAD_THREAD_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Search actions
        case FORUM_ACTIONS.SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            };

        case FORUM_ACTIONS.SEARCH_THREADS_START:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FORUM_ACTIONS.SEARCH_THREADS_SUCCESS:
            return {
                ...state,
                loading: false,
                searchResults: action.payload,
            };

        case FORUM_ACTIONS.SEARCH_THREADS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case FORUM_ACTIONS.CLEAR_SEARCH:
            return {
                ...state,
                searchQuery: '',
                searchResults: [],
            };

        // Filter actions
        case FORUM_ACTIONS.SET_FILTER:
            return {
                ...state,
                activeFilters: {
                    ...state.activeFilters,
                    [action.payload.filterType]: action.payload.value,
                },
            };

        case FORUM_ACTIONS.CLEAR_FILTERS:
            return {
                ...state,
                activeFilters: {
                    category: null,
                    sortBy: 'newest',
                    status: 'all',
                    tags: [],
                },
            };

        // Pagination actions
        case FORUM_ACTIONS.SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };

        case FORUM_ACTIONS.SET_ITEMS_PER_PAGE:
            return {
                ...state,
                itemsPerPage: action.payload,
                currentPage: 1, // Reset to first page
            };

        // Thread creation
        case FORUM_ACTIONS.CREATE_THREAD_START:
            return {
                ...state,
                submitting: true,
                error: null,
            };

        case FORUM_ACTIONS.CREATE_THREAD_SUCCESS:
            return {
                ...state,
                submitting: false,
                threads: [action.payload, ...state.threads],
                showNewThreadModal: false,
                newThreadForm: {
                    title: '',
                    content: '',
                    category: '',
                    tags: [],
                },
            };

        case FORUM_ACTIONS.CREATE_THREAD_ERROR:
            return {
                ...state,
                submitting: false,
                error: action.payload,
            };

        // Reply creation
        case FORUM_ACTIONS.CREATE_REPLY_START:
            return {
                ...state,
                submitting: true,
                error: null,
            };

        case FORUM_ACTIONS.CREATE_REPLY_SUCCESS:
            return {
                ...state,
                submitting: false,
                replies: [...state.replies, action.payload],
                showReplyForm: false,
                newReplyForm: {
                    content: '',
                    parentReplyId: null,
                },
            };

        case FORUM_ACTIONS.CREATE_REPLY_ERROR:
            return {
                ...state,
                submitting: false,
                error: action.payload,
            };

        // Voting actions
        case FORUM_ACTIONS.VOTE_THREAD:
            return {
                ...state,
                votedThreads: state.votedThreads.includes(action.payload.threadId)
                    ? state.votedThreads.filter(id => id !== action.payload.threadId)
                    : [...state.votedThreads, action.payload.threadId],
                threads: state.threads.map(thread =>
                    thread.id === action.payload.threadId
                        ? { ...thread, votes: thread.votes + action.payload.voteChange }
                        : thread
                ),
            };

        case FORUM_ACTIONS.VOTE_REPLY:
            return {
                ...state,
                votedReplies: state.votedReplies.includes(action.payload.replyId)
                    ? state.votedReplies.filter(id => id !== action.payload.replyId)
                    : [...state.votedReplies, action.payload.replyId],
                replies: state.replies.map(reply =>
                    reply.id === action.payload.replyId
                        ? { ...reply, votes: reply.votes + action.payload.voteChange }
                        : reply
                ),
            };

        // Form actions
        case FORUM_ACTIONS.UPDATE_NEW_THREAD_FORM:
            return {
                ...state,
                newThreadForm: {
                    ...state.newThreadForm,
                    ...action.payload,
                },
            };

        case FORUM_ACTIONS.UPDATE_NEW_REPLY_FORM:
            return {
                ...state,
                newReplyForm: {
                    ...state.newReplyForm,
                    ...action.payload,
                },
            };

        case FORUM_ACTIONS.RESET_NEW_THREAD_FORM:
            return {
                ...state,
                newThreadForm: {
                    title: '',
                    content: '',
                    category: '',
                    tags: [],
                },
            };

        case FORUM_ACTIONS.RESET_NEW_REPLY_FORM:
            return {
                ...state,
                newReplyForm: {
                    content: '',
                    parentReplyId: null,
                },
            };

        // UI actions
        case FORUM_ACTIONS.SHOW_NEW_THREAD_MODAL:
            return {
                ...state,
                showNewThreadModal: true,
            };

        case FORUM_ACTIONS.HIDE_NEW_THREAD_MODAL:
            return {
                ...state,
                showNewThreadModal: false,
            };

        case FORUM_ACTIONS.SHOW_REPLY_FORM:
            return {
                ...state,
                showReplyForm: true,
                newReplyForm: {
                    ...state.newReplyForm,
                    parentReplyId: action.payload,
                },
            };

        case FORUM_ACTIONS.HIDE_REPLY_FORM:
            return {
                ...state,
                showReplyForm: false,
                newReplyForm: {
                    content: '',
                    parentReplyId: null,
                },
            };

        case FORUM_ACTIONS.TOGGLE_REPLY_EXPANSION:
            return {
                ...state,
                expandedReplies: state.expandedReplies.includes(action.payload)
                    ? state.expandedReplies.filter(id => id !== action.payload)
                    : [...state.expandedReplies, action.payload],
            };

        // Moderation actions
        case FORUM_ACTIONS.PIN_THREAD:
            return {
                ...state,
                threads: state.threads.map(thread =>
                    thread.id === action.payload.threadId
                        ? { ...thread, isPinned: action.payload.isPinned }
                        : thread
                ),
                currentThread: state.currentThread?.id === action.payload.threadId
                    ? { ...state.currentThread, isPinned: action.payload.isPinned }
                    : state.currentThread,
            };

        case FORUM_ACTIONS.MARK_THREAD_SOLVED:
            return {
                ...state,
                threads: state.threads.map(thread =>
                    thread.id === action.payload.threadId
                        ? { ...thread, isSolved: true, solutionReplyId: action.payload.solutionReplyId }
                        : thread
                ),
                currentThread: state.currentThread?.id === action.payload.threadId
                    ? { ...state.currentThread, isSolved: true, solutionReplyId: action.payload.solutionReplyId }
                    : state.currentThread,
            };

        // Error handling
        case FORUM_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

// Action creators
export const forumActions = {
    // Loading actions
    loadCategoriesStart: () => ({
        type: FORUM_ACTIONS.LOAD_CATEGORIES_START,
    }),

    loadCategoriesSuccess: (categories) => ({
        type: FORUM_ACTIONS.LOAD_CATEGORIES_SUCCESS,
        payload: categories,
    }),

    loadCategoriesError: (error) => ({
        type: FORUM_ACTIONS.LOAD_CATEGORIES_ERROR,
        payload: error,
    }),

    // Search actions
    setSearchQuery: (query) => ({
        type: FORUM_ACTIONS.SET_SEARCH_QUERY,
        payload: query,
    }),

    searchThreadsStart: () => ({
        type: FORUM_ACTIONS.SEARCH_THREADS_START,
    }),

    searchThreadsSuccess: (results) => ({
        type: FORUM_ACTIONS.SEARCH_THREADS_SUCCESS,
        payload: results,
    }),

    clearSearch: () => ({
        type: FORUM_ACTIONS.CLEAR_SEARCH,
    }),

    // Filter actions
    setFilter: (filterType, value) => ({
        type: FORUM_ACTIONS.SET_FILTER,
        payload: { filterType, value },
    }),

    clearFilters: () => ({
        type: FORUM_ACTIONS.CLEAR_FILTERS,
    }),

    // Thread actions
    createThreadStart: () => ({
        type: FORUM_ACTIONS.CREATE_THREAD_START,
    }),

    createThreadSuccess: (thread) => ({
        type: FORUM_ACTIONS.CREATE_THREAD_SUCCESS,
        payload: thread,
    }),

    createThreadError: (error) => ({
        type: FORUM_ACTIONS.CREATE_THREAD_ERROR,
        payload: error,
    }),

    // UI actions
    showNewThreadModal: () => ({
        type: FORUM_ACTIONS.SHOW_NEW_THREAD_MODAL,
    }),

    hideNewThreadModal: () => ({
        type: FORUM_ACTIONS.HIDE_NEW_THREAD_MODAL,
    }),

    showReplyForm: (parentReplyId = null) => ({
        type: FORUM_ACTIONS.SHOW_REPLY_FORM,
        payload: parentReplyId,
    }),

    hideReplyForm: () => ({
        type: FORUM_ACTIONS.HIDE_REPLY_FORM,
    }),

    // Form actions
    updateNewThreadForm: (formData) => ({
        type: FORUM_ACTIONS.UPDATE_NEW_THREAD_FORM,
        payload: formData,
    }),

    updateNewReplyForm: (formData) => ({
        type: FORUM_ACTIONS.UPDATE_NEW_REPLY_FORM,
        payload: formData,
    }),

    // Voting actions
    voteThread: (threadId, voteChange) => ({
        type: FORUM_ACTIONS.VOTE_THREAD,
        payload: { threadId, voteChange },
    }),

    voteReply: (replyId, voteChange) => ({
        type: FORUM_ACTIONS.VOTE_REPLY,
        payload: { replyId, voteChange },
    }),

    // Error handling
    clearError: () => ({
        type: FORUM_ACTIONS.CLEAR_ERROR,
    }),
};
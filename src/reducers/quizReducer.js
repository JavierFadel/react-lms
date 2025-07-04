// Quiz Reducer - manages quiz state and actions
const initialQuizState = {
    // Quiz taking state
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: {},
    markedForReview: [],
    timeRemaining: 0,
    isTimerRunning: false,
    isSubmitting: false,
    isCompleted: false,

    // Quiz management state
    quizzes: [],
    quizStatistics: {},
    userQuizHistory: [],

    // UI state
    showReviewModal: false,
    showSubmitConfirmation: false,
    showResults: false,

    // Loading and error states
    loading: false,
    error: null,

    // Quiz creation state
    creatingQuiz: false,
    editingQuiz: null,
};

// Action types
export const QUIZ_ACTIONS = {
    // Quiz loading actions
    LOAD_QUIZ_START: 'LOAD_QUIZ_START',
    LOAD_QUIZ_SUCCESS: 'LOAD_QUIZ_SUCCESS',
    LOAD_QUIZ_ERROR: 'LOAD_QUIZ_ERROR',

    // Quiz taking actions
    START_QUIZ: 'START_QUIZ',
    NAVIGATE_TO_QUESTION: 'NAVIGATE_TO_QUESTION',
    ANSWER_QUESTION: 'ANSWER_QUESTION',
    MARK_FOR_REVIEW: 'MARK_FOR_REVIEW',
    UNMARK_FOR_REVIEW: 'UNMARK_FOR_REVIEW',

    // Timer actions
    START_TIMER: 'START_TIMER',
    PAUSE_TIMER: 'PAUSE_TIMER',
    UPDATE_TIME: 'UPDATE_TIME',
    TIME_UP: 'TIME_UP',

    // Quiz submission actions
    SUBMIT_QUIZ_START: 'SUBMIT_QUIZ_START',
    SUBMIT_QUIZ_SUCCESS: 'SUBMIT_QUIZ_SUCCESS',
    SUBMIT_QUIZ_ERROR: 'SUBMIT_QUIZ_ERROR',

    // Quiz management actions
    CREATE_QUIZ_START: 'CREATE_QUIZ_START',
    CREATE_QUIZ_SUCCESS: 'CREATE_QUIZ_SUCCESS',
    CREATE_QUIZ_ERROR: 'CREATE_QUIZ_ERROR',

    // UI actions
    SHOW_REVIEW_MODAL: 'SHOW_REVIEW_MODAL',
    HIDE_REVIEW_MODAL: 'HIDE_REVIEW_MODAL',
    SHOW_SUBMIT_CONFIRMATION: 'SHOW_SUBMIT_CONFIRMATION',
    HIDE_SUBMIT_CONFIRMATION: 'HIDE_SUBMIT_CONFIRMATION',
    SHOW_RESULTS: 'SHOW_RESULTS',
    HIDE_RESULTS: 'HIDE_RESULTS',

    // Reset actions
    RESET_QUIZ: 'RESET_QUIZ',
    CLEAR_ERROR: 'CLEAR_ERROR',
};

// Quiz reducer function
export const quizReducer = (state = initialQuizState, action) => {
    switch (action.type) {
        // Quiz loading
        case QUIZ_ACTIONS.LOAD_QUIZ_START:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case QUIZ_ACTIONS.LOAD_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                currentQuiz: action.payload.quiz,
                timeRemaining: action.payload.quiz.timeLimit * 60, // Convert to seconds
                error: null,
            };

        case QUIZ_ACTIONS.LOAD_QUIZ_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Quiz taking
        case QUIZ_ACTIONS.START_QUIZ:
            return {
                ...state,
                currentQuestionIndex: 0,
                answers: {},
                markedForReview: [],
                isTimerRunning: true,
                isCompleted: false,
                showResults: false,
            };

        case QUIZ_ACTIONS.NAVIGATE_TO_QUESTION:
            return {
                ...state,
                currentQuestionIndex: action.payload,
            };

        case QUIZ_ACTIONS.ANSWER_QUESTION:
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [action.payload.questionIndex]: action.payload.answer,
                },
            };

        case QUIZ_ACTIONS.MARK_FOR_REVIEW:
            return {
                ...state,
                markedForReview: [...state.markedForReview, action.payload],
            };

        case QUIZ_ACTIONS.UNMARK_FOR_REVIEW:
            return {
                ...state,
                markedForReview: state.markedForReview.filter(
                    index => index !== action.payload
                ),
            };

        // Timer management
        case QUIZ_ACTIONS.START_TIMER:
            return {
                ...state,
                isTimerRunning: true,
            };

        case QUIZ_ACTIONS.PAUSE_TIMER:
            return {
                ...state,
                isTimerRunning: false,
            };

        case QUIZ_ACTIONS.UPDATE_TIME:
            return {
                ...state,
                timeRemaining: Math.max(0, state.timeRemaining - 1),
            };

        case QUIZ_ACTIONS.TIME_UP:
            return {
                ...state,
                timeRemaining: 0,
                isTimerRunning: false,
                showSubmitConfirmation: true,
            };

        // Quiz submission
        case QUIZ_ACTIONS.SUBMIT_QUIZ_START:
            return {
                ...state,
                isSubmitting: true,
                isTimerRunning: false,
                error: null,
            };

        case QUIZ_ACTIONS.SUBMIT_QUIZ_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                isCompleted: true,
                showResults: true,
                showSubmitConfirmation: false,
            };

        case QUIZ_ACTIONS.SUBMIT_QUIZ_ERROR:
            return {
                ...state,
                isSubmitting: false,
                error: action.payload,
            };

        // Quiz creation
        case QUIZ_ACTIONS.CREATE_QUIZ_START:
            return {
                ...state,
                creatingQuiz: true,
                error: null,
            };

        case QUIZ_ACTIONS.CREATE_QUIZ_SUCCESS:
            return {
                ...state,
                creatingQuiz: false,
                quizzes: [...state.quizzes, action.payload],
            };

        case QUIZ_ACTIONS.CREATE_QUIZ_ERROR:
            return {
                ...state,
                creatingQuiz: false,
                error: action.payload,
            };

        // UI actions
        case QUIZ_ACTIONS.SHOW_REVIEW_MODAL:
            return {
                ...state,
                showReviewModal: true,
            };

        case QUIZ_ACTIONS.HIDE_REVIEW_MODAL:
            return {
                ...state,
                showReviewModal: false,
            };

        case QUIZ_ACTIONS.SHOW_SUBMIT_CONFIRMATION:
            return {
                ...state,
                showSubmitConfirmation: true,
            };

        case QUIZ_ACTIONS.HIDE_SUBMIT_CONFIRMATION:
            return {
                ...state,
                showSubmitConfirmation: false,
            };

        case QUIZ_ACTIONS.SHOW_RESULTS:
            return {
                ...state,
                showResults: true,
            };

        case QUIZ_ACTIONS.HIDE_RESULTS:
            return {
                ...state,
                showResults: false,
            };

        // Reset actions
        case QUIZ_ACTIONS.RESET_QUIZ:
            return {
                ...initialQuizState,
                quizzes: state.quizzes, // Preserve loaded quizzes
            };

        case QUIZ_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        default:
            return state;
    }
};

// Action creators
export const quizActions = {
    // Quiz loading
    loadQuizStart: () => ({
        type: QUIZ_ACTIONS.LOAD_QUIZ_START,
    }),

    loadQuizSuccess: (quiz) => ({
        type: QUIZ_ACTIONS.LOAD_QUIZ_SUCCESS,
        payload: { quiz },
    }),

    loadQuizError: (error) => ({
        type: QUIZ_ACTIONS.LOAD_QUIZ_ERROR,
        payload: error,
    }),

    // Quiz taking
    startQuiz: () => ({
        type: QUIZ_ACTIONS.START_QUIZ,
    }),

    navigateToQuestion: (questionIndex) => ({
        type: QUIZ_ACTIONS.NAVIGATE_TO_QUESTION,
        payload: questionIndex,
    }),

    answerQuestion: (questionIndex, answer) => ({
        type: QUIZ_ACTIONS.ANSWER_QUESTION,
        payload: { questionIndex, answer },
    }),

    markForReview: (questionIndex) => ({
        type: QUIZ_ACTIONS.MARK_FOR_REVIEW,
        payload: questionIndex,
    }),

    unmarkForReview: (questionIndex) => ({
        type: QUIZ_ACTIONS.UNMARK_FOR_REVIEW,
        payload: questionIndex,
    }),

    // Timer actions
    startTimer: () => ({
        type: QUIZ_ACTIONS.START_TIMER,
    }),

    pauseTimer: () => ({
        type: QUIZ_ACTIONS.PAUSE_TIMER,
    }),

    updateTime: () => ({
        type: QUIZ_ACTIONS.UPDATE_TIME,
    }),

    timeUp: () => ({
        type: QUIZ_ACTIONS.TIME_UP,
    }),

    // Quiz submission
    submitQuizStart: () => ({
        type: QUIZ_ACTIONS.SUBMIT_QUIZ_START,
    }),

    submitQuizSuccess: (results) => ({
        type: QUIZ_ACTIONS.SUBMIT_QUIZ_SUCCESS,
        payload: results,
    }),

    submitQuizError: (error) => ({
        type: QUIZ_ACTIONS.SUBMIT_QUIZ_ERROR,
        payload: error,
    }),

    // UI actions
    showReviewModal: () => ({
        type: QUIZ_ACTIONS.SHOW_REVIEW_MODAL,
    }),

    hideReviewModal: () => ({
        type: QUIZ_ACTIONS.HIDE_REVIEW_MODAL,
    }),

    showSubmitConfirmation: () => ({
        type: QUIZ_ACTIONS.SHOW_SUBMIT_CONFIRMATION,
    }),

    hideSubmitConfirmation: () => ({
        type: QUIZ_ACTIONS.HIDE_SUBMIT_CONFIRMATION,
    }),

    showResults: () => ({
        type: QUIZ_ACTIONS.SHOW_RESULTS,
    }),

    hideResults: () => ({
        type: QUIZ_ACTIONS.HIDE_RESULTS,
    }),

    // Reset actions
    resetQuiz: () => ({
        type: QUIZ_ACTIONS.RESET_QUIZ,
    }),

    clearError: () => ({
        type: QUIZ_ACTIONS.CLEAR_ERROR,
    }),
};
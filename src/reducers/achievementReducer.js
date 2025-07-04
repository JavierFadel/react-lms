// Achievement Reducer - manages achievement state and actions

// Initial state
export const initialAchievementState = {
    achievements: [], // All available achievements
    unlocked: [],     // Array of unlocked achievement IDs
    loading: true,
    error: null,
};

// Action types
export const ACHIEVEMENT_ACTIONS = {
    SET_ACHIEVEMENTS: 'SET_ACHIEVEMENTS',
    UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',
    RESET_ACHIEVEMENTS: 'RESET_ACHIEVEMENTS',
    LOAD_PROGRESS: 'LOAD_PROGRESS',
    ERROR: 'ERROR',
};

// Reducer function
export const achievementReducer = (state = initialAchievementState, action) => {
    switch (action.type) {
        case ACHIEVEMENT_ACTIONS.SET_ACHIEVEMENTS:
            return {
                ...state,
                achievements: action.payload,
                loading: false,
                error: null,
            };
        case ACHIEVEMENT_ACTIONS.UNLOCK_ACHIEVEMENT:
            if (state.unlocked.includes(action.payload)) return state;
            return {
                ...state,
                unlocked: [...state.unlocked, action.payload],
            };
        case ACHIEVEMENT_ACTIONS.RESET_ACHIEVEMENTS:
            return {
                ...state,
                unlocked: [],
            };
        case ACHIEVEMENT_ACTIONS.LOAD_PROGRESS:
            return {
                ...state,
                unlocked: action.payload,
                loading: false,
            };
        case ACHIEVEMENT_ACTIONS.ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

// Action creators (optional, for convenience)
export const achievementActions = {
    setAchievements: (achievements) => ({
        type: ACHIEVEMENT_ACTIONS.SET_ACHIEVEMENTS,
        payload: achievements,
    }),
    unlockAchievement: (id) => ({
        type: ACHIEVEMENT_ACTIONS.UNLOCK_ACHIEVEMENT,
        payload: id,
    }),
    resetAchievements: () => ({
        type: ACHIEVEMENT_ACTIONS.RESET_ACHIEVEMENTS,
    }),
    loadProgress: (unlocked) => ({
        type: ACHIEVEMENT_ACTIONS.LOAD_PROGRESS,
        payload: unlocked,
    }),
    setError: (error) => ({
        type: ACHIEVEMENT_ACTIONS.ERROR,
        payload: error,
    }),
};
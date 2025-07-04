import { createContext, useContext, useReducer, useEffect } from "react";
import { STORAGE_KEYS } from "../utils/constants";
import { achievements } from "../utils/dummyData";

// Action types
const ACHIEVEMENT_ACTIONS = {
    SET_ACHIEVEMENTS: "SET_ACHIEVEMENTS",
    UNLOCK_ACHIEVEMENT: "UNLOCK_ACHIEVEMENT",
    RESET_ACHIEVEMENTS: "RESET_ACHIEVEMENTS",
    LOAD_PROGRESS: "LOAD_PROGRESS",
    ERROR: "ERROR",
};

// Initial state
const initialState = {
    achievements: [], // All available achievements
    unlocked: [],     // Array of unlocked achievement IDs
    loading: true,
    error: null,
};

// Reducer
const achievementReducer = (state, action) => {
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
            const updatedUnlocked = [...state.unlocked, action.payload];
            // Persist to localStorage
            localStorage.setItem(
                STORAGE_KEYS.ACHIEVEMENT_PROGRESS || "achievement_progress",
                JSON.stringify(updatedUnlocked)
            );
            return {
                ...state,
                unlocked: updatedUnlocked,
            };
        case ACHIEVEMENT_ACTIONS.RESET_ACHIEVEMENTS:
            localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENT_PROGRESS || "achievement_progress");
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

// Context
const AchievementContext = createContext();

// Provider
export const AchievementProvider = ({ children }) => {
    const [state, dispatch] = useReducer(achievementReducer, initialState);

    // Load achievements (could be from API, here from dummyData)
    useEffect(() => {
        try {
            // Replace with API call if needed
            dispatch({
                type: ACHIEVEMENT_ACTIONS.SET_ACHIEVEMENTS,
                payload: achievements || [],
            });
        } catch (error) {
            dispatch({ type: ACHIEVEMENT_ACTIONS.ERROR, payload: error.message });
        }
    }, []);

    // Load unlocked progress from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENT_PROGRESS || "achievement_progress");
            if (stored) {
                dispatch({
                    type: ACHIEVEMENT_ACTIONS.LOAD_PROGRESS,
                    payload: JSON.parse(stored),
                });
            } else {
                dispatch({ type: ACHIEVEMENT_ACTIONS.LOAD_PROGRESS, payload: [] });
            }
        } catch (error) {
            dispatch({ type: ACHIEVEMENT_ACTIONS.ERROR, payload: error.message });
        }
    }, []);

    // Actions
    const unlockAchievement = (id) => {
        dispatch({ type: ACHIEVEMENT_ACTIONS.UNLOCK_ACHIEVEMENT, payload: id });
    };

    const resetAchievements = () => {
        dispatch({ type: ACHIEVEMENT_ACTIONS.RESET_ACHIEVEMENTS });
    };

    // Context value
    const value = {
        ...state,
        unlockAchievement,
        resetAchievements,
    };

    return (
        <AchievementContext.Provider value={value}>
            {children}
        </AchievementContext.Provider>
    );
};

// Custom hook
export const useAchievement = () => {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error("useAchievement must be used within an AchievementProvider");
    }
    return context;
};

export default AchievementContext;

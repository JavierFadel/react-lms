import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS, THEME_COLORS } from '../utils/constants';

// Theme actions
const THEME_ACTIONS = {
    SET_THEME: 'SET_THEME',
    TOGGLE_THEME: 'TOGGLE_THEME',
    SET_PRIMARY_COLOR: 'SET_PRIMARY_COLOR',
    SET_FONT_SIZE: 'SET_FONT_SIZE',
    SET_SIDEBAR_COLLAPSED: 'SET_SIDEBAR_COLLAPSED',
    RESET_THEME: 'RESET_THEME',
};

// Available themes
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system',
};

// Font sizes
export const FONT_SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
};

// Initial state
const initialState = {
    theme: THEMES.LIGHT,
    primaryColor: THEME_COLORS.PRIMARY[500],
    fontSize: FONT_SIZES.MEDIUM,
    sidebarCollapsed: false,
    systemTheme: 'light', // detected system theme
};

// Theme reducer
const themeReducer = (state, action) => {
    switch (action.type) {
        case THEME_ACTIONS.SET_THEME:
            return {
                ...state,
                theme: action.payload,
            };

        case THEME_ACTIONS.TOGGLE_THEME:
            return {
                ...state,
                theme: state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
            };

        case THEME_ACTIONS.SET_PRIMARY_COLOR:
            return {
                ...state,
                primaryColor: action.payload,
            };

        case THEME_ACTIONS.SET_FONT_SIZE:
            return {
                ...state,
                fontSize: action.payload,
            };

        case THEME_ACTIONS.SET_SIDEBAR_COLLAPSED:
            return {
                ...state,
                sidebarCollapsed: action.payload,
            };

        case THEME_ACTIONS.RESET_THEME:
            return {
                ...initialState,
                systemTheme: state.systemTheme,
            };

        default:
            return state;
    }
};

// Create context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    // Detect system theme preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';

        dispatch({
            type: THEME_ACTIONS.SET_THEME,
            payload: systemTheme,
        });

        // Listen for system theme changes
        const handleChange = (e) => {
            if (state.theme === THEMES.SYSTEM) {
                const newSystemTheme = e.matches ? 'dark' : 'light';
                dispatch({
                    type: THEME_ACTIONS.SET_THEME,
                    payload: newSystemTheme,
                });
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [state.theme]);

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme) {
            try {
                const themeData = JSON.parse(savedTheme);
                dispatch({ type: THEME_ACTIONS.SET_THEME, payload: themeData.theme });
                dispatch({ type: THEME_ACTIONS.SET_PRIMARY_COLOR, payload: themeData.primaryColor });
                dispatch({ type: THEME_ACTIONS.SET_FONT_SIZE, payload: themeData.fontSize });
                dispatch({ type: THEME_ACTIONS.SET_SIDEBAR_COLLAPSED, payload: themeData.sidebarCollapsed });
            } catch (error) {
                console.error('Error loading theme from localStorage:', error);
            }
        }
    }, []);

    // Save theme to localStorage
    useEffect(() => {
        const themeData = {
            theme: state.theme,
            primaryColor: state.primaryColor,
            fontSize: state.fontSize,
            sidebarCollapsed: state.sidebarCollapsed,
        };
        localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(themeData));
    }, [state.theme, state.primaryColor, state.fontSize, state.sidebarCollapsed]);

    // Apply theme to document
    useEffect(() => {
        const root = document.documentElement;
        const actualTheme = state.theme === THEMES.SYSTEM ? state.systemTheme : state.theme;

        // Apply theme class
        root.className = `theme-${actualTheme}`;

        // Apply primary color as CSS custom property
        root.style.setProperty('--primary-color', state.primaryColor);

        // Apply font size class
        root.className += ` font-${state.fontSize}`;

        // Apply sidebar state
        if (state.sidebarCollapsed) {
            root.className += ' sidebar-collapsed';
        }
    }, [state.theme, state.primaryColor, state.fontSize, state.sidebarCollapsed, state.systemTheme]);

    // Actions
    const setTheme = (theme) => {
        dispatch({ type: THEME_ACTIONS.SET_THEME, payload: theme });
    };

    const toggleTheme = () => {
        dispatch({ type: THEME_ACTIONS.TOGGLE_THEME });
    };

    const setPrimaryColor = (color) => {
        dispatch({ type: THEME_ACTIONS.SET_PRIMARY_COLOR, payload: color });
    };

    const setFontSize = (size) => {
        dispatch({ type: THEME_ACTIONS.SET_FONT_SIZE, payload: size });
    };

    const setSidebarCollapsed = (collapsed) => {
        dispatch({ type: THEME_ACTIONS.SET_SIDEBAR_COLLAPSED, payload: collapsed });
    };

    const resetTheme = () => {
        dispatch({ type: THEME_ACTIONS.RESET_THEME });
    };

    // Utility functions
    const isDarkMode = () => {
        const actualTheme = state.theme === THEMES.SYSTEM ? state.systemTheme : state.theme;
        return actualTheme === THEMES.DARK;
    };

    const getThemeColors = () => {
        return {
            primary: state.primaryColor,
            success: THEME_COLORS.SUCCESS,
            warning: THEME_COLORS.WARNING,
            danger: THEME_COLORS.DANGER,
            info: THEME_COLORS.INFO,
        };
    };

    const getFontSizeClass = () => {
        switch (state.fontSize) {
            case FONT_SIZES.SMALL:
                return 'text-sm';
            case FONT_SIZES.LARGE:
                return 'text-lg';
            default:
                return 'text-base';
        }
    };

    // Context value
    const value = {
        // State
        ...state,

        // Actions
        setTheme,
        toggleTheme,
        setPrimaryColor,
        setFontSize,
        setSidebarCollapsed,
        resetTheme,

        // Utility functions
        isDarkMode,
        getThemeColors,
        getFontSizeClass,

        // Constants
        THEMES,
        FONT_SIZES,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext;
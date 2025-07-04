import { Children, createContext, useContext, useReducer, useEffect } from "react";

const AUTH_ACTIONS = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    REGISTER_START: 'REGISTER_START',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    CLEAR_ERROR: 'CLEAR_ERROR',
    INITIALIZE_AUTH: 'INITIALIZE_AUTH'
};

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isInitialized: false
};

const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_START:
        case AUTH_ACTIONS.REGISTER_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
        case AUTH_ACTIONS.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
                isInitialized: true,
            };

        case AUTH_ACTIONS.LOGIN_FAILURE:
        case AUTH_ACTIONS.REGISTER_FAILURE:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
                isInitialized: true,
            };

        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
                isInitialized: true,
            };

        case AUTH_ACTIONS.UPDATE_PROFILE:
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };

        case AUTH_ACTIONS.CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };

        case AUTH_ACTIONS.INITIALIZE_AUTH:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
                isInitialized: true,
            };

        default:
            return state;
    }
}

// Creating context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Initialize authentication state from localStorage
    useEffect(() => {
        const initializeAuth = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const storedToken = localStorage.getItem('token');

                if (storedUser && storedToken) {
                    const user = JSON.parse(storedUser);
                    dispatch({
                        type: AUTH_ACTIONS.INITIALIZE_AUTH,
                        payload: {
                            user,
                            token: storedToken,
                            isAuthenticated: true,
                        },
                    });
                } else {
                    dispatch({
                        type: AUTH_ACTIONS.INITIALIZE_AUTH,
                        payload: {
                            user: null,
                            token: null,
                            isAuthenticated: false,
                        },
                    });
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                dispatch({
                    type: AUTH_ACTIONS.INITIALIZE_AUTH,
                    payload: {
                        user: null,
                        token: null,
                        isAuthenticated: false,
                    },
                });
            }
        };

        initializeAuth();
    }, []);

    // Login function
    const login = async (email, password) => {
        dispatch({ type: AUTH_ACTIONS.LOGIN_START });

        try {
            // Simulate API call with dummy data
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Demo user data
            const demoUser = {
                id: 1,
                email: email,
                name: 'Demo User',
                role: USER_ROLES.STUDENT,
                avatar: null,
                joinDate: new Date().toISOString(),
                preferences: {
                    language: 'id',
                    notifications: true,
                    theme: 'light',
                },
            };

            const demoToken = 'demo-token-' + Date.now();

            // Store in localStorage
            localStorage.setItem('user', JSON.stringify(demoUser));
            localStorage.setItem('token', demoToken);

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: {
                    user: demoUser,
                    token: demoToken,
                },
            });

            return { success: true };
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.LOGIN_FAILURE,
                payload: error.message || 'Login failed',
            });
            return { success: false, error: error.message };
        }
    };

    // Register function
    const register = async (userData) => {
        dispatch({ type: AUTH_ACTIONS.REGISTER_START });

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser = {
                id: Date.now(),
                email: userData.email,
                name: userData.name,
                role: userData.role || USER_ROLES.STUDENT,
                avatar: null,
                joinDate: new Date().toISOString(),
                preferences: {
                    language: 'id',
                    notifications: true,
                    theme: 'light',
                },
            };

            const token = 'demo-token-' + Date.now();

            // Store in localStorage
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('token', token);

            dispatch({
                type: AUTH_ACTIONS.REGISTER_SUCCESS,
                payload: {
                    user: newUser,
                    token: token,
                },
            });

            return { success: true };
        } catch (error) {
            dispatch({
                type: AUTH_ACTIONS.REGISTER_FAILURE,
                payload: error.message || 'Registration failed',
            });
            return { success: false, error: error.message };
        }
    };

    // Logout function
    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Clear other user-specific data
        localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
        localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS);
        localStorage.removeItem(STORAGE_KEYS.FORUM_DRAFT);
        localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENT_PROGRESS);

        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    // Update profile function
    const updateProfile = async (profileData) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            const updatedUser = { ...state.user, ...profileData };

            // Update localStorage
            localStorage.setItem('user', JSON.stringify(updatedUser));

            dispatch({
                type: AUTH_ACTIONS.UPDATE_PROFILE,
                payload: profileData,
            });

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Clear error function
    const clearError = () => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
    };

    // Check if user has specific role
    const hasRole = (role) => {
        return state.user?.role === role;
    };

    // Check if user is instructor or admin
    const isInstructor = () => {
        return hasRole(USER_ROLES.INSTRUCTOR) || hasRole(USER_ROLES.ADMIN);
    };

    // Check if user is admin
    const isAdmin = () => {
        return hasRole(USER_ROLES.ADMIN);
    };

    // Context value
    const value = {
        // State
        ...state,

        // Actions
        login,
        register,
        logout,
        updateProfile,
        clearError,

        // Utility functions
        hasRole,
        isInstructor,
        isAdmin,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
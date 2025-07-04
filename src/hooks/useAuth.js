import { useEffect, useState } from "react"

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mock user data
                const mockUser = {
                    id: '1',
                    name: 'Admin User',
                    email: 'admin@belajarpintar.com',
                    role: 'admin',
                    avatar: '/api/placeholder/40/40',
                    preferences: {
                        theme: 'light',
                        notifications: true,
                        dailyGoal: 2 // hours
                    },
                    stats: {
                        totalModules: 45,
                        completedModules: 28,
                        currentStreak: 7,
                        totalPoints: 1250
                    }
                };

                setUser(mockUser);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        checkAuth();
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            // Simulate login API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock successful login
            const mockUser = {
                id: '1',
                name: credentials.email === 'admin@test.com' ? 'Admin User' : 'Student User',
                email: credentials.email,
                role: credentials.email === 'admin@test.com' ? 'admin' : 'student',
                avatar: '/api/placeholder/40/40'
            };

            setUser(mockUser);
            return { success: true, user: mockUser };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            // Simulate logout API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            // Simulate update API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setUser(prev => ({
                ...prev,
                ...userData
            }));

            return { success: true };
        } catch (err) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    const isAuthenticated = !!user;
    const isAdmin = user?.role === 'admin';
    const isStudent = user?.role === 'student';

    return {
        user,
        loading,
        error,
        login,
        logout,
        updateProfile,
        isAuthenticated,
        isAdmin,
        isStudent
    };
}
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';

// API response wrapper
const apiResponse = (data, error = null) => ({
    data,
    error,
    success: !error
})

// Simulate API delay for realistic behavior
const simulateDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// HTTP methods simulator (since we're using dummy data)
export const api = {
    get: async (endpoint, params = {}) => {
        await simulateDelay();
        // In real app, this would be: return fetch(`${API_BASE_URL}${endpoint}`, { method: 'GET' })
        return apiResponse(null, null);
    },

    post: async (endpoint, data = {}) => {
        await simulateDelay();
        // In real app: return fetch(`${API_BASE_URL}${endpoint}`, { method: 'POST', body: JSON.stringify(data) })
        return apiResponse(data, null);
    },

    put: async (endpoint, data = {}) => {
        await simulateDelay();
        return apiResponse(data, null);
    },

    delete: async (endpoint) => {
        await simulateDelay();
        return apiResponse({ deleted: true }, null);
    }
};

// Error handling utility
export const handleApiError = (error) => {
    console.error('API Error:', error);
    return {
        message: error.message || 'An unexpected error occurred',
        code: error.code || 'UNKNOWN_ERROR',
        timestamp: new Date().toISOString()
    };
};

// Request interceptor utility
export const withAuth = (config) => {
    const token = localStorage.getItem('authToken');
    return {
        ...config,
        headers: {
            ...config.headers,
            'Authorization': token ? `Bearer ${token}` : undefined
        }
    };
};
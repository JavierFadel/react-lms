import { THEME_COLORS, MODULE_STATUS, QUIZ_CONFIG } from './constants';
import { Award } from 'lucide-react';

export const formatDuration = (minutes) => {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export const formatScore = (score, total) => {
    const percentage = Math.round((score / total) * 100);
    return `${score}/${total} (${percentage}%)`;
};

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatDateTime = (date) => {
    return new Date(date).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;

    return formatDate(date);
};

// Calculation functions
export const calculateProgress = (completed, total) => {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
};

export const calculateQuizScore = (answers, correctAnswers) => {
    let correct = 0;
    answers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
            correct++;
        }
    });
    return Math.round((correct / correctAnswers.length) * 100);
};

export const calculateGrade = (score) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
};

export const calculateStudyStreak = (studyDates) => {
    if (!studyDates || studyDates.length === 0) return 0;

    const sortedDates = studyDates.sort((a, b) => new Date(b) - new Date(a));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let currentDate = new Date(today);

    for (const dateStr of sortedDates) {
        const studyDate = new Date(dateStr);
        studyDate.setHours(0, 0, 0, 0);

        if (studyDate.getTime() === currentDate.getTime()) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else if (studyDate.getTime() < currentDate.getTime()) {
            break;
        }
    }

    return streak;
};

// Status and state functions
export const getModuleStatusColor = (status) => {
    switch (status) {
        case MODULE_STATUS.COMPLETED:
            return THEME_COLORS.SUCCESS;
        case MODULE_STATUS.IN_PROGRESS:
            return THEME_COLORS.WARNING;
        case MODULE_STATUS.NOT_STARTED:
            return THEME_COLORS.PRIMARY[400];
        case MODULE_STATUS.LOCKED:
            return '#9ca3af';
        default:
            return THEME_COLORS.PRIMARY[400];
    }
};

export const getScoreColor = (score) => {
    if (score >= 90) return THEME_COLORS.SUCCESS;
    if (score >= 80) return '#84cc16'; // lime
    if (score >= 70) return THEME_COLORS.WARNING;
    if (score >= 60) return '#f97316'; // orange
    return THEME_COLORS.DANGER;
};

export const isQuizPassed = (score) => {
    return score >= QUIZ_CONFIG.PASSING_SCORE;
};

// Array and object utilities
export const groupBy = (array, key) => {
    return array.reduce((groups, item) => {
        const group = item[key];
        if (!groups[group]) {
            groups[group] = [];
        }
        groups[group].push(item);
        return groups;
    }, {});
};

export const sortBy = (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (order === 'desc') {
            return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
    });
};

export const filterBy = (array, filters) => {
    return array.filter(item => {
        return Object.keys(filters).every(key => {
            const filterValue = filters[key];
            const itemValue = item[key];

            if (filterValue === null || filterValue === undefined || filterValue === '') {
                return true;
            }

            if (Array.isArray(filterValue)) {
                return filterValue.includes(itemValue);
            }

            if (typeof filterValue === 'string') {
                return itemValue.toLowerCase().includes(filterValue.toLowerCase());
            }

            return itemValue === filterValue;
        });
    });
};

// Validation functions
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 8;
};

export const validateQuizData = (quiz) => {
    const errors = {};

    if (!quiz.title || quiz.title.trim().length < 3) {
        errors.title = 'Judul quiz harus minimal 3 karakter';
    }

    if (!quiz.description || quiz.description.trim().length < 10) {
        errors.description = 'Deskripsi quiz harus minimal 10 karakter';
    }

    if (!quiz.questions || quiz.questions.length < QUIZ_CONFIG.MIN_QUIZ_QUESTIONS) {
        errors.questions = `Quiz harus memiliki minimal ${QUIZ_CONFIG.MIN_QUIZ_QUESTIONS} pertanyaan`;
    }

    if (quiz.timeLimit && (quiz.timeLimit < 5 || quiz.timeLimit > 180)) {
        errors.timeLimit = 'Batas waktu harus antara 5-180 menit';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

// Random utilities
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const getRandomItems = (array, count) => {
    const shuffled = shuffleArray(array);
    return shuffled.slice(0, count);
};

// URL and search utilities
export const createSearchParams = (params) => {
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
            searchParams.append(key, params[key]);
        }
    });
    return searchParams.toString();
};

export const parseSearchParams = (search) => {
    const params = new URLSearchParams(search);
    const result = {};
    for (const [key, value] of params.entries()) {
        result[key] = value;
    }
    return result;
};

// Debounce function
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// Theme utilities
export const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
};
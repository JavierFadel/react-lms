// Date formatting utilities
export const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options,
    };

    return new Date(date).toLocaleDateString('id-ID', defaultOptions);
};

export const formatTime = (date, options = {}) => {
    const defaultOptions = {
        hour: '2-digit',
        minute: '2-digit',
        ...options,
    };

    return new Date(date).toLocaleTimeString('id-ID', defaultOptions);
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

// Relative time formatting
export const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = {
        tahun: 31536000,
        bulan: 2592000,
        minggu: 604800,
        hari: 86400,
        jam: 3600,
        menit: 60,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return `${interval} ${unit} yang lalu`;
        }
    }

    return 'Baru saja';
};

// Date calculations
export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const addWeeks = (date, weeks) => {
    return addDays(date, weeks * 7);
};

export const addMonths = (date, months) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};

export const addYears = (date, years) => {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
};

// Date comparisons
export const isToday = (date) => {
    const today = new Date();
    const checkDate = new Date(date);
    return (
        checkDate.getDate() === today.getDate() &&
        checkDate.getMonth() === today.getMonth() &&
        checkDate.getFullYear() === today.getFullYear()
    );
};

export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const checkDate = new Date(date);
    return (
        checkDate.getDate() === yesterday.getDate() &&
        checkDate.getMonth() === yesterday.getMonth() &&
        checkDate.getFullYear() === yesterday.getFullYear()
    );
};

export const isThisWeek = (date) => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const checkDate = new Date(date);
    return checkDate >= startOfWeek && checkDate <= endOfWeek;
};

export const isThisMonth = (date) => {
    const now = new Date();
    const checkDate = new Date(date);
    return (
        checkDate.getMonth() === now.getMonth() &&
        checkDate.getFullYear() === now.getFullYear()
    );
};

// Date range utilities
export const getDateRange = (startDate, endDate) => {
    const dates = [];
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
};

export const getWeekRange = (date = new Date()) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return { start: startOfWeek, end: endOfWeek };
};

export const getMonthRange = (date = new Date()) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);

    return { start: startOfMonth, end: endOfMonth };
};

export const getYearRange = (date = new Date()) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const endOfYear = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);

    return { start: startOfYear, end: endOfYear };
};

// Analytics date utilities
export const getLast7Days = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

export const getLast30Days = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 29);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

export const getLast90Days = () => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 89);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

export const getLastYear = () => {
    const end = new Date();
    const start = new Date();
    start.setFullYear(end.getFullYear() - 1);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    return { start, end };
};

// Time zone utilities
export const getTimezoneOffset = () => {
    return new Date().getTimezoneOffset();
};

export const convertToUTC = (date) => {
    const utcDate = new Date(date);
    return new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
};

export const convertFromUTC = (date) => {
    const localDate = new Date(date);
    return new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
};

// Special date utilities
export const getWeekDays = (date = new Date()) => {
    const { start } = getWeekRange(date);
    const days = [];

    for (let i = 0; i < 7; i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        days.push(day);
    }

    return days;
};

export const getMonthDays = (date = new Date()) => {
    const { start, end } = getMonthRange(date);
    return getDateRange(start, end);
};

export const formatDuration = (startDate, endDate) => {
    const diffInMs = new Date(endDate) - new Date(startDate);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
        return `${diffInDays} hari`;
    } else if (diffInHours > 0) {
        const remainingMinutes = diffInMinutes % 60;
        return remainingMinutes > 0 ? `${diffInHours}j ${remainingMinutes}m` : `${diffInHours}j`;
    } else {
        return `${diffInMinutes}m`;
    }
};

export const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
};

export const parseDate = (dateString) => {
    const date = new Date(dateString);
    return isValidDate(date) ? date : null;
};
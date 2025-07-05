import { quizData, users } from '../utils/dummyData.js';

// Simulate API delays
const simulateApiDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate unique IDs
const generateId = (prefix = 'item') => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Helper function to calculate quiz score
const calculateScore = (answers, questions) => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
            correctAnswers++;
        }
    });
    return Math.round((correctAnswers / questions.length) * 100);
};

// Quiz Service - handles all quiz-related operations with dummy data
export const quizService = {
    // Get all quizzes with filtering and pagination
    getQuizzes: async ({ page = 1, limit = 10, difficulty = null, search = null } = {}) => {
        await simulateApiDelay(400);
        
        let filteredQuizzes = [...quizData];
        
        // Filter by difficulty if provided
        if (difficulty && difficulty !== 'all') {
            filteredQuizzes = filteredQuizzes.filter(quiz => quiz.difficulty.toLowerCase() === difficulty.toLowerCase());
        }
        
        // Filter by search term if provided
        if (search) {
            const searchLower = search.toLowerCase();
            filteredQuizzes = filteredQuizzes.filter(quiz => 
                quiz.title.toLowerCase().includes(searchLower) ||
                quiz.description.toLowerCase().includes(searchLower)
            );
        }
        
        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedQuizzes = filteredQuizzes.slice(startIndex, endIndex);
        
        return {
            data: paginatedQuizzes,
            pagination: {
                page,
                limit,
                total: filteredQuizzes.length,
                totalPages: Math.ceil(filteredQuizzes.length / limit),
                hasNext: endIndex < filteredQuizzes.length,
                hasPrev: page > 1
            }
        };
    },

    // Get quiz by ID
    getQuizById: async (quizId) => {
        await simulateApiDelay(400);
        
        const quiz = quizData.find(q => q.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        
        return quiz;
    },

    // Create new quiz
    createQuiz: async (quizData) => {
        await simulateApiDelay(500);
        
        const newQuiz = {
            id: generateId('quiz'),
            title: quizData.title,
            description: quizData.description,
            difficulty: quizData.difficulty || 'Medium',
            duration: quizData.duration || 15,
            questions: quizData.questions || [],
            createdAt: new Date().toISOString(),
            createdBy: users[0].id // Use first user as current user
        };
        
        // In a real app, this would be saved to the backend
        return newQuiz;
    },

    // Update quiz
    updateQuiz: async ({ quizId, quizData }) => {
        await simulateApiDelay(400);
        
        const quiz = quizData.find(q => q.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        
        const updatedQuiz = {
            ...quiz,
            ...quizData,
            updatedAt: new Date().toISOString()
        };
        
        return updatedQuiz;
    },

    // Delete quiz
    deleteQuiz: async (quizId) => {
        await simulateApiDelay(300);
        
        const quiz = quizData.find(q => q.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        
        return { success: true, message: 'Quiz deleted successfully' };
    },

    // Submit quiz answers
    submitQuizAnswers: async ({ quizId, answers, timeTaken }) => {
        await simulateApiDelay(500);
        
        const quiz = quizData.find(q => q.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        
        const score = calculateScore(answers, quiz.questions);
        const correctAnswers = quiz.questions.filter((question, index) => 
            answers[index] === question.correctAnswer
        ).length;
        
        const result = {
            id: generateId('result'),
            quizId,
            userId: users[0].id, // Use first user as current user
            score,
            correctAnswers,
            totalQuestions: quiz.questions.length,
            timeTaken,
            submittedAt: new Date().toISOString(),
            answers: answers.map((answer, index) => ({
                questionIndex: index,
                userAnswer: answer,
                correctAnswer: quiz.questions[index].correctAnswer,
                isCorrect: answer === quiz.questions[index].correctAnswer
            }))
        };
        
        return result;
    },

    // Get quiz results
    getQuizResults: async ({ quizId, userId }) => {
        await simulateApiDelay(400);
        
        // Simulate some quiz results
        const mockResults = [
            {
                id: 'result_1',
                quizId,
                userId: userId || users[0].id,
                score: 85,
                correctAnswers: 17,
                totalQuestions: 20,
                timeTaken: 1200, // seconds
                submittedAt: '2024-07-01T10:30:00Z',
                answers: []
            },
            {
                id: 'result_2',
                quizId,
                userId: userId || users[0].id,
                score: 92,
                correctAnswers: 18,
                totalQuestions: 20,
                timeTaken: 1100,
                submittedAt: '2024-07-03T14:15:00Z',
                answers: []
            }
        ];
        
        return mockResults;
    },

    // Get quiz statistics
    getQuizStatistics: async (quizId) => {
        await simulateApiDelay(400);
        
        const quiz = quizData.find(q => q.id === quizId);
        if (!quiz) {
            throw new Error('Quiz not found');
        }
        
        // Simulate statistics
        const stats = {
            quizId,
            totalAttempts: 156,
            averageScore: 78.5,
            highestScore: 100,
            lowestScore: 45,
            averageTime: 18.2, // minutes
            completionRate: 0.89,
            difficultyDistribution: {
                easy: 45,
                medium: 78,
                hard: 33
            },
            questionStats: quiz.questions.map((question, index) => ({
                questionIndex: index,
                correctRate: Math.random() * 0.4 + 0.6, // 60-100%
                averageTime: Math.random() * 2 + 1 // 1-3 minutes
            }))
        };
        
        return stats;
    },

    // Get user's quiz history
    getUserQuizHistory: async (userId) => {
        await simulateApiDelay(400);
        
        // Simulate quiz history
        const history = quizData.slice(0, 5).map((quiz, index) => ({
            id: `history_${index + 1}`,
            quizId: quiz.id,
            quizTitle: quiz.title,
            score: Math.floor(Math.random() * 40) + 60, // 60-100
            totalQuestions: quiz.questions.length,
            timeTaken: Math.floor(Math.random() * 600) + 300, // 5-15 minutes
            submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date in last 30 days
            status: Math.random() > 0.2 ? 'completed' : 'in-progress'
        }));
        
        return history;
    },

    // Save quiz progress (for auto-save functionality)
    saveQuizProgress: async ({ quizId, currentAnswers, currentQuestionIndex }) => {
        await simulateApiDelay(300);
        
        const progress = {
            id: generateId('progress'),
            quizId,
            userId: users[0].id,
            currentAnswers,
            currentQuestionIndex,
            savedAt: new Date().toISOString()
        };
        
        return progress;
    },

    // Get saved quiz progress
    getQuizProgress: async ({ quizId, userId }) => {
        await simulateApiDelay(300);
        
        // Simulate saved progress
        const progress = {
            id: 'progress_1',
            quizId,
            userId: userId || users[0].id,
            currentAnswers: {},
            currentQuestionIndex: 2,
            savedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
        };
        
        return progress;
    },

    // Get quiz categories/difficulties
    getQuizCategories: async () => {
        await simulateApiDelay(200);
        
        const difficulties = ['Easy', 'Medium', 'Hard'];
        const categories = difficulties.map(difficulty => ({
            id: difficulty.toLowerCase(),
            name: difficulty,
            count: quizData.filter(quiz => quiz.difficulty === difficulty).length
        }));
        
        return categories;
    },

    // Search quizzes
    searchQuizzes: async ({ query, difficulty, limit = 10 }) => {
        await simulateApiDelay(400);
        
        let filteredQuizzes = [...quizData];
        
        if (query) {
            const queryLower = query.toLowerCase();
            filteredQuizzes = filteredQuizzes.filter(quiz => 
                quiz.title.toLowerCase().includes(queryLower) ||
                quiz.description.toLowerCase().includes(queryLower)
            );
        }
        
        if (difficulty && difficulty !== 'all') {
            filteredQuizzes = filteredQuizzes.filter(quiz => 
                quiz.difficulty.toLowerCase() === difficulty.toLowerCase()
            );
        }
        
        return filteredQuizzes.slice(0, limit);
    }
};
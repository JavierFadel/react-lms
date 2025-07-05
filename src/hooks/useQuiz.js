// src/hooks/useQuiz.js
import { useState, useEffect, useCallback } from 'react';
import { useQuizProgress } from './useLocalStorage';
import { quizService } from '../services/quizService';

export const useQuiz = (quizId) => {
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(null);
    const [reviewMode, setReviewMode] = useState(false);
    const [markedForReview, setMarkedForReview] = useState(new Set());

    const { saveQuizProgress, getQuizProgress, clearQuizProgress } = useQuizProgress();

    const submitQuiz = useCallback(async () => {
        if (!currentQuiz) return;
        setIsActive(false);
        const results = await quizService.submitQuizAnswers({ quizId: currentQuiz.id, answers });
        setScore(results.score);
        setFinalResults(results);
        setIsCompleted(true);
    }, [currentQuiz, answers]); // Dependensi ini memastikan fungsi hanya dibuat ulang jika kuis atau jawaban berubah

    const startQuiz = useCallback(() => {
        setIsActive(true);
        setIsCompleted(false);
        setReviewMode(false);
    }, []);

    const pauseQuiz = useCallback(() => {
        setIsActive(false);
    }, []);

    const resumeQuiz = useCallback(() => {
        setIsActive(true);
    }, []);

    const answerQuestion = useCallback((questionIndex, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answer
        }));
    }, []);

    const nextQuestion = useCallback(() => {
        if (currentQuestionIndex < currentQuiz?.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    }, [currentQuestionIndex, currentQuiz?.questions.length]);

    const previousQuestion = useCallback(() => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    }, [currentQuestionIndex]);

    const goToQuestion = useCallback((questionIndex) => {
        if (questionIndex >= 0 && questionIndex < currentQuiz?.questions.length) {
            setCurrentQuestionIndex(questionIndex);
        }
    }, [currentQuiz?.questions.length]);

    const markForReview = useCallback((questionIndex) => {
        setMarkedForReview(prev => {
            const newSet = new Set(prev);
            if (newSet.has(questionIndex)) {
                newSet.delete(questionIndex);
            } else {
                newSet.add(questionIndex);
            }
            return newSet;
        });
    }, []);

    const calculateScore = useCallback(() => {
        if (!currentQuiz) return 0;

        let correctAnswers = 0;
        currentQuiz.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });

        return Math.round((correctAnswers / currentQuiz.questions.length) * 100);
    }, [currentQuiz, answers]);

    // const submitQuiz = useCallback(() => {
    //     const finalScore = calculateScore();
    //     setScore(finalScore);
    //     setIsCompleted(true);
    //     setIsActive(false);
    //     setReviewMode(true);
    //     clearQuizProgress(quizId);
    // }, [calculateScore, clearQuizProgress, quizId]);

    const resetQuiz = useCallback(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimeRemaining(currentQuiz?.timeLimit || 0);
        setIsActive(false);
        setIsCompleted(false);
        setScore(null);
        setReviewMode(false);
        setMarkedForReview(new Set());
        clearQuizProgress(quizId);
    }, [currentQuiz?.timeLimit, clearQuizProgress, quizId]);

    const getQuestionStatus = useCallback((questionIndex) => {
        if (answers[questionIndex] !== undefined) {
            return 'answered';
        }
        if (markedForReview.has(questionIndex)) {
            return 'marked';
        }
        return 'unanswered';
    }, [answers, markedForReview]);

    const getAnsweredCount = useCallback(() => {
        return Object.keys(answers).length;
    }, [answers]);

    const getUnansweredQuestions = useCallback(() => {
        if (!currentQuiz) return [];
        return currentQuiz.questions
            .map((_, index) => index)
            .filter(index => answers[index] === undefined);
    }, [currentQuiz, answers]);

    // Format time for display
    const formatTime = useCallback((seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Load quiz data (would normally come from API)
    // FIXME: timer won't start
    useEffect(() => {
        if (quizId) {
            const loadQuiz = async () => {
                const quizData = await quizService.getQuizById(quizId);
                setCurrentQuiz(quizData);
                setTimeRemaining(quizData.timeLimit);
                setIsActive(true);
            }

            loadQuiz();

            // Mock loading quiz data
            // const mockQuiz = {
            //     id: quizId,
            //     title: `Quiz ${quizId}`,
            //     description: 'Test your knowledge',
            //     timeLimit: 1800, // 30 minutes in seconds
            //     questions: [
            //         {
            //             id: 1,
            //             type: 'multiple_choice',
            //             question: 'What is React?',
            //             options: ['A library', 'A framework', 'A language', 'A database'],
            //             correctAnswer: 0,
            //             explanation: 'React is a JavaScript library for building user interfaces.'
            //         },
            //         {
            //             id: 2,
            //             type: 'true_false',
            //             question: 'React uses virtual DOM',
            //             options: ['True', 'False'],
            //             correctAnswer: 0,
            //             explanation: 'React uses virtual DOM to improve performance.'
            //         }
            //     ],
            //     passingScore: 70
            // };

            // setCurrentQuiz(mockQuiz);
            // setTimeRemaining(mockQuiz.timeLimit);

            // Load saved progress
            // const savedProgress = getQuizProgress(quizId);
            // if (savedProgress) {
            //     setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
            //     setAnswers(savedProgress.answers);
            //     setTimeRemaining(savedProgress.timeSpent ? mockQuiz.timeLimit - savedProgress.timeSpent : mockQuiz.timeLimit);
            // }
        }
    }, [quizId]);

    // Timer logic
    useEffect(() => {
        let interval = null;
        if (isActive && timeRemaining > 0 && !isCompleted) {
            interval = setInterval(() => {
                setTimeRemaining(time => {
                    if (time <= 1) {
                        clearInterval(interval);
                        setIsActive(false);
                        setIsCompleted(true);
                        submitQuiz();
                        return 0;
                    }
                    return time - 1;
                });
            }, 1000);
        } else if (timeRemaining === 0) {
            setIsActive(false);
            setIsCompleted(true);
        }
        return () => clearInterval(interval);
    }, [isActive, timeRemaining, isCompleted, submitQuiz]);

    // Auto-save progress
    useEffect(() => {
        if (currentQuiz && isActive) {
            const timeSpent = currentQuiz.timeLimit - timeRemaining;
            saveQuizProgress(quizId, currentQuestionIndex, answers, timeSpent);
        }
    }, [currentQuestionIndex, answers, timeRemaining, isActive, currentQuiz, quizId, saveQuizProgress]);

    return {
        // Quiz data
        currentQuiz,
        currentQuestionIndex,
        answers,
        timeRemaining,
        score,

        // State flags
        isActive,
        isCompleted,
        reviewMode,
        markedForReview,

        // Actions
        startQuiz,
        pauseQuiz,
        resumeQuiz,
        answerQuestion,
        nextQuestion,
        previousQuestion,
        goToQuestion,
        markForReview,
        submitQuiz,
        resetQuiz,

        // Computed values
        getQuestionStatus,
        getAnsweredCount,
        getUnansweredQuestions,
        formatTime,

        // Progress info
        progress: {
            answered: getAnsweredCount(),
            total: currentQuiz?.questions.length || 0,
            percentage: currentQuiz ? (getAnsweredCount() / currentQuiz.questions.length) * 100 : 0
        },

        actions: { answerQuestion, nextQuestion, previousQuestion, submitQuiz },
        helpers: { formatTime }
    };
};
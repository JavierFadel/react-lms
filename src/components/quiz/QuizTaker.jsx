
import React, { useState, useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const quizzes = [
    {
        id: 1,
        title: "React Basics Quiz",
        moduleId: 1,
        category: "Programming",
        description: "Test your knowledge of React fundamentals",
        questions: [
            { id: 1, type: "multiple-choice", question: "What is JSX?", options: ["A JavaScript library", "A syntax extension for JavaScript", "A database query language", "A CSS framework"], correctAnswer: 1, explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files." },
            { id: 2, type: "true-false", question: "React components must always return a single parent element.", options: ["True", "False"], correctAnswer: 1, explanation: "With React Fragments or React 16+, components can return multiple elements without a wrapper." },
            { id: 3, type: "multiple-choice", question: "Which hook is used for managing state in functional components?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: 1, explanation: "useState is the primary hook for managing local state in functional components." }
        ],
        timeLimit: 300,
        passingScore: 70,
        difficulty: "Beginner"
    },
    {
        id: 2,
        title: "Advanced React Hooks Assessment",
        moduleId: 2,
        category: "Programming",
        description: "Advanced quiz on React Hooks patterns",
        questions: [
            { id: 1, type: "multiple-choice", question: "When should you use useEffect with an empty dependency array?", options: ["When you want the effect to run on every render", "When you want the effect to run only once after mounting", "When you want the effect to never run", "When you want the effect to run on state changes"], correctAnswer: 1, explanation: "An empty dependency array makes useEffect run only once after the component mounts." },
            { id: 2, type: "essay", question: "Explain the difference between useCallback and useMemo hooks.", correctAnswer: "useCallback memoizes functions while useMemo memoizes values/computations", explanation: "useCallback returns a memoized version of the callback function, while useMemo returns a memoized value." }
        ],
        timeLimit: 600,
        passingScore: 75,
        difficulty: "Advanced"
    },
    {
        id: 3,
        title: "Database Design Quiz",
        moduleId: 3,
        category: "Database",
        description: "Test your database design knowledge",
        questions: [
            { id: 1, type: "multiple-choice", question: "What is the purpose of database normalization?", options: ["To make queries faster", "To reduce data redundancy", "To increase storage space", "To complicate the schema"], correctAnswer: 1, explanation: "Database normalization reduces data redundancy and improves data integrity." }
        ],
        timeLimit: 450,
        passingScore: 70,
        difficulty: "Intermediate"
    }
];

const QuizTaker = ({ quizId, onFinish }) => {
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    // --- Logika Auto-save untuk Mencegah Infinite Loop ---
    const [debouncedAnswers, setDebouncedAnswers] = useState(answers);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedAnswers(answers);
        }, 500); // Tunda 500ms
        return () => clearTimeout(handler);
    }, [answers]);

    useEffect(() => {
        if (quiz && !isCompleted) {
            try {
                const progress = { currentQuestionIndex, answers: debouncedAnswers, timeRemaining };
                localStorage.setItem(`quiz_progress_${quizId}`, JSON.stringify(progress));
            } catch (e) {
                console.error("Gagal menyimpan progres:", e);
            }
        }
    }, [debouncedAnswers, currentQuestionIndex, timeRemaining, quiz, quizId, isCompleted]);

    // --- Logika Utama Kuis ---
    const handleSubmit = useCallback(() => {
        if (!quiz) return;

        let correctCount = 0;
        quiz.questions.forEach(q => {
            if (answers[q.id] === q.correctAnswer) {
                correctCount++;
            }
        });
        const finalScore = Math.round((correctCount / quiz.questions.length) * 100);

        setIsCompleted(true);
        localStorage.removeItem(`quiz_progress_${quizId}`);
        onFinish({ score: finalScore, answers, quiz });
    }, [quiz, answers, quizId, onFinish]);

    useEffect(() => {
        const loadQuiz = async () => {
            const savedProgress = JSON.parse(localStorage.getItem(`quiz_progress_${quizId}`));
            const quizData = quizzes.find(q => q.id === quizId);

            if (quizData) {
                setQuiz(quizData);
                if (savedProgress) {
                    setAnswers(savedProgress.answers || {});
                    setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
                    setTimeRemaining(savedProgress.timeRemaining || quizData.timeLimit);
                } else {
                    setTimeRemaining(quizData.timeLimit);
                }
            }
        };
        loadQuiz();
    }, [quizId]);

    useEffect(() => {
        if (timeRemaining <= 0 && quiz && !isCompleted) {
            handleSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, quiz, isCompleted, handleSubmit]);

    if (!quiz) return <LoadingSpinner />;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

    const handleAnswer = (questionId, answerIndex) => {
        setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{quiz.title}</h2>
                        <p className="text-indigo-500 font-semibold">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>
                    </div>
                    <div className="text-2xl font-bold text-red-500 bg-red-100 px-4 py-2 rounded-lg">
                        <Clock className="inline-block h-6 w-6 mr-2" />
                        {`${Math.floor(timeRemaining / 60)}`.padStart(2, '0')}:{`${timeRemaining % 60}`.padStart(2, '0')}
                    </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                    <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mb-8">{currentQuestion.question}</h3>

                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(currentQuestion.id, index)}
                            className={`p-4 w-full text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 ${answers[currentQuestion.id] === index ? 'bg-indigo-500 border-indigo-600 text-white' : 'bg-gray-100 border-transparent hover:bg-indigo-100 hover:border-indigo-500'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-between">
                    <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="px-6 py-2 font-semibold rounded-lg bg-gray-200 disabled:opacity-50">Previous</button>
                    <button onClick={handleNext} className="px-6 py-2 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                        {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuizTaker;

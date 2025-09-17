
import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import QuizCard from './QuizCard';

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

const QuizLobby = ({ onStartQuiz }) => {
    const [quizzesList, setQuizzesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadQuizzes = async () => {
            setIsLoading(true);
            // Simulasi panggilan API
            await new Promise(res => setTimeout(res, 400));
            setQuizzesList(quizzes);
            setIsLoading(false);
        };
        loadQuizzes();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <div className='mb-6'>
                <h1 className="text-3xl font-bold text-gray-900">Forum Discussions</h1>
                <p className="text-gray-600 mt-2">Ask, discuss, and help each other on any topic.</p>
            </div>
            {/* <div className="text-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Forum Discussions</h1>
                    <p className="text-gray-600 mt-2">Ask, discuss, and help each other on any topic.</p>
                </div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quizzesList.map(quiz => <QuizCard key={quiz.id} quiz={quiz} onStart={onStartQuiz} />)}
            </div>
        </div>
    );
};

export default QuizLobby;

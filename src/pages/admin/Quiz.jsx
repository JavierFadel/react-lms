// import React, { useState, useCallback } from 'react';
// import QuizTaker from '../../components/quiz/QuizTaker';
// import QuizResults from '../../components/quiz/QuizResults';
// import QuizLobby from '../../components/quiz/QuizLobby';

// export default function QuizPage() {
//     const [view, setView] = useState('lobby'); // 'lobby', 'taking', 'results'
//     const [selectedQuizId, setSelectedQuizId] = useState(null);
//     const [quizResults, setQuizResults] = useState(null);

//     const handleStartQuiz = (quizId) => {
//         setSelectedQuizId(quizId);
//         setView('taking');
//     };

//     const handleFinishQuiz = useCallback((results) => {
//         setQuizResults(results);
//         setView('results');
//     }, []);

//     const handleRestart = () => {
//         setView('lobby');
//         setSelectedQuizId(null);
//         setQuizResults(null);
//     };

//     const renderContent = () => {
//         switch (view) {
//             case 'taking':
//                 return <QuizTaker quizId={selectedQuizId} onFinish={handleFinishQuiz} />;
//             case 'results':
//                 return <QuizResults results={quizResults} onRestart={handleRestart} />;
//             case 'lobby':
//             default:
//                 return <QuizLobby onStartQuiz={handleStartQuiz} />;
//         }
//     };

//     return (
//         <div className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full p-4 sm:p-8 flex items-center justify-center">
//             {renderContent()}
//         </div>
//     );
// }

// import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
// import { BookOpen, HelpCircle, Clock, Award, CheckCircle, XCircle, ArrowRight, RotateCw } from 'lucide-react';

// // ===================================================================================
// // DATA & SERVICES (Berdasarkan file yang Anda unggah)
// // ===================================================================================

// const quizzes = [
//     {
//         id: 1,
//         title: "React Basics Quiz",
//         moduleId: 1,
//         category: "Programming",
//         description: "Test your knowledge of React fundamentals",
//         questions: [
//             { id: 1, type: "multiple-choice", question: "What is JSX?", options: ["A JavaScript library", "A syntax extension for JavaScript", "A database query language", "A CSS framework"], correctAnswer: 1, explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files." },
//             { id: 2, type: "true-false", question: "React components must always return a single parent element.", options: ["True", "False"], correctAnswer: 1, explanation: "With React Fragments or React 16+, components can return multiple elements without a wrapper." },
//             { id: 3, type: "multiple-choice", question: "Which hook is used for managing state in functional components?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: 1, explanation: "useState is the primary hook for managing local state in functional components." }
//         ],
//         timeLimit: 300,
//         passingScore: 70,
//         difficulty: "Beginner"
//     },
//     // ... kuis lainnya
// ];

// const quizService = {
//     getQuizzes: async () => {
//         await new Promise(res => setTimeout(res, 400));
//         return { data: quizzes, pagination: { total: quizzes.length } };
//     },
//     getQuizById: async (quizId) => {
//         await new Promise(res => setTimeout(res, 400));
//         const quiz = quizzes.find(q => q.id === quizId);
//         if (!quiz) throw new Error('Quiz not found');
//         return quiz;
//     },
//     submitQuizAnswers: async ({ quizId, answers }) => {
//         await new Promise(res => setTimeout(res, 500));
//         const quiz = quizzes.find(q => q.id === quizId);
//         if (!quiz) throw new Error('Quiz not found');
//         let correctAnswersCount = 0;
//         quiz.questions.forEach((question) => {
//             if (answers[question.id] === question.correctAnswer) correctAnswersCount++;
//         });
//         const score = Math.round((correctAnswersCount / quiz.questions.length) * 100);
//         return { score, answers, quiz };
//     }
// };

// // ===================================================================================
// // HOOKS (DENGAN PERBAIKAN)
// // ===================================================================================

// // --- HOOK BARU: useDebounce ---
// const useDebounce = (value, delay) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);
//     useEffect(() => {
//         const handler = setTimeout(() => {
//             setDebouncedValue(value);
//         }, delay);
//         return () => clearTimeout(handler);
//     }, [value, delay]);
//     return debouncedValue;
// };

// // --- Hook dari: useLocalStorage.js (Disederhanakan untuk contoh ini) ---
// const useQuizProgress = () => {
//     const saveQuizProgress = useCallback((quizId, currentQuestionIndex, answers, timeSpent) => {
//         try {
//             const progress = { currentQuestionIndex, answers, timeSpent };
//             window.localStorage.setItem(`quiz_progress_${quizId}`, JSON.stringify(progress));
//         } catch (error) {
//             console.error("Error saving quiz progress:", error);
//         }
//     }, []);

//     const getQuizProgress = useCallback((quizId) => {
//         try {
//             const item = window.localStorage.getItem(`quiz_progress_${quizId}`);
//             return item ? JSON.parse(item) : null;
//         } catch (error) {
//             console.error("Error getting quiz progress:", error);
//             return null;
//         }
//     }, []);

//     const clearQuizProgress = useCallback((quizId) => {
//         try {
//             window.localStorage.removeItem(`quiz_progress_${quizId}`);
//         } catch (error) {
//             console.error("Error clearing quiz progress:", error);
//         }
//     }, []);

//     return { saveQuizProgress, getQuizProgress, clearQuizProgress };
// };

// // --- Konten dari: useQuiz.js (DENGAN PERBAIKAN) ---
// const useQuiz = (quizId) => {
//     const [currentQuiz, setCurrentQuiz] = useState(null);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState({});
//     const [timeRemaining, setTimeRemaining] = useState(0);
//     const [isActive, setIsActive] = useState(false);
//     const [isCompleted, setIsCompleted] = useState(false);
//     const [score, setScore] = useState(null);
//     const [finalResults, setFinalResults] = useState(null);
//     const { saveQuizProgress, getQuizProgress, clearQuizProgress } = useQuizProgress();

//     const debouncedAnswers = useDebounce(answers, 500);

//     const submitQuiz = useCallback(async () => {
//         if (!currentQuiz) return;
//         setIsActive(false);
//         const results = await quizService.submitQuizAnswers({ quizId: currentQuiz.id, answers });
//         setScore(results.score);
//         setFinalResults(results);
//         setIsCompleted(true);
//         clearQuizProgress(currentQuiz.id);
//     }, [currentQuiz, answers, clearQuizProgress]);

//     useEffect(() => {
//         if (quizId) {
//             const loadQuiz = async () => {
//                 const quizData = await quizService.getQuizById(quizId);
//                 const savedProgress = getQuizProgress(quizId);
//                 setCurrentQuiz(quizData);
//                 if (savedProgress) {
//                     setAnswers(savedProgress.answers || {});
//                     setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
//                     setTimeRemaining(savedProgress.timeSpent ? quizData.timeLimit - savedProgress.timeSpent : quizData.timeLimit);
//                 } else {
//                     setTimeRemaining(quizData.timeLimit);
//                 }
//                 setIsActive(true);
//             };
//             loadQuiz();
//         }
//     }, [quizId, getQuizProgress]);

//     useEffect(() => {
//         let interval = null;
//         if (isActive && timeRemaining > 0 && !isCompleted) {
//             interval = setInterval(() => {
//                 setTimeRemaining(time => {
//                     if (time <= 1) {
//                         clearInterval(interval);
//                         submitQuiz();
//                         return 0;
//                     }
//                     return time - 1;
//                 });
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [isActive, timeRemaining, isCompleted, submitQuiz]);

//     useEffect(() => {
//         if (currentQuiz && isActive && !isCompleted) {
//             const timeSpent = currentQuiz.timeLimit - timeRemaining;
//             saveQuizProgress(quizId, currentQuestionIndex, debouncedAnswers, timeSpent);
//         }
//     }, [debouncedAnswers, currentQuestionIndex, timeRemaining, isActive, currentQuiz, quizId, saveQuizProgress]);

//     const answerQuestion = useCallback((questionId, answerIndex) => {
//         setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
//     }, []);

//     const nextQuestion = useCallback(() => {
//         if (currentQuestionIndex < (currentQuiz?.questions.length || 0) - 1) {
//             setCurrentQuestionIndex(prev => prev + 1);
//         }
//     }, [currentQuestionIndex, currentQuiz]);

//     const previousQuestion = useCallback(() => {
//         if (currentQuestionIndex > 0) {
//             setCurrentQuestionIndex(prev => prev - 1);
//         }
//     }, [currentQuestionIndex]);

//     const formatTime = useCallback((seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     }, []);

//     return {
//         currentQuiz, currentQuestionIndex, answers, timeRemaining, score, isCompleted, isActive, finalResults,
//         actions: { answerQuestion, nextQuestion, previousQuestion, submitQuiz },
//         helpers: { formatTime }
//     };
// };

// // ===================================================================================
// // UI COMPONENTS
// // ===================================================================================

// const LoadingSpinner = () => (
//     <div className="flex justify-center items-center p-10"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div></div>
// );

// const QuizLobby = ({ onStartQuiz }) => {
//     const [quizzesList, setQuizzesList] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const loadQuizzes = async () => {
//             setIsLoading(true);
//             const response = await quizService.getQuizzes();
//             setQuizzesList(response.data); 
//             setIsLoading(false);
//         };
//         loadQuizzes();
//     }, []);

//     if (isLoading) return <LoadingSpinner />;

//     return (
//         <div>
//             <div className="text-center mb-12">
//                 <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Quiz Center</h1>
//                 <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Select a quiz to test your knowledge.</p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {quizzesList.map(quiz => <QuizCard key={quiz.id} quiz={quiz} onStart={onStartQuiz} />)}
//             </div>
//         </div>
//     );
// };

// const QuizTaker = ({ quizId, onFinish }) => {
//     const { currentQuiz, currentQuestionIndex, answers, timeRemaining, isCompleted, finalResults, actions, helpers } = useQuiz(quizId);

//     useEffect(() => {
//         if (isCompleted && finalResults) {
//             onFinish(finalResults);
//         }
//     }, [isCompleted, finalResults, onFinish]);

//     if (!currentQuiz) return <LoadingSpinner />;
//     const currentQuestionObject = currentQuiz.questions[currentQuestionIndex];
//     if (!currentQuestionObject) return <LoadingSpinner />;

//     const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

//     return (
//         <div className="w-full max-w-4xl mx-auto">
//             <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
//                 <div className="flex justify-between items-center mb-6">
//                     <div>
//                         <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{currentQuiz.title}</h2>
//                         <p className="text-indigo-500 dark:text-indigo-400 font-semibold">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
//                     </div>
//                     <div className="text-2xl font-bold text-red-500 bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded-lg">
//                         <Clock className="inline-block h-6 w-6 mr-2" />
//                         {helpers.formatTime(timeRemaining)}
//                     </div>
//                 </div>
//                 <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
//                     <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
//                 </div>
//                 <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">{currentQuestionObject.question}</h3>
//                 <div className="space-y-4">
//                     {currentQuestionObject.options.map((option, index) => (
//                         <button
//                             key={index}
//                             onClick={() => actions.answerQuestion(currentQuestionObject.id, index)}
//                             className={`p-4 w-full text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 ${answers[currentQuestionObject.id] === index ? 'bg-indigo-500 border-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border-transparent hover:bg-indigo-100 dark:hover:bg-gray-600 hover:border-indigo-500'}`}
//                         >
//                             {option}
//                         </button>
//                     ))}
//                 </div>
//                 <div className="mt-8 flex justify-between">
//                     <button onClick={actions.previousQuestion} disabled={currentQuestionIndex === 0} className="px-6 py-2 font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 disabled:opacity-50">Previous</button>
//                     {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
//                         <button onClick={actions.submitQuiz} className="px-6 py-2 font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600">Submit</button>
//                     ) : (
//                         <button onClick={actions.nextQuestion} className="px-6 py-2 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Next</button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// const QuizResults = ({ results, onRestart }) => {
//     const { score, answers, quiz } = results;
//     return (
//         <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto text-center">
//             <Award className="h-24 w-24 text-yellow-400 mx-auto animate-pulse" />
//             <h2 className="mt-4 text-5xl font-extrabold text-gray-900 dark:text-white">Quiz Complete!</h2>
//             <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">You scored <span className="font-bold text-indigo-500">{score}%</span> on the "{quiz.title}" quiz.</p>
//             <div className="mt-10 text-left">
//                 <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Review Your Answers</h3>
//                 <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
//                     {quiz.questions.map((q, index) => {
//                         const userAnswerIndex = answers[q.id];
//                         const isCorrect = userAnswerIndex === q.correctAnswer;
//                         return (
//                             <li key={q.id} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
//                                 <p className="font-semibold text-gray-800 dark:text-gray-100">{index + 1}. {q.question}</p>
//                                 <div className={`flex items-center mt-2 text-sm ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                                     {isCorrect ? <CheckCircle className="h-5 w-5 mr-2" /> : <XCircle className="h-5 w-5 mr-2" />}
//                                     <span>Your answer: {q.options[userAnswerIndex] || "Not answered"}</span>
//                                 </div>
//                                 {!isCorrect && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Correct answer: {q.options[q.correctAnswer]}</p>}
//                                 {q.explanation && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 italic">Explanation: {q.explanation}</p>}
//                             </li>
//                         );
//                     })}
//                 </ul>
//             </div>
//             <button onClick={onRestart} className="mt-10 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 flex items-center justify-center mx-auto space-x-2">
//                 <RotateCw className="h-5 w-5" />
//                 <span>Take Another Quiz</span>
//             </button>
//         </div>
//     );
// };

// const QuizCard = ({ quiz, onStart }) => {
//     const difficultyColors = {
//         Beginner: 'bg-green-100 text-green-800 border-green-300',
//         Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
//         Advanced: 'bg-red-100 text-red-800 border-red-300',
//     };
//     return (
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
//             <div className="p-6 flex-grow">
//                 <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${difficultyColors[quiz.difficulty]}`}>{quiz.difficulty}</span>
//                 <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{quiz.title}</h3>
//                 <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{quiz.description}</p>
//             </div>
//             <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-b-2xl mt-auto">
//                 <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
//                     <div className="flex items-center space-x-2"><HelpCircle className="h-5 w-5 text-indigo-400" /><span>{quiz.questions.length} Questions</span></div>
//                     <div className="flex items-center space-x-2"><Clock className="h-5 w-5 text-indigo-400" /><span>{Math.floor(quiz.timeLimit / 60)} Mins</span></div>
//                 </div>
//                 <button onClick={() => onStart(quiz.id)} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 flex items-center justify-center space-x-2">
//                     <span>Start Quiz</span>
//                     <ArrowRight className="h-5 w-5" />
//                 </button>
//             </div>
//         </div>
//     );
// };

// // ===================================================================================
// // MAIN PAGE COMPONENT
// // ===================================================================================

// export default function QuizPage() {
//     const [view, setView] = useState('lobby');
//     const [selectedQuizId, setSelectedQuizId] = useState(null);
//     const [quizResults, setQuizResults] = useState(null);

//     const handleStartQuiz = (quizId) => {
//         setSelectedQuizId(quizId);
//         setView('taking');
//     };

//     const handleFinishQuiz = useCallback((results) => {
//         setQuizResults(results);
//         setView('results');
//     }, []);

//     const handleRestart = () => {
//         setView('lobby');
//         setSelectedQuizId(null);
//         setQuizResults(null);
//     };

//     const renderContent = () => {
//         switch (view) {
//             case 'taking':
//                 return <QuizTaker quizId={selectedQuizId} onFinish={handleFinishQuiz} />;
//             case 'results':
//                 return <QuizResults results={quizResults} onRestart={handleRestart} />;
//             case 'lobby':
//             default:
//                 return <QuizLobby onStartQuiz={handleStartQuiz} />;
//         }
//     };

//     return (
//         <div className="bg-gray-100 dark:bg-gray-900 min-h-screen w-full p-4 sm:p-8 flex items-center justify-center">
//             {renderContent()}
//         </div>
//     );
// }

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BookOpen, HelpCircle, Clock, Award, CheckCircle, XCircle, ArrowRight, RotateCw } from 'lucide-react';

// ===================================================================================
// DATA KUIS (Berdasarkan dummyData.js Anda)
// Untuk kesederhanaan, data ini kita letakkan langsung di sini.
// ===================================================================================
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

// ===================================================================================
// KOMPONEN-KOMPONEN UI
// Semua komponen yang dibutuhkan untuk kuis didefinisikan di sini.
// ===================================================================================

const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
    </div>
);

const QuizCard = ({ quiz, onStart }) => {
    const difficultyColors = {
        Beginner: 'bg-green-100 text-green-800 border-green-300',
        Intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        Advanced: 'bg-red-100 text-red-800 border-red-300',
    };
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
            <div className="p-6 flex-grow">
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${difficultyColors[quiz.difficulty]}`}>{quiz.difficulty}</span>
                <h3 className="mt-4 text-2xl font-bold text-gray-900">{quiz.title}</h3>
                <p className="mt-2 text-gray-600 text-sm">{quiz.description}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-b-2xl mt-auto">
                <div className="flex justify-between items-center text-gray-700">
                    <div className="flex items-center space-x-2"><HelpCircle className="h-5 w-5 text-indigo-400" /><span>{quiz.questions.length} Questions</span></div>
                    <div className="flex items-center space-x-2"><Clock className="h-5 w-5 text-indigo-400" /><span>{Math.floor(quiz.timeLimit / 60)} Mins</span></div>
                </div>
                <button onClick={() => onStart(quiz.id)} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Start Quiz</span>
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
};

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

const QuizResults = ({ results, onRestart }) => {
    const { score, answers, quiz } = results;

    return (
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl mx-auto text-center">
            <Award className="h-24 w-24 text-yellow-400 mx-auto animate-pulse" />
            <h2 className="mt-4 text-5xl font-extrabold text-gray-900">Quiz Complete!</h2>
            <p className="mt-2 text-xl text-gray-600">You scored <span className="font-bold text-indigo-500">{score}%</span> on the "{quiz.title}" quiz.</p>

            <div className="mt-10 text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Review Your Answers</h3>
                <ul className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {quiz.questions.map((q, index) => {
                        const userAnswerIndex = answers[q.id];
                        const isCorrect = userAnswerIndex === q.correctAnswer;
                        return (
                            <li key={q.id} className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold text-gray-800">{index + 1}. {q.question}</p>
                                <div className={`flex items-center mt-2 text-sm ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {isCorrect ? <CheckCircle className="h-5 w-5 mr-2" /> : <XCircle className="h-5 w-5 mr-2" />}
                                    <span>Your answer: {q.options[userAnswerIndex] || "Not answered"}</span>
                                </div>
                                {!isCorrect && <p className="text-sm text-gray-500 mt-1">Correct answer: {q.options[q.correctAnswer]}</p>}
                                {q.explanation && <p className="text-sm text-gray-600 mt-2 italic">Explanation: {q.explanation}</p>}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <button onClick={onRestart} className="mt-10 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 flex items-center justify-center mx-auto space-x-2">
                <RotateCw className="h-5 w-5" />
                <span>Take Another Quiz</span>
            </button>
        </div>
    );
};

// ===================================================================================
// KOMPONEN HALAMAN UTAMA
// Ini adalah "controller" yang mengatur tampilan mana yang aktif.
// ===================================================================================

export default function QuizPage() {
    const [view, setView] = useState('lobby'); // 'lobby', 'taking', 'results'
    const [selectedQuizId, setSelectedQuizId] = useState(null);
    const [quizResults, setQuizResults] = useState(null);

    const handleStartQuiz = (quizId) => {
        setSelectedQuizId(quizId);
        setView('taking');
    };

    const handleFinishQuiz = useCallback((results) => {
        setQuizResults(results);
        setView('results');
    }, []);

    const handleRestart = () => {
        setView('lobby');
        setSelectedQuizId(null);
        setQuizResults(null);
    };

    const renderContent = () => {
        switch (view) {
            case 'taking':
                return <QuizTaker quizId={selectedQuizId} onFinish={handleFinishQuiz} />;
            case 'results':
                return <QuizResults results={quizResults} onRestart={handleRestart} />;
            case 'lobby':
            default:
                return <QuizLobby onStartQuiz={handleStartQuiz} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen w-full p-4 sm:p-8 flex justify-center">
            {renderContent()}
        </div>
    );
}

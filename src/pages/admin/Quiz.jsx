import React, { useState, useCallback } from 'react';
import QuizLobby from '../../components/quiz/QuizLobby';
import QuizTaker from '../../components/quiz/QuizTaker';
import QuizResults from '../../components/quiz/QuizResults';

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
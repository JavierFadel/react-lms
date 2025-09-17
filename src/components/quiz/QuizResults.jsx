import React from 'react';
import { Award, CheckCircle, XCircle, RotateCw } from 'lucide-react';

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

export default QuizResults;

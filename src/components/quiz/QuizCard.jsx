
import React from 'react';
import { HelpCircle, Clock, ArrowRight } from 'lucide-react';

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

export default QuizCard;

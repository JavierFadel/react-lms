// import React, { useReducer, useState } from 'react';
// import PropTypes from 'prop-types';
// import quizReducer, { initialState } from '../../reducers/quizReducer';
// import QuestionCard from './QuestionCard';
// import TimerComponent from './TimerComponent';
// import { Button } from '../common/Button'; // Asumsi komponen Button sudah ada

// /**
//  * Komponen QuizTaker untuk mengelola dan menampilkan alur pengerjaan kuis.
//  *
//  * @param {object} props
//  * @param {Array<object>} props.questions - Daftar semua pertanyaan untuk kuis ini.
//  * @param {number} props.duration - Durasi kuis dalam detik.
//  * @param {function} props.onQuizComplete - Callback yang dipanggil saat kuis selesai.
//  */
// const QuizTaker = ({ questions, duration, onQuizComplete }) => {
//     const [state, dispatch] = useReducer(quizReducer, {
//         ...initialState,
//         questions,
//     });

//     const {
//         currentQuestionIndex,
//         userAnswers,
//         status,
//         score,
//     } = state;

//     const currentQuestion = questions[currentQuestionIndex];
//     const selectedAnswer = userAnswers[currentQuestion.id];

//     // Handler untuk memilih jawaban
//     const handleAnswerSelect = (answer) => {
//         dispatch({
//             type: 'ANSWER_QUESTION',
//             payload: {
//                 questionId: currentQuestion.id,
//                 answer,
//             },
//         });
//     };

//     // Handler untuk pindah ke pertanyaan berikutnya atau menyelesaikan kuis
//     const handleNext = () => {
//         // Cek jika ini pertanyaan terakhir
//         if (currentQuestionIndex < questions.length - 1) {
//             dispatch({ type: 'NEXT_QUESTION' });
//         } else {
//             // Jika terakhir, selesaikan kuis
//             dispatch({ type: 'FINISH_QUIZ' });
//             onQuizComplete({ score: state.score, answers: state.userAnswers });
//         }
//     };

//     // Handler jika waktu habis
//     const handleTimeUp = () => {
//         dispatch({ type: 'FINISH_QUIZ' });
//         onQuizComplete({ score: state.score, answers: state.userAnswers });
//     };

//     // Tampilan jika kuis telah selesai
//     if (status === 'finished') {
//         return (
//             <div className="p-8 text-center bg-white rounded-lg shadow-lg">
//                 <h2 className="text-2xl font-bold text-gray-800">Kuis Selesai!</h2>
//                 <p className="mt-4 text-lg">Skor Anda:</p>
//                 <p className="text-4xl font-bold text-blue-600 my-2">{score}</p>
//                 <Button onClick={() => window.location.reload()} className="mt-6">
//                     Coba Lagi
//                 </Button>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <div className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg">
//                 <span className="font-semibold">
//                     Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
//                 </span>
//                 <TimerComponent duration={duration} onTimeUp={handleTimeUp} />
//             </div>

//             <QuestionCard
//                 question={currentQuestion}
//                 onAnswerSelect={handleAnswerSelect}
//                 selectedAnswer={selectedAnswer}
//             />

//             <div className="mt-6 text-right">
//                 <Button onClick={handleNext} disabled={!selectedAnswer}>
//                     {currentQuestionIndex < questions.length - 1
//                         ? 'Berikutnya'
//                         : 'Selesaikan Kuis'}
//                 </Button>
//             </div>
//         </div>
//     );
// };

// QuizTaker.propTypes = {
//     questions: PropTypes.arrayOf(PropTypes.object).isRequired,
//     duration: PropTypes.number.isRequired,
//     onQuizComplete: PropTypes.func.isRequired,
// };

// export default QuizTaker;

import LoadingSpinner from "../common/LoadingSpinner";
import { useQuiz } from "../../hooks/useQuiz";
import { useEffect } from "react";
import { Clock } from "lucide-react";
import { formatTime } from "../../utils/dateUtils";

const QuizTaker = ({ quizId, onFinish }) => {
    const { currentQuiz, currentQuestionIndex, answers, timeRemaining, isCompleted, finalResults, actions, helpers } = useQuiz(quizId);

    useEffect(() => {
        if (isCompleted && finalResults) {
            onFinish(finalResults);
        }
    }, [isCompleted, finalResults, onFinish]);

    if (!currentQuiz) return <LoadingSpinner />;

    const currentQuestionObject = currentQuiz.questions[currentQuestionIndex];

    // Guard clause untuk memastikan objek pertanyaan ada sebelum dirender
    if (!currentQuestionObject) {
        return <div className="text-center text-red-500">Gagal memuat pertanyaan. Silakan coba lagi.</div>;
    }

    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{currentQuiz.title}</h2>
                        <p className="text-indigo-500 dark:text-indigo-400 font-semibold">Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</p>
                    </div>
                    <div className="text-2xl font-bold text-red-500 bg-red-100 dark:bg-red-900/50 px-4 py-2 rounded-lg">
                        <Clock className="inline-block h-6 w-6 mr-2" />
                        {formatTime(timeRemaining)}
                    </div>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
                    <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>

                {/* <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">{currentQuestion.question}</h3> */}
                {/* Menggunakan objek pertanyaan yang benar */}
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8">{currentQuestionObject.question}</h3>

                <div className="space-y-4">
                    {/* {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => actions.answerQuestion(currentQuestion.id, index)}
                            className={`p-4 w-full text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 ${answers[currentQuestion.id] === index ? 'bg-indigo-500 border-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border-transparent hover:bg-indigo-100 dark:hover:bg-gray-600 hover:border-indigo-500'}`}
                        >
                            {option}
                        </button>
                    ))} */}
                    {/* Menggunakan objek pertanyaan yang benar untuk .map() */}
                    {currentQuestionObject.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => actions.answerQuestion(currentQuestionObject.id, index)}
                            className={`p-4 w-full text-left text-lg font-medium rounded-lg border-2 transition-all duration-200 ${answers[currentQuestionObject.id] === index ? 'bg-indigo-500 border-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 border-transparent hover:bg-indigo-100 dark:hover:bg-gray-600 hover:border-indigo-500'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                <div className="mt-8 flex justify-between">
                    <button onClick={actions.previousQuestion} disabled={currentQuestionIndex === 0} className="px-6 py-2 font-semibold rounded-lg bg-gray-200 dark:bg-gray-600 disabled:opacity-50">Previous</button>
                    {currentQuestionIndex === currentQuiz.questions.length - 1 ? (
                        <button onClick={actions.submitQuiz} className="px-6 py-2 font-semibold rounded-lg bg-green-500 text-white hover:bg-green-600">Submit</button>
                    ) : (
                        <button onClick={actions.nextQuestion} className="px-6 py-2 font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Next</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizTaker;
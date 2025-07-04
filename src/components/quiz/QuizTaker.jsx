import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import quizReducer, { initialState } from '../../reducers/quizReducer';
import QuestionCard from './QuestionCard';
import TimerComponent from './TimerComponent';
import { Button } from '../common/Button'; // Asumsi komponen Button sudah ada

/**
 * Komponen QuizTaker untuk mengelola dan menampilkan alur pengerjaan kuis.
 *
 * @param {object} props
 * @param {Array<object>} props.questions - Daftar semua pertanyaan untuk kuis ini.
 * @param {number} props.duration - Durasi kuis dalam detik.
 * @param {function} props.onQuizComplete - Callback yang dipanggil saat kuis selesai.
 */
const QuizTaker = ({ questions, duration, onQuizComplete }) => {
    const [state, dispatch] = useReducer(quizReducer, {
        ...initialState,
        questions,
    });

    const {
        currentQuestionIndex,
        userAnswers,
        status,
        score,
    } = state;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = userAnswers[currentQuestion.id];

    // Handler untuk memilih jawaban
    const handleAnswerSelect = (answer) => {
        dispatch({
            type: 'ANSWER_QUESTION',
            payload: {
                questionId: currentQuestion.id,
                answer,
            },
        });
    };

    // Handler untuk pindah ke pertanyaan berikutnya atau menyelesaikan kuis
    const handleNext = () => {
        // Cek jika ini pertanyaan terakhir
        if (currentQuestionIndex < questions.length - 1) {
            dispatch({ type: 'NEXT_QUESTION' });
        } else {
            // Jika terakhir, selesaikan kuis
            dispatch({ type: 'FINISH_QUIZ' });
            onQuizComplete({ score: state.score, answers: state.userAnswers });
        }
    };

    // Handler jika waktu habis
    const handleTimeUp = () => {
        dispatch({ type: 'FINISH_QUIZ' });
        onQuizComplete({ score: state.score, answers: state.userAnswers });
    };

    // Tampilan jika kuis telah selesai
    if (status === 'finished') {
        return (
            <div className="p-8 text-center bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800">Kuis Selesai!</h2>
                <p className="mt-4 text-lg">Skor Anda:</p>
                <p className="text-4xl font-bold text-blue-600 my-2">{score}</p>
                <Button onClick={() => window.location.reload()} className="mt-6">
                    Coba Lagi
                </Button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg">
                <span className="font-semibold">
                    Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
                </span>
                <TimerComponent duration={duration} onTimeUp={handleTimeUp} />
            </div>

            <QuestionCard
                question={currentQuestion}
                onAnswerSelect={handleAnswerSelect}
                selectedAnswer={selectedAnswer}
            />

            <div className="mt-6 text-right">
                <Button onClick={handleNext} disabled={!selectedAnswer}>
                    {currentQuestionIndex < questions.length - 1
                        ? 'Berikutnya'
                        : 'Selesaikan Kuis'}
                </Button>
            </div>
        </div>
    );
};

QuizTaker.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    duration: PropTypes.number.isRequired,
    onQuizComplete: PropTypes.func.isRequired,
};

export default QuizTaker;
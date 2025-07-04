import React from 'react';
import PropTypes from 'prop-types';

/**
 * Komponen QuestionCard untuk menampilkan satu pertanyaan dan pilihan jawabannya.
 *
 * @param {object} props
 * @param {object} props.question - Objek pertanyaan yang akan ditampilkan.
 * @param {function} props.onAnswerSelect - Fungsi callback yang dipanggil saat pengguna memilih jawaban.
 * @param {string|null} props.selectedAnswer - Jawaban yang sedang dipilih oleh pengguna.
 */
const QuestionCard = ({ question, onAnswerSelect, selectedAnswer }) => {
    if (!question) {
        return <div>Memuat pertanyaan...</div>;
    }

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {question.text}
            </h3>
            <div className="space-y-3">
                {question.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;

                    // Kelas dasar untuk tombol pilihan
                    const baseClasses = "w-full text-left p-3 border rounded-lg transition-colors duration-200";

                    // Kelas dinamis berdasarkan status pilihan
                    const stateClasses = isSelected
                        ? "bg-blue-500 border-blue-600 text-white font-semibold"
                        : "bg-white hover:bg-gray-100 border-gray-300";

                    return (
                        <button
                            key={index}
                            onClick={() => onAnswerSelect(option)}
                            className={`${baseClasses} ${stateClasses}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

QuestionCard.propTypes = {
    question: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        text: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onAnswerSelect: PropTypes.func.isRequired,
    selectedAnswer: PropTypes.string,
};

export default QuestionCard;
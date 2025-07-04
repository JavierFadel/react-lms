import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../common/Button';
import { Input } from '../common/Input'; // Asumsi komponen Input sudah ada
import { PlusCircle, Trash2 } from 'lucide-react';

const QuizCreator = ({ onSaveQuiz }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([
        { text: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);

    // Handler untuk mengubah detail pertanyaan
    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index][event.target.name] = event.target.value;
        setQuestions(newQuestions);
    };

    // Handler untuk mengubah pilihan jawaban
    const handleOptionChange = (qIndex, oIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    // Handler untuk menambah pertanyaan baru
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { text: '', options: ['', '', '', ''], correctAnswer: '' },
        ]);
    };

    // Handler untuk menghapus pertanyaan
    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    // Handler untuk menyimpan kuis
    const handleSave = () => {
        // Di sini Anda bisa menambahkan validasi sebelum menyimpan
        const quizData = { title, description, questions };
        onSaveQuiz(quizData);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md border">
            <h2 className="text-2xl font-bold mb-6">Buat Kuis Baru</h2>

            {/* Detail Kuis */}
            <div className="space-y-4 mb-8">
                <Input
                    placeholder="Judul Kuis"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Deskripsi singkat kuis..."
                    className="w-full p-2 border rounded-md"
                    rows="3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
            </div>

            {/* Daftar Pertanyaan */}
            {questions.map((q, qIndex) => (
                <div key={qIndex} className="p-4 border-l-4 border-blue-500 bg-gray-50 rounded-r-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="font-semibold text-lg">Pertanyaan {qIndex + 1}</h4>
                        <Button variant="ghost" size="icon" onClick={() => removeQuestion(qIndex)}>
                            <Trash2 className="w-5 h-5 text-red-500" />
                        </Button>
                    </div>
                    <div className="space-y-3">
                        <Input
                            name="text"
                            placeholder="Tulis pertanyaan di sini..."
                            value={q.text}
                            onChange={(e) => handleQuestionChange(qIndex, e)}
                        />
                        {/* Pilihan Jawaban */}
                        {q.options.map((opt, oIndex) => (
                            <Input
                                key={oIndex}
                                placeholder={`Pilihan ${oIndex + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                            />
                        ))}
                        {/* Jawaban Benar */}
                        <select
                            name="correctAnswer"
                            value={q.correctAnswer}
                            onChange={(e) => handleQuestionChange(qIndex, e)}
                            className="w-full p-2 border rounded-md bg-white"
                        >
                            <option value="">Pilih jawaban yang benar</option>
                            {q.options.filter(opt => opt).map((opt, oIndex) => (
                                <option key={oIndex} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}

            {/* Tombol Aksi */}
            <div className="flex justify-between items-center mt-6">
                <Button variant="outline" onClick={addQuestion}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Tambah Pertanyaan
                </Button>
                <Button onClick={handleSave}>
                    Simpan Kuis
                </Button>
            </div>
        </div>
    );
};

QuizCreator.propTypes = {
    onSaveQuiz: PropTypes.func.isRequired,
};


export default QuizCreator;
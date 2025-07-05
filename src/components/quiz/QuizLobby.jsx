import LoadingSpinner from "../common/LoadingSpinner";
import QuizCard from "./QuizCard";
import { quizService } from "../../services/quizService";
import { useState, useEffect } from "react";

const QuizLobby = ({ onStartQuiz }) => {
    const [quizzesList, setQuizzesList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadQuizzes = async () => {
            setIsLoading(true);
            const data = await quizService.getQuizzes();
            const response = await quizService.getQuizzes();
            setQuizzesList(response.data);
            setIsLoading(false);
        };
        loadQuizzes();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <div>
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Quiz Center</h1>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Select a quiz to test your knowledge.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {quizzesList.map(quiz => <QuizCard key={quiz.id} quiz={quiz} onStart={onStartQuiz} />)}
            </div>
        </div>
    );
};

export default QuizLobby;
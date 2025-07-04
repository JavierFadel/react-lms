import { useEffect } from "react";
import { useLayout } from "../../components/common/Layout";
import { BookOpen, BarChart3, Trophy, GraduationCap } from "lucide-react";
import { modules, quizzes, achievements, currentUser } from '../../utils/dummyData';
import { getCompletedModules, getStreakData, getAverageQuizScore } from '../../utils/dummyData';
import AchievementCard from "./Pencapaian";

const Dashboard = () => {
    const { activeRoute, setActiveRoute, sidebarOpen, setSidebarOpen } = useLayout();

    useEffect(() => {
        setActiveRoute('dashboard');
    }, [setActiveRoute]);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dasboard</h1>
                <p className="text-gray-600 mt-2">
                    Welcome to Belajar Pintar - Your comprehensive learning platform
                </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Modules Completed</p>
                            <p className="text-2xl font-bold text-gray-900">{getCompletedModules().length}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Quiz Average</p>
                            <p className="text-2xl font-bold text-gray-900">{getAverageQuizScore()}%</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BarChart3 className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Study Streak</p>
                            <p className="text-2xl font-bold text-gray-900">{getStreakData().current} days</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Trophy className="text-orange-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Points</p>
                            <p className="text-2xl font-bold text-gray-900">{currentUser.totalPoints.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <GraduationCap className="text-purple-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Page specific content placeholder */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="text-center">
                    {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3> */}
                    <div className="grid grid-cols-1 gap-4">
                        {achievements.slice(0, 3).map((achievement) => (
                            <AchievementCard 
                                key={achievement.id} 
                                achievement={achievement} 
                                isUnlocked={achievement.unlocked} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
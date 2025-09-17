import { useEffect } from "react";
import { useLayout } from "../../components/common/Layout";
import { BookOpen, BarChart3, Trophy, GraduationCap } from "lucide-react";

import { 
    achievements, 
    currentUser, 
    getCompletedModules,
    getStreakData,
    getAverageQuizScore,
    analyticsData as analyticsDataForCharts
} from '../../utils/dummyData';
import { ANALYTICS_CONFIG } from "../../utils/constants";

import AchievementCard from "./Pencapaian";

import { useAnalytics } from "../../hooks/useAnalytics";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import CustomLineChart from "../../components/charts/LineChart";
import CustomBarChart from "../../components/charts/BarChart";
import CustomAreaChart from "../../components/charts/AreaChart";
import CustomPieChart from "../../components/charts/PieChart";
import CustomRadarChart from "../../components/charts/RadarChart";

const Dashboard = () => {
    const { activeRoute, setActiveRoute, sidebarOpen, setSidebarOpen } = useLayout();

    const { data: analyticsData, isLoading } = useAnalytics();

    const lineChartData = analyticsDataForCharts.weeklyProgress;
    const barChartData = analyticsDataForCharts.quizPerformance;
    const areaChartData = analyticsDataForCharts.cumulativeStudyHours;
    const pieChartData = analyticsDataForCharts.moduleStatusDistribution;
    const radarChartData = analyticsDataForCharts.skillsRadar;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
            </div>
        );
    };

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
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <div className="grid grid-cols-1 gap-4">
                    {achievements.slice(0, 1).map((achievement) => (
                        <AchievementCard 
                            key={achievement.id} 
                            achievement={achievement} 
                            isUnlocked={achievement.unlocked} 
                        />
                    ))}
                </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Aktivitas Belajar</h2>
                    <p className="text-gray-600 mt-2">
                        Track your learning milestones and celebrate your achievements
                    </p>
                </div>
                
                {/* First Row - Line Chart and Bar Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Progress Mingguan</h3>
                        <CustomLineChart 
                            data={lineChartData}
                            xAxisKey="week"
                            lines={[
                                { key: 'hours', color: ANALYTICS_CONFIG.CHART_COLORS[0] },
                                { key: 'modules', color: ANALYTICS_CONFIG.CHART_COLORS[1] }
                            ]}
                        />
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Performa Quiz</h3>
                        <CustomBarChart 
                            data={barChartData}
                            xAxisKey="name"
                            bars={[{ key: 'score', color: ANALYTICS_CONFIG.CHART_COLORS[2] }]}
                        />
                    </div>
                </div>

                {/* Second Row - Area Chart and Pie Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Jam Belajar Kumulatif</h3>
                        <CustomAreaChart 
                            data={areaChartData}
                            xAxisKey="date"
                            areas={[{ key: 'hours', color: ANALYTICS_CONFIG.CHART_COLORS[3] }]}
                        />
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Modul</h3>
                        <CustomPieChart 
                            data={pieChartData.map(item => ({
                                name: item.status,
                                value: item.count
                            }))}
                        />
                    </div>
                </div>

                {/* Third Row - Radar Chart (Full Width) */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills Assessment</h3>
                    <CustomRadarChart 
                        data={radarChartData.map(item => ({
                            subject: item.skill,
                            level: item.level,
                            fullMark: 100
                        }))}
                        radars={[
                            {
                                name: 'Skill Level',
                                dataKey: 'level',
                                stroke: ANALYTICS_CONFIG.CHART_COLORS[4],
                                fill: ANALYTICS_CONFIG.CHART_COLORS[4]
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
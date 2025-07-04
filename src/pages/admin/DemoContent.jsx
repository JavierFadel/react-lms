import { useLayout } from "../../components/common/Layout";
import { BookOpen, BarChart3, Trophy, GraduationCap } from "lucide-react";

const DemoContent = () => {
    // const { activeRoute } = useLayout();

    // const getPageTitle = () => {
    //     switch (activeRoute) {
    //         case 'dashboard': return 'Analytics Dashboard';
    //         case 'quiz': return 'Quiz & Assessment';
    //         case 'forum': return 'Discussion Forum';
    //         case 'achievements': return 'Achievements & Progress';
    //         case 'instructor': return 'Instructor Dashboard';
    //         default: return 'Dashboard';
    //     }
    // };

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
                            <p className="text-2xl font-bold text-gray-900">4</p>
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
                            <p className="text-2xl font-bold text-gray-900">85%</p>
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
                            <p className="text-2xl font-bold text-gray-900">7 days</p>
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
                            <p className="text-2xl font-bold text-gray-900">1,250</p>
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Dashboard Content
                    </h3>
                    <p className="text-gray-600">
                        This is where the dashboard page content will be implemented.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        Current route: <code className="bg-gray-100 px-2 py-1 rounded">/dashboard</code>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DemoContent;
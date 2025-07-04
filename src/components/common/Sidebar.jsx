import { useLayout } from "./Layout";
import { BarChart3, BookOpen, MessageSquare, Trophy, GraduationCap, IterationCcw } from "lucide-react";
import { getTotalStudyTime, getCompletedModules, getStreakData } from "../../utils/dummyData";
import { formatDuration } from "../../utils/helpers";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const { sidebarOpen, setSidebarOpen, activeRoute, setActiveRoute } = useLayout();

    const menuItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <BarChart3 size={20} />,
            href: '/admin/dashboard',
            description: 'Analytics & Overview'
        },
        {
            id: 'quiz',
            label: 'Quiz & Assessment',
            icon: <BookOpen size={20} />,
            href: '/admin/quiz',
            description: 'Tests & Evaluations'
        },
        {
            id: 'forum',
            label: 'Discussion Forum',
            icon: <MessageSquare size={20} />,
            href: '/admin/forum',
            description: 'Community Discussion'
        },
        {
            id: 'achievements',
            label: 'Achievements',
            icon: <Trophy size={20} />,
            href: '/admin/pencapaian',
            description: 'Badges & Progress'
        },
        {
            id: 'instructor',
            label: 'Instructor Dashboard',
            icon: <GraduationCap size={20} />,
            href: '/admin/instruktur',
            description: 'Teaching Tools'
        }
    ];

    const handleMenuClick = (item) => {
        setActiveRoute(item.id);

        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }

    return (
        <>
            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)]
            `}>
                <div className="flex flex-col h-full">
                    {/* Navigation Menu */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                className={`
                                        w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors duration-200
                                        ${activeRoute === item.id
                                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }
                                    `}
                                key={item.label}
                                to={item.href}
                                onClick={() => handleMenuClick(item)}
                            >
                                <span className={`mr-3 ${activeRoute === item.id ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {item.icon}
                                </span>
                                <div className="flex-1">
                                    <div className="font-medium">{item.label}</div>
                                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                                </div>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Study Stats */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-2">Today's Progress</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Study Time</span>
                                    <span className="font-medium">{formatDuration(getTotalStudyTime())}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Modules</span>
                                    <span className="font-medium">{getCompletedModules().length} completed</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Streak</span>
                                    <span className="font-medium flex items-center">
                                        🔥 {getStreakData().current} days
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;
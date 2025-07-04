import { useLayout } from "./Layout";
import { useState } from "react";
import { Menu, GraduationCap, Search, Bell, ChevronDown, X } from "lucide-react";

const Navbar = () => {
    const { sidebarOpen, setSidebarOpen } = useLayout();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-3 fixed top-0 left-0 right-0 z-50">
            <div className="flex items-center justify-between">
                {/* Left section */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                    >
                        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <GraduationCap size={20} className="text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                            Belajar Pintar
                        </h1>
                    </div>
                </div>

                {/* Search bar */}
                <div className="hidden md:flex flex-1 max-w-lg mx-8">
                    <div className="relative w-full">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search modules, quizzes, discussions..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setNotificationsOpen(!notificationsOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 relative"
                        >
                            <Bell size={20} className="text-gray-600" />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {notificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                                        <p className="text-sm text-gray-800">New quiz available: React Hooks Advanced</p>
                                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                    </div>
                                    <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                                        <p className="text-sm text-gray-800">Achievement unlocked: Learning Streak!</p>
                                        <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                                    </div>
                                    <div className="p-4 hover:bg-gray-50">
                                        <p className="text-sm text-gray-800">New reply in "React State Management" discussion</p>
                                        <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                        >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">SU</span>
                            </div>
                            <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <p className="font-medium text-gray-900">Student User</p>
                                    <p className="text-sm text-gray-500">Level: Intermediate</p>
                                </div>
                                <div className="py-2">
                                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <User size={16} className="mr-3" />
                                        Profile
                                    </a>
                                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        <Settings size={16} className="mr-3" />
                                        Settings
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                        Logout
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
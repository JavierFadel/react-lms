import { useEffect, useState } from "react";
import { useLayout } from "../../components/common/Layout";
import { useAchievement } from "../../contexts/AchievementContext";
import { Trophy, Star, Clock, Target, Filter, Search } from "lucide-react";

const Pencapaian = () => {
    const { activeRoute, setActiveRoute } = useLayout();
    const { achievements, unlocked, loading, error } = useAchievement();
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setActiveRoute('pencapaian');
    }, [setActiveRoute]);

    // Filter achievements based on current filter and search term
    const filteredAchievements = achievements.filter(achievement => {
        const matchesFilter = filter === 'all' || 
            (filter === 'unlocked' && unlocked.includes(achievement.id)) ||
            (filter === 'locked' && !unlocked.includes(achievement.id)) ||
            (filter === achievement.category);
        
        const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    // Calculate stats
    const totalUnlocked = unlocked.length;
    const totalPoints = achievements
        .filter(a => unlocked.includes(a.id))
        .reduce((sum, a) => sum + a.points, 0);
    const completionRate = achievements.length > 0 ? Math.round((totalUnlocked / achievements.length) * 100) : 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">Error loading achievements: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Pencapaian</h1>
                <p className="text-gray-600 mt-2">
                    Track your learning milestones and celebrate your achievements
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Achievements Unlocked</p>
                            <p className="text-2xl font-bold text-gray-900">{totalUnlocked}/{achievements.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <Trophy className="text-yellow-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Points</p>
                            <p className="text-2xl font-bold text-gray-900">{totalPoints.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Star className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Completion Rate</p>
                            <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Target className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'all' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('unlocked')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'unlocked' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Unlocked
                        </button>
                        <button
                            onClick={() => setFilter('locked')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'locked' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Locked
                        </button>
                        <button
                            onClick={() => setFilter('milestone')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'milestone' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Milestones
                        </button>
                        <button
                            onClick={() => setFilter('performance')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'performance' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Performance
                        </button>
                        <button
                            onClick={() => setFilter('consistency')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'consistency' 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Consistency
                        </button>
                    </div>
                    
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search achievements..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => (
                    <AchievementCard 
                        key={achievement.id} 
                        achievement={achievement} 
                        isUnlocked={unlocked.includes(achievement.id)}
                    />
                ))}
            </div>

            {filteredAchievements.length === 0 && (
                <div className="text-center py-12">
                    <Trophy className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-600">No achievements found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

const AchievementCard = ({ achievement, isUnlocked }) => {
    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'common': return 'text-gray-600 bg-gray-100';
            case 'uncommon': return 'text-green-600 bg-green-100';
            case 'rare': return 'text-blue-600 bg-blue-100';
            case 'epic': return 'text-purple-600 bg-purple-100';
            case 'legendary': return 'text-yellow-600 bg-yellow-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'bronze': return 'from-yellow-600 to-yellow-800';
            case 'silver': return 'from-gray-400 to-gray-600';
            case 'gold': return 'from-yellow-400 to-yellow-600';
            default: return 'from-gray-400 to-gray-600';
        }
    };

    return (
        <div className={`bg-white rounded-lg border-2 p-6 transition-all duration-300 hover:shadow-lg ${
            isUnlocked ? 'border-green-200 bg-green-50' : 'border-gray-200'
        }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className={`text-3xl p-3 rounded-full bg-gradient-to-r ${getTypeColor(achievement.type)}`}>
                    {achievement.icon}
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                    </span>
                    {isUnlocked && (
                        <div className="flex items-center gap-1 text-green-600">
                            <Trophy size={16} />
                            <span className="text-xs font-medium">Unlocked</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <div>
                    <h3 className={`font-bold text-lg ${isUnlocked ? 'text-gray-900' : 'text-gray-600'}`}>
                        {achievement.title}
                    </h3>
                    <p className={`text-sm ${isUnlocked ? 'text-gray-700' : 'text-gray-500'}`}>
                        {achievement.description}
                    </p>
                </div>

                {/* Requirements */}
                <div className="text-xs text-gray-600">
                    <p className="font-medium">Requirements:</p>
                    <p>{achievement.requirements}</p>
                </div>

                {/* Progress Bar (if not unlocked) */}
                {!isUnlocked && achievement.progress !== undefined && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${achievement.progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Points and Date */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <div className="flex items-center gap-1">
                        <Star className="text-yellow-500" size={16} />
                        <span className="text-sm font-medium">{achievement.points} pts</span>
                    </div>
                    {isUnlocked && achievement.unlockedAt && (
                        <div className="flex items-center gap-1 text-gray-500">
                            <Clock size={14} />
                            <span className="text-xs">
                                {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pencapaian;
import { Award } from "lucide-react";

const UserInfo = ({ user }) => (
    <div className="flex items-center space-x-3">
        <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
        <div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</span>
            {user.badge && (
                <div className="flex items-center text-xs text-amber-600 dark:text-amber-400">
                    <Award className="h-4 w-4 mr-1" />
                    <span>{user.badge} ({user.points} pts)</span>
                </div>
            )}
        </div>
    </div>
);

export default UserInfo;
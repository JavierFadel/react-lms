// New Component: A card for the top-level stats
const StatCard = ({ title, value, icon: Icon, color, iconColor }) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
                <div className={`${iconColor}`}>
                    {Icon}
                </div>
            </div>
        </div>
    </div>
);

export default StatCard;
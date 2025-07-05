// Komponen Baru: Badge Reputasi User (UI Saja)
const ReputationBadge = ({ badge }) => (
    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${badge === 'platinum' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
        }`}>{badge}</span>
);

export default ReputationBadge;
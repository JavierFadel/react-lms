import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { Lock, Unlock } from 'lucide-react';

/**
 * Komponen BadgeCard untuk menampilkan kartu pencapaian.
 * Tampilannya akan berbeda untuk status terkunci dan terbuka.
 *
 * @param {object} props
 * @param {object} props.achievement - Objek data pencapaian.
 */
const BadgeCard = ({ achievement }) => {
    const {
        title,
        description,
        icon,
        points,
        progress,
        unlocked,
        badge,
    } = achievement;

    const isLocked = !unlocked;

    // Kelas dasar untuk kartu
    const cardBaseClass = 'border rounded-lg p-4 flex flex-col items-center text-center transition-all duration-300';

    // Kelas spesifik berdasarkan status terkunci/terbuka
    const cardStateClass = isLocked
        ? 'bg-gray-100 dark:bg-gray-800'
        : `bg-gradient-to-br ${badge.gradient} text-white shadow-lg transform hover:scale-105`;

    return (
        <div className={`${cardBaseClass} ${cardStateClass}`}>
            {/* Ikon Lencana */}
            <div className={`text-6xl mb-3 ${isLocked ? 'grayscale' : ''}`}>
                {icon}
            </div>

            {/* Judul */}
            <h3 className={`text-lg font-bold ${isLocked ? 'text-gray-700 dark:text-gray-300' : ''}`}>
                {title}
            </h3>

            {/* Deskripsi */}
            <p className={`text-sm mt-1 mb-3 ${isLocked ? 'text-gray-500 dark:text-gray-400' : 'opacity-90'}`}>
                {description}
            </p>

            {/* Bagian Bawah Kartu (berbeda untuk terkunci/terbuka) */}
            <div className="w-full mt-auto pt-3 border-t">
                {isLocked ? (
                    // Tampilan untuk pencapaian terkunci
                    <div>
                        <ProgressBar progress={progress} />
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs font-semibold text-gray-500">
                                {progress}% Selesai
                            </span>
                            <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                ) : (
                    // Tampilan untuk pencapaian terbuka
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-yellow-300">{points} Poin</span>
                        <Unlock className="w-4 h-4 text-white opacity-80" />
                    </div>
                )}
            </div>
        </div>
    );
};

BadgeCard.propTypes = {
    achievement: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        points: PropTypes.number.isRequired,
        progress: PropTypes.number.isRequired,
        unlocked: PropTypes.bool.isRequired,
        badge: PropTypes.shape({
            gradient: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default BadgeCard;
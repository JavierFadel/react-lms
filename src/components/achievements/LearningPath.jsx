import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

/**
 * Komponen LearningPath untuk memvisualisasikan alur belajar.
 *
 * @param {object} props
 * @param {Array<{id: string|number, title: string, description: string}>} props.path - Array objek yang merepresentasikan setiap langkah dalam alur.
 * @param {Array<string|number>} props.completedSteps - Array berisi ID dari langkah-langkah yang sudah selesai.
 */
const LearningPath = ({ path, completedSteps }) => {
    // Menemukan indeks dari langkah terakhir yang selesai
    const lastCompletedIndex = path.reduce((latest, step, index) => {
        return completedSteps.includes(step.id) ? index : latest;
    }, -1);

    return (
        <div className="space-y-8">
            {path.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id);
                // Langkah saat ini adalah langkah pertama setelah yang terakhir selesai
                const isCurrent = index === lastCompletedIndex + 1;

                let statusIcon;
                let statusColor;

                if (isCompleted) {
                    statusIcon = <CheckCircle className="w-8 h-8 text-green-500" />;
                    statusColor = 'text-green-500';
                } else if (isCurrent) {
                    statusIcon = <ArrowRight className="w-8 h-8 text-blue-500 animate-pulse" />;
                    statusColor = 'text-blue-500';
                } else {
                    statusIcon = <Circle className="w-8 h-8 text-gray-300" />;
                    statusColor = 'text-gray-400';
                }

                return (
                    <div key={step.id} className="flex items-center space-x-4">
                        {/* Ikon Status */}
                        <div className="flex-shrink-0">{statusIcon}</div>

                        {/* Garis Penghubung (Kecuali untuk item terakhir) */}
                        {index < path.length - 1 && (
                            <div className="absolute left-4 top-full w-0.5 h-8 bg-gray-300 transform -translate-x-1/2"></div>
                        )}

                        {/* Konten Teks */}
                        <div className={`flex-grow ${isCurrent ? 'font-bold' : ''}`}>
                            <h4 className={`text-lg ${isCurrent ? 'text-gray-800' : 'text-gray-600'}`}>
                                {step.title}
                            </h4>
                            <p className={`text-sm ${statusColor}`}>
                                {step.description}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

LearningPath.propTypes = {
    path: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    completedSteps: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

export default LearningPath;
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Komponen ProgressBar untuk menampilkan kemajuan dalam bentuk persentase.
 *
 * @param {object} props
 * @param {number} props.progress - Nilai kemajuan dari 0 hingga 100.
 * @param {string} [props.color='bg-blue-500'] - Kelas warna Tailwind untuk bar.
 */
const ProgressBar = ({ progress = 0 }) => {
    // Memastikan nilai progress tidak di bawah 0 atau di atas 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${clampedProgress}%` }}
                role="progressbar"
                aria-valuenow={clampedProgress}
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    );
};

ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
};

export default ProgressBar;
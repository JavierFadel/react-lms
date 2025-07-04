import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Clock } from 'lucide-react';

/**
 * Komponen TimerComponent untuk penghitung waktu mundur kuis.
 *
 * @param {object} props
 * @param {number} props.duration - Durasi total dalam detik.
 * @param {function} props.onTimeUp - Fungsi callback yang dipanggil saat waktu habis.
 */
const TimerComponent = ({ duration, onTimeUp }) => {
    const [secondsLeft, setSecondsLeft] = useState(duration);

    useEffect(() => {
        // Jangan mulai timer jika waktu sudah 0 atau kurang
        if (secondsLeft <= 0) {
            onTimeUp();
            return;
        }

        // Mengatur interval yang berjalan setiap detik
        const timerId = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Fungsi cleanup untuk membersihkan interval saat komponen unmount
        return () => clearInterval(timerId);
    }, [secondsLeft, onTimeUp]);

    // Format waktu menjadi MM:SS
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
        seconds
    ).padStart(2, '0')}`;

    // Mengubah warna menjadi merah jika waktu kurang dari 10 detik
    const timeColorClass = secondsLeft <= 10 ? 'text-red-500' : 'text-gray-700';

    return (
        <div
            className={`flex items-center space-x-2 font-mono text-lg font-semibold ${timeColorClass}`}
        >
            <Clock size={20} />
            <span>{formattedTime}</span>
        </div>
    );
};

TimerComponent.propTypes = {
    duration: PropTypes.number.isRequired,
    onTimeUp: PropTypes.func.isRequired,
};

export default TimerComponent;
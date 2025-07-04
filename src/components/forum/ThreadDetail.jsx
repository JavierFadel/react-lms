import React from 'react';
import PropTypes from 'prop-types';
import { Clock } from 'lucide-react';
import { formatRelativeTime } from '../../utils/dateUtils'; // Menggunakan helper lagi

/**
 * Komponen untuk menampilkan konten utama dari sebuah utas (thread).
 *
 * @param {object} props
 * @param {object} props.thread - Objek data dari utas yang akan ditampilkan.
 */
const ThreadDetail = ({ thread }) => {
    if (!thread) {
        // Tampilkan placeholder jika data belum tersedia
        return <div className="p-6 bg-white border-b animate-pulse"></div>;
    }

    const { title, content, author, avatar, createdAt } = thread;

    return (
        <div className="p-6 bg-white rounded-t-lg border-x border-t">
            {/* Judul Utas */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>

            {/* Informasi Penulis */}
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
                <img
                    src={avatar}
                    alt={`Avatar for ${author}`}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className="font-semibold text-gray-800">{author}</p>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1.5" />
                        <span>Diposting {formatRelativeTime(new Date(createdAt))}</span>
                    </div>
                </div>
            </div>

            {/* Konten Utas */}
            <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

ThreadDetail.propTypes = {
    thread: PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }),
};

export default ThreadDetail;
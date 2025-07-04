import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MessageSquare, Clock } from 'lucide-react';
import { formatRelativeTime } from '../../utils/dateUtils'; // Menggunakan helper untuk format tanggal

/**
 * Komponen untuk menampilkan daftar utas forum.
 *
 * @param {object} props
 * @param {Array<object>} props.threads - Array objek utas untuk ditampilkan.
 * @param {boolean} [props.isLoading=false] - Status loading untuk menampilkan skeleton.
 */
const ThreadList = ({ threads, isLoading = false }) => {
    if (isLoading) {
        // Tampilkan skeleton loader saat data sedang dimuat
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 bg-white border rounded-lg animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (threads.length === 0) {
        return (
            <div className="text-center py-10 px-4 bg-white border rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Tidak Ada Utas Ditemukan</h3>
                <p className="text-gray-500 mt-2">Coba gunakan kata kunci atau filter yang berbeda.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {threads.map((thread) => (
                <Link
                    key={thread.id}
                    to={`/forum/thread/${thread.id}`}
                    className="block p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
                >
                    <div className="flex items-start space-x-4">
                        <img
                            src={thread.avatar}
                            alt={`Avatar for ${thread.author}`}
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg text-gray-800">{thread.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                                <span className="font-medium text-gray-700">{thread.author}</span>
                                <div className="flex items-center">
                                    <MessageSquare className="w-4 h-4 mr-1.5" />
                                    <span>{thread.replies} balasan</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1.5" />
                                    <span>{formatRelativeTime(new Date(thread.createdAt))}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

ThreadList.propTypes = {
    threads: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
            replies: PropTypes.number.isRequired,
            createdAt: PropTypes.string.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool,
};

export default ThreadList;
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { MessageSquare, Clock } from 'lucide-react';
// import { formatRelativeTime } from '../../utils/dateUtils'; // Menggunakan helper untuk format tanggal

// /**
//  * Komponen untuk menampilkan daftar utas forum.
//  *
//  * @param {object} props
//  * @param {Array<object>} props.threads - Array objek utas untuk ditampilkan.
//  * @param {boolean} [props.isLoading=false] - Status loading untuk menampilkan skeleton.
//  */
// const ThreadList = ({ threads, isLoading = false }) => {
//     if (isLoading) {
//         // Tampilkan skeleton loader saat data sedang dimuat
//         return (
//             <div className="space-y-4">
//                 {[...Array(3)].map((_, i) => (
//                     <div key={i} className="p-4 bg-white border rounded-lg animate-pulse">
//                         <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
//                         <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//                     </div>
//                 ))}
//             </div>
//         );
//     }

//     if (threads.length === 0) {
//         return (
//             <div className="text-center py-10 px-4 bg-white border rounded-lg">
//                 <h3 className="text-lg font-semibold text-gray-700">Tidak Ada Utas Ditemukan</h3>
//                 <p className="text-gray-500 mt-2">Coba gunakan kata kunci atau filter yang berbeda.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-4">
//             {threads.map((thread) => (
//                 <Link
//                     key={thread.id}
//                     to={`/forum/thread/${thread.id}`}
//                     className="block p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
//                 >
//                     <div className="flex items-start space-x-4">
//                         <img
//                             src={thread.avatar}
//                             alt={`Avatar for ${thread.author}`}
//                             className="w-10 h-10 rounded-full"
//                         />
//                         <div className="flex-grow">
//                             <h3 className="font-semibold text-lg text-gray-800">{thread.title}</h3>
//                             <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
//                                 <span className="font-medium text-gray-700">{thread.author.name}</span>
//                                 <div className="flex items-center">
//                                     <MessageSquare className="w-4 h-4 mr-1.5" />
//                                     <span>{thread.replies} balasan</span>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <Clock className="w-4 h-4 mr-1.5" />
//                                     <span>{formatRelativeTime(new Date(thread.createdAt))}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Link>
//             ))}
//         </div>
//     );
// };

// ThreadList.propTypes = {
//     threads: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//             title: PropTypes.string.isRequired,
//             author: PropTypes.string.isRequired,
//             avatar: PropTypes.string.isRequired,
//             replies: PropTypes.number.isRequired,
//             createdAt: PropTypes.string.isRequired,
//         })
//     ).isRequired,
//     isLoading: PropTypes.bool,
// };

// export default ThreadList;


import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
    MessageSquare,
    Clock,
    Pin,
    CheckCircle,
    Eye,
    ThumbsUp,
    User,
    Tag
} from 'lucide-react';
import { formatRelativeTime } from '../../utils/dateUtils';

/**
 * Enhanced ThreadList component with more features and better design
 */
const ThreadList = ({ threads, onSelectThread, isLoading = false, categories = [] }) => {
    if (isLoading) {
        return (
            <div className="divide-y divide-gray-200">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-6 animate-pulse">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                <div className="flex space-x-4">
                                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (threads.length === 0) {
        return (
            <div className="text-center py-12 px-4">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Tidak Ada Utas Ditemukan</h3>
                <p className="text-gray-500">Coba gunakan kata kunci atau filter yang berbeda.</p>
            </div>
        );
    }

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'Umum';
    };

    const getCategoryColor = (categoryId) => {
        const colors = [
            'bg-blue-100 text-blue-800',
            'bg-green-100 text-green-800',
            'bg-purple-100 text-purple-800',
            'bg-orange-100 text-orange-800',
            'bg-pink-100 text-pink-800',
            'bg-indigo-100 text-indigo-800',
        ];
        return colors[categoryId % colors.length] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-4">
            {threads.length > 0 ? threads.map(thread => (
                <div key={thread.id} onClick={() => onSelectThread(thread.id)}
                    className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer border-l-4 hover:border-indigo-500 flex flex-col gap-3"
                    style={{ borderColor: thread.isPinned ? '#6366F1' : (thread.isSolved ? '#22C55E' : 'transparent') }}
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1 pr-4">{thread.title}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                            {thread.isSolved && <CheckSquare className="h-5 w-5 text-green-500" title="Terpecahkan" />}
                            {thread.isPinned && <Pin className="h-5 w-5 text-indigo-500" title="Dipin" />}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {thread.tags.map(tag => <span key={tag} className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{tag}</span>)}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <div className="flex items-center space-x-2">
                            <img src={thread.author.avatar} alt={thread.author.name} className="h-6 w-6 rounded-full" />
                            <span>{thread.author.name} &bull; {formatDate(thread.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center"><ThumbsUp className="h-4 w-4 mr-1" /> {thread.upvotes}</span>
                            <span className="flex items-center"><MessageSquare className="h-4 w-4 mr-1" /> {thread.replyCount}</span>
                        </div>
                    </div>
                </div>
            )) : <p className="text-center text-gray-500 dark:text-gray-400 py-10">Tidak ada diskusi yang cocok dengan filter Anda.</p>}
        </div>
        // <div className="divide-y divide-gray-200">
        //     {threads.map((thread) => (
        //         <div key={thread.id} className="p-6 hover:bg-gray-50 transition-colors">
        //             <div className="flex items-start space-x-4">
        //                 {/* Author Avatar */}
        //                 <div className="flex-shrink-0">
        //                     <img
        //                         src={thread.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(thread.author.name)}&background=random`}
        //                         alt={`Avatar for ${thread.author.name}`}
        //                         className="w-12 h-12 rounded-full object-cover"
        //                     />
        //                 </div>

        //                 {/* Thread Content */}
        //                 <div className="flex-1 min-w-0">
        //                     {/* Thread Title and Status */}
        //                     <div className="flex items-start justify-between mb-2">
        //                         <div className="flex-1">
        //                             <Link
        //                                 to={`/admin/forum/thread/${thread.id}`}
        //                                 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
        //                             >
        //                                 <div className="flex items-center gap-2">
        //                                     {thread.isPinned && (
        //                                         <Pin className="w-4 h-4 text-orange-500 flex-shrink-0" />
        //                                     )}
        //                                     {thread.isSolved && (
        //                                         <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
        //                                     )}
        //                                     <span className="truncate">{thread.title}</span>
        //                                 </div>
        //                             </Link>
        //                         </div>
        //                     </div>

        //                     {/* Thread Preview */}
        //                     <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        //                         {thread.preview || thread.content?.substring(0, 150) + '...'}
        //                     </p>

        //                     {/* Category Tag */}
        //                     {thread.categoryId && (
        //                         <div className="mb-3">
        //                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(thread.categoryId)}`}>
        //                                 <Tag className="w-3 h-3 mr-1" />
        //                                 {getCategoryName(thread.categoryId)}
        //                             </span>
        //                         </div>
        //                     )}

        //                     {/* Tags */}
        //                     {thread.tags && thread.tags.length > 0 && (
        //                         <div className="flex flex-wrap gap-1 mb-3">
        //                             {thread.tags.slice(0, 3).map((tag, index) => (
        //                                 <span
        //                                     key={index}
        //                                     className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
        //                                 >
        //                                     #{tag}
        //                                 </span>
        //                             ))}
        //                             {thread.tags.length > 3 && (
        //                                 <span className="text-xs text-gray-500">+{thread.tags.length - 3} more</span>
        //                             )}
        //                         </div>
        //                     )}

        //                     {/* Thread Stats */}
        //                     <div className="flex items-center justify-between">
        //                         <div className="flex items-center space-x-4 text-sm text-gray-500">
        //                             {/* Author */}
        //                             <div className="flex items-center">
        //                                 <User className="w-4 h-4 mr-1" />
        //                                 <span className="font-medium text-gray-700">{thread.author.name}</span>
        //                             </div>

        //                             {/* Reply Count */}
        //                             <div className="flex items-center">
        //                                 <MessageSquare className="w-4 h-4 mr-1" />
        //                                 <span>{thread.replies || 0} balasan</span>
        //                             </div>

        //                             {/* View Count */}
        //                             {thread.views && (
        //                                 <div className="flex items-center">
        //                                     <Eye className="w-4 h-4 mr-1" />
        //                                     <span>{thread.views} views</span>
        //                                 </div>
        //                             )}

        //                             {/* Likes */}
        //                             {thread.likes && (
        //                                 <div className="flex items-center">
        //                                     <ThumbsUp className="w-4 h-4 mr-1" />
        //                                     <span>{thread.likes}</span>
        //                                 </div>
        //                             )}
        //                         </div>

        //                         {/* Timestamp */}
        //                         <div className="flex items-center text-sm text-gray-500">
        //                             <Clock className="w-4 h-4 mr-1" />
        //                             <span>{formatRelativeTime(new Date(thread.createdAt))}</span>
        //                         </div>
        //                     </div>

        //                     {/* Last Reply Info */}
        //                     {thread.lastReply && (
        //                         <div className="mt-3 pt-3 border-t border-gray-100">
        //                             <div className="flex items-center justify-between text-sm">
        //                                 <div className="flex items-center space-x-2">
        //                                     <img
        //                                         src={thread.lastReply.author.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(thread.lastReply.author.name)}&background=random`}
        //                                         alt={`Avatar for ${thread.lastReply.author.name}`}
        //                                         className="w-6 h-6 rounded-full object-cover"
        //                                     />
        //                                     <span className="text-gray-600">
        //                                         Balasan terakhir oleh{' '}
        //                                         <span className="font-medium text-gray-900">{thread.lastReply.author.name}</span>
        //                                     </span>
        //                                 </div>
        //                                 <span className="text-gray-500">
        //                                     {formatRelativeTime(new Date(thread.lastReply.createdAt))}
        //                                 </span>
        //                             </div>
        //                         </div>
        //                     )}
        //                 </div>
        //             </div>
        //         </div>
        //     ))}
        // </div>
    );
};

// ThreadList.propTypes = {
//     threads: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//             title: PropTypes.string.isRequired,
//             content: PropTypes.string,
//             preview: PropTypes.string,
//             author: PropTypes.shape({
//                 id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//                 name: PropTypes.string.isRequired,
//                 avatar: PropTypes.string,
//             }).isRequired,
//             categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//             tags: PropTypes.arrayOf(PropTypes.string),
//             replies: PropTypes.number,
//             views: PropTypes.number,
//             likes: PropTypes.number,
//             isPinned: PropTypes.bool,
//             isSolved: PropTypes.bool,
//             createdAt: PropTypes.string.isRequired,
//             lastReply: PropTypes.shape({
//                 author: PropTypes.shape({
//                     name: PropTypes.string.isRequired,
//                     avatar: PropTypes.string,
//                 }).isRequired,
//                 createdAt: PropTypes.string.isRequired,
//             }),
//         })
//     ).isRequired,
//     isLoading: PropTypes.bool,
//     categories: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//             name: PropTypes.string.isRequired,
//         })
//     ),
// };

export default ThreadList;
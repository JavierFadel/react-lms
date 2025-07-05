// import React, { useState, useMemo } from 'react';
// import { useForum } from '../../hooks/useForum';
// import SearchFilter from '../../components/forum/SearchFilter';
// import ThreadList from '../../components/forum/ThreadList';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
// import { Button } from '../../components/common/Button';
// import { PlusCircle } from 'lucide-react';

// const Forum = () => {
//   const { categories, threads, isLoading, error } = useForum();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');

//   console.log(categories);

//   // Memoize hasil filter untuk performa yang lebih baik
//   const filteredThreads = useMemo(() => {
//     return threads
//       .filter((thread) => {
//         // Filter berdasarkan kategori
//         if (activeFilter !== 'all') {
//           return thread.categoryId === parseInt(activeFilter, 10);
//         }
//         return true;
//       })
//       .filter((thread) => {
//         // Filter berdasarkan kata kunci pencarian (tidak case-sensitive)
//         return thread.title.toLowerCase().includes(searchTerm.toLowerCase());
//       });
//   }, [threads, searchTerm, activeFilter]);

//   if (error) {
//     return <div className="text-center p-8 text-red-500">Gagal memuat data forum.</div>;
//   }

//   return (
//     <div className="p-4 md:p-6 lg:p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Forum Diskusi</h1>
//         <Button>
//           <PlusCircle className="w-4 h-4 mr-2" />
//           Buat Utas Baru
//         </Button>
//       </div>

//       <SearchFilter
//         categories={categories}
//         currentFilter={activeFilter}
//         onSearchChange={setSearchTerm}
//         onFilterChange={setActiveFilter}
//       />

//       <div className="mt-8">
//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <LoadingSpinner />
//           </div>
//         ) : (
//           <ThreadList threads={filteredThreads} />
//         )}
//       </div>
//     </div>
//   );
// }

// export default Forum;

// TODO: version 2
// import React, { useState, useMemo, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForum } from '../../hooks/useForum';
// import { useLayout } from '../../components/common/Layout';
// import SearchFilter from '../../components/forum/SearchFilter';
// import ThreadList from '../../components/forum/ThreadList';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
// import Modal from '../../components/common/Modal';
// import { Button } from '../../components/common/Button';
// import { Input } from '../../components/common/Input';
// import {
//     PlusCircle,
//     MessageSquare,
//     Users,
//     TrendingUp,
//     Pin,
//     CheckCircle,
//     AlertCircle
// } from 'lucide-react';

// const Forum = () => {
//     const navigate = useNavigate();
//     const { setActiveRoute } = useLayout();
//     const { categories, threads, isLoading, error, createThread, isSubmitting } = useForum();

//     // Search and Filter State
//     const [searchTerm, setSearchTerm] = useState('');
//     const [activeFilter, setActiveFilter] = useState('all');
//     const [sortBy, setSortBy] = useState('newest');

//     // Modal State
//     const [showCreateModal, setShowCreateModal] = useState(false);
//     const [newThreadForm, setNewThreadForm] = useState({
//         title: '',
//         content: '',
//         category: '',
//         tags: []
//     });

//     // Set active route
//     useEffect(() => {
//         setActiveRoute('forum');
//     }, [setActiveRoute]);

//     // Memoized filtered and sorted threads
//     const filteredAndSortedThreads = useMemo(() => {
//         let result = threads.filter((thread) => {
//             // Filter by category
//             if (activeFilter !== 'all') {
//                 return thread.categoryId === parseInt(activeFilter, 10);
//             }
//             return true;
//         }).filter((thread) => {
//             // Filter by search term
//             return thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 thread.content.toLowerCase().includes(searchTerm.toLowerCase());
//         });

//         // Sort threads
//         switch (sortBy) {
//             case 'newest':
//                 result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//                 break;
//             case 'oldest':
//                 result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//                 break;
//             case 'mostReplies':
//                 result.sort((a, b) => b.replies - a.replies);
//                 break;
//             case 'leastReplies':
//                 result.sort((a, b) => a.replies - b.replies);
//                 break;
//             default:
//                 break;
//         }

//         // Pin threads should always be at the top
//         const pinned = result.filter(thread => thread.isPinned);
//         const regular = result.filter(thread => !thread.isPinned);

//         return [...pinned, ...regular];
//     }, [threads, searchTerm, activeFilter, sortBy]);

//     // Calculate forum stats
//     const forumStats = useMemo(() => {
//         const totalThreads = threads.length;
//         const totalReplies = threads.reduce((sum, thread) => sum + thread.replies, 0);
//         const activeUsers = new Set(threads.map(thread => thread.author.id)).size;
//         const recentThreads = threads.filter(thread => {
//             const threadDate = new Date(thread.createdAt);
//             const dayAgo = new Date();
//             dayAgo.setDate(dayAgo.getDate() - 1);
//             return threadDate > dayAgo;
//         }).length;

//         return {
//             totalThreads,
//             totalReplies,
//             activeUsers,
//             recentThreads
//         };
//     }, [threads]);

//     // Handle create thread
//     const handleCreateThread = async (e) => {
//         e.preventDefault();
//         if (!newThreadForm.title.trim() || !newThreadForm.content.trim() || !newThreadForm.category) {
//             return;
//         }

//         try {
//             await createThread(newThreadForm);
//             setShowCreateModal(false);
//             setNewThreadForm({
//                 title: '',
//                 content: '',
//                 category: '',
//                 tags: []
//             });
//         } catch (error) {
//             console.error('Error creating thread:', error);
//         }
//     };

//     // Handle form input changes
//     const handleFormChange = (field, value) => {
//         setNewThreadForm(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     if (error) {
//         return (
//             <div className="p-6">
//                 <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//                     <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//                     <h2 className="text-xl font-semibold text-red-800 mb-2">Gagal Memuat Forum</h2>
//                     <p className="text-red-600 mb-4">Terjadi kesalahan saat memuat data forum. Silakan coba lagi.</p>
//                     <Button onClick={() => window.location.reload()} variant="outline">
//                         Muat Ulang
//                     </Button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-900">Forum Diskusi</h1>
//                     <p className="text-gray-600 mt-1">Berpartisipasi dalam diskusi pembelajaran</p>
//                 </div>
//                 <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
//                     <PlusCircle className="w-4 h-4" />
//                     Buat Utas Baru
//                 </Button>
//             </div>

//             {/* Forum Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-500">Total Utas</p>
//                             <p className="text-2xl font-bold text-gray-900">{forumStats.totalThreads}</p>
//                         </div>
//                         <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                             <MessageSquare className="w-5 h-5 text-blue-600" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-500">Total Balasan</p>
//                             <p className="text-2xl font-bold text-gray-900">{forumStats.totalReplies}</p>
//                         </div>
//                         <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                             <MessageSquare className="w-5 h-5 text-green-600" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-500">Pengguna Aktif</p>
//                             <p className="text-2xl font-bold text-gray-900">{forumStats.activeUsers}</p>
//                         </div>
//                         <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                             <Users className="w-5 h-5 text-purple-600" />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm text-gray-500">Utas Baru (24j)</p>
//                             <p className="text-2xl font-bold text-gray-900">{forumStats.recentThreads}</p>
//                         </div>
//                         <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//                             <TrendingUp className="w-5 h-5 text-orange-600" />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Search and Filter */}
//             <div className="mb-6">
//                 <SearchFilter
//                     categories={categories}
//                     currentFilter={activeFilter}
//                     onSearchChange={setSearchTerm}
//                     onFilterChange={setActiveFilter}
//                 />
//             </div>

//             {/* Sort Options */}
//             <div className="flex flex-wrap gap-4 mb-6">
//                 <div className="flex items-center gap-2">
//                     <label className="text-sm font-medium text-gray-700">Urutkan:</label>
//                     <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="newest">Terbaru</option>
//                         <option value="oldest">Terlama</option>
//                         <option value="mostReplies">Paling Banyak Balasan</option>
//                         <option value="leastReplies">Paling Sedikit Balasan</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Thread List */}
//             <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//                 {isLoading ? (
//                     <div className="flex justify-center items-center py-12">
//                         <LoadingSpinner />
//                     </div>
//                 ) : filteredAndSortedThreads.length === 0 ? (
//                     <div className="text-center py-12 px-4">
//                         <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold text-gray-700 mb-2">Tidak Ada Utas Ditemukan</h3>
//                         <p className="text-gray-500 mb-4">
//                             {searchTerm || activeFilter !== 'all'
//                                 ? 'Coba gunakan kata kunci atau filter yang berbeda.'
//                                 : 'Belum ada utas diskusi. Mulai diskusi pertama!'}
//                         </p>
//                         <Button onClick={() => setShowCreateModal(true)} variant="outline">
//                             Buat Utas Pertama
//                         </Button>
//                     </div>
//                 ) : (
//                     <ThreadList threads={filteredAndSortedThreads} />
//                 )}
//             </div>

//             {/* Create Thread Modal */}
//             <Modal
//                 isOpen={showCreateModal}
//                 onClose={() => setShowCreateModal(false)}
//                 title="Buat Utas Baru"
//                 maxWidth="2xl"
//             >
//                 <form onSubmit={handleCreateThread} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Judul Utas *
//                         </label>
//                         <Input
//                             type="text"
//                             placeholder="Masukkan judul utas..."
//                             value={newThreadForm.title}
//                             onChange={(e) => handleFormChange('title', e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Kategori *
//                         </label>
//                         <select
//                             value={newThreadForm.category}
//                             onChange={(e) => handleFormChange('category', e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         >
//                             <option value="">Pilih kategori...</option>
//                             {categories.map((category) => (
//                                 <option key={category.id} value={category.id}>
//                                     {category.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Konten *
//                         </label>
//                         <textarea
//                             placeholder="Tulis konten utas Anda..."
//                             value={newThreadForm.content}
//                             onChange={(e) => handleFormChange('content', e.target.value)}
//                             rows={6}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>

//                     <div className="flex justify-end gap-3 pt-4">
//                         <Button
//                             type="button"
//                             variant="outline"
//                             onClick={() => setShowCreateModal(false)}
//                             disabled={isSubmitting}
//                         >
//                             Batal
//                         </Button>
//                         <Button
//                             type="submit"
//                             disabled={isSubmitting || !newThreadForm.title.trim() || !newThreadForm.content.trim() || !newThreadForm.category}
//                         >
//                             {isSubmitting ? 'Membuat...' : 'Buat Utas'}
//                         </Button>
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     );
// };

// export default Forum;

// import { useForumThreads } from '../../hooks/useForum';
// import LoadingSpinner from '../../components/common/LoadingSpinner';
// import { MessageSquare, Eye, Clock, User } from 'lucide-react';

// // A component to display a single item in the thread list
// const ThreadListItem = ({ thread }) => {
//   return (
//     <div className="card hover:shadow-lg hover:border-primary-500/50 transition-all duration-300 p-4 flex flex-col sm:flex-row justify-between items-start">
//       <div className="flex-grow">
//         <h3 className="text-lg font-semibold text-primary-700 hover:underline cursor-pointer">
//           {thread.title}
//         </h3>
//         <div className="flex items-center text-sm text-gray-500 mt-2">
//           <User className="w-4 h-4 mr-1.5" />
//           <span>{thread.author.name}</span>
//           <span className="mx-2">•</span>
//           <Clock className="w-4 h-4 mr-1.5" />
//           <span>Last reply {thread.lastReply}</span>
//         </div>
//       </div>
//       <div className="flex-shrink-0 flex items-center space-x-4 mt-3 sm:mt-0 sm:ml-6 text-sm text-gray-600">
//         <div className="flex items-center" title="Replies">
//           <MessageSquare className="w-4 h-4 mr-1.5" />
//           <span>{thread.replies}</span>
//         </div>
//         <div className="flex items-center" title="Views">
//           <Eye className="w-4 h-4 mr-1.5" />
//           <span>{thread.views}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useForumThreads } from '../../hooks/useForum';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
    MessageSquare, Eye, Pin, Search, ChevronDown,
    User, Tag, Clock, ThumbsUp, FileText, BookOpen, Link,
    CheckCircle, MoreVertical, ArrowUp, ArrowDown, Star
} from 'lucide-react';

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

// Komponen Baru: Voting (UI Saja)
const Voting = ({ votes }) => (
    <div className="flex flex-col items-center justify-center px-4">
        <button className="text-gray-400 hover:text-green-500"><ArrowUp className="w-6 h-6" /></button>
        <span className="text-lg font-bold text-gray-700 my-1">{votes}</span>
        <button className="text-gray-400 hover:text-red-500"><ArrowDown className="w-6 h-6" /></button>
    </div>
);

// Komponen Baru: Badge Reputasi User (UI Saja)
const ReputationBadge = ({ badge }) => (
    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${badge === 'platinum' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'
        }`}>{badge}</span>
);

// New Component: The interactive toolbar with search and filters
const ForumToolbar = () => (
    <div className="bg-white border rounded-md border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                placeholder="Search for threads..."
                className="input-field pl-10"
            />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-shrink-0 w-1/2 md:w-48">
                <select className="input-field appearance-none">
                    <option>All Categories</option>
                    <option>React</option>
                    <option>Security</option>
                    <option>Showcase</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative flex-shrink-0 w-1/2 md:w-48">
                <select className="input-field appearance-none">
                    <option>Sort by: Last Reply</option>
                    <option>Sort by: Newest</option>
                    <option>Sort by: Most Views</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
        </div>
    </div>
);

// Revamped Component: A detailed list item for each thread
const ThreadListItem = ({ thread }) => (
    <div className="card py-4 px-6 flex gap-4 items-center hover:shadow-lg hover:border-primary-500/50 transition-all duration-300">
        <Voting votes={thread.votes} />
        <div className="flex-grow">
            <div className="flex items-center gap-2">
                {thread.isPinned && <Pin className="w-4 h-4 text-primary-600" title="Pinned Thread" />}
                <h3 className="text-lg font-semibold text-gray-800 hover:text-primary-700 cursor-pointer">
                    {thread.title}
                </h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">{thread.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-3">
                {thread.tags.map(tag => (
                    <span key={tag} className="bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                        <Tag className="w-3 h-3 mr-1" /> {tag}
                    </span>
                ))}
            </div>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mt-4 gap-x-4 gap-y-2">
                <div className="flex items-center">
                    <img src={thread.author.avatar} alt={thread.author.name} className="w-6 h-6 rounded-full hidden sm:block mr-4" />
                    {thread.author.name}
                </div>
                <div className="flex items-center"><ReputationBadge badge={thread.author.badge} /></div>
                <div className="flex items-center"><Star className="w-4 h-4 mr-1.5" />{thread.author.reputation} points</div>
                <div className="flex items-center"><MessageSquare className="w-4 h-4 mr-1.5" />{thread.replies} Replies</div>
                <div className="flex items-center"><Eye className="w-4 h-4 mr-1.5" />{thread.views} Views</div>
                <div className="flex items-center"><Clock className="w-4 h-4 mr-1.5" />{new Date(thread.createdAt).toLocaleDateString()}</div>
            </div>
        </div>
        <MoreVertical className='items-start hover:cursor-pointer hover:bg-gray-100 hover:rounded-full' />
    </div>
);

// The main Forum Page, assembled from our new components
const ForumPage = () => {
    const { data: threads, isLoading, error } = useForumThreads();

    if (isLoading) {
        return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>;
}

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    // Dummy stats - you can calculate these from the data later
    const stats = {
        totalThreads: threads?.length || 0,
        totalReplies: threads?.reduce((acc, t) => acc + t.replies, 0) || 0,
        activeUsers: 12, // Dummy
        newThreads: 2 // Dummy
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Forum Discussions</h1>
                <p className="text-gray-600 mt-2">
                    Track your learning milestones and celebrate your achievements
                </p>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Threads" value={stats.totalThreads} icon={<Link />} color="bg-green-100" iconColor="text-green-600" />
                    <StatCard title="Total Replies" value={stats.totalReplies} icon={<MessageSquare />} color="bg-blue-100" iconColor="text-blue-600" />
                    <StatCard title="Active Users" value={stats.activeUsers} icon={<User />} color="bg-orange-100" iconColor="text-orange-600" />
                    <StatCard title="Last 24 hours" value={stats.newThreads} icon={<Clock />} color="bg-purple-100" iconColor="text-purple-600" />
                </div>

                <ForumToolbar />

                <div className="space-y-4">
                    {threads?.map(thread => (
                        <ThreadListItem key={thread.id} thread={thread} />
                    ))}
                </div>
            </div>
        </div>

    );

    // const { data: threads, isLoading, error } = useForumThreads();
    //     if (isLoading) return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>;
    //     if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    //     return (
    //         <div className="space-y-6">
    //         <div className="flex justify-between items-center">
    //             <h1 className="text-3xl font-bold">Forum Diskusi</h1>
    //             <button className="btn-primary flex items-center">
    //             <MessageSquare className="w-4 h-4 mr-2"/>
    //             Mulai Thread Baru
    //             </button>
    //         </div>
    //         <ForumToolbar />
    //         <div className="space-y-4">
    //             {threads?.map(thread => <ThreadListItem key={thread.id} thread={thread} />)}
    //         </div>
    //         </div>
    //     );
};

export default ForumPage;
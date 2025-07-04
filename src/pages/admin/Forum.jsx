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

import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForum } from '../../hooks/useForum';
import { useLayout } from '../../components/common/Layout';
import SearchFilter from '../../components/forum/SearchFilter';
import ThreadList from '../../components/forum/ThreadList';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import {
    PlusCircle,
    MessageSquare,
    Users,
    TrendingUp,
    Pin,
    CheckCircle,
    AlertCircle
} from 'lucide-react';

const Forum = () => {
    const navigate = useNavigate();
    const { setActiveRoute } = useLayout();
    const { categories, threads, isLoading, error, createThread, isSubmitting } = useForum();

    // Search and Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Modal State
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newThreadForm, setNewThreadForm] = useState({
        title: '',
        content: '',
        category: '',
        tags: []
    });

    // Set active route
    useEffect(() => {
        setActiveRoute('forum');
    }, [setActiveRoute]);

    // Memoized filtered and sorted threads
    const filteredAndSortedThreads = useMemo(() => {
        let result = threads.filter((thread) => {
            // Filter by category
            if (activeFilter !== 'all') {
                return thread.categoryId === parseInt(activeFilter, 10);
            }
            return true;
        }).filter((thread) => {
            // Filter by search term
            return thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                thread.content.toLowerCase().includes(searchTerm.toLowerCase());
        });

        // Sort threads
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'mostReplies':
                result.sort((a, b) => b.replies - a.replies);
                break;
            case 'leastReplies':
                result.sort((a, b) => a.replies - b.replies);
                break;
            default:
                break;
        }

        // Pin threads should always be at the top
        const pinned = result.filter(thread => thread.isPinned);
        const regular = result.filter(thread => !thread.isPinned);

        return [...pinned, ...regular];
    }, [threads, searchTerm, activeFilter, sortBy]);

    // Calculate forum stats
    const forumStats = useMemo(() => {
        const totalThreads = threads.length;
        const totalReplies = threads.reduce((sum, thread) => sum + thread.replies, 0);
        const activeUsers = new Set(threads.map(thread => thread.author.id)).size;
        const recentThreads = threads.filter(thread => {
            const threadDate = new Date(thread.createdAt);
            const dayAgo = new Date();
            dayAgo.setDate(dayAgo.getDate() - 1);
            return threadDate > dayAgo;
        }).length;

        return {
            totalThreads,
            totalReplies,
            activeUsers,
            recentThreads
        };
    }, [threads]);

    // Handle create thread
    const handleCreateThread = async (e) => {
        e.preventDefault();
        if (!newThreadForm.title.trim() || !newThreadForm.content.trim() || !newThreadForm.category) {
            return;
        }

        try {
            await createThread(newThreadForm);
            setShowCreateModal(false);
            setNewThreadForm({
                title: '',
                content: '',
                category: '',
                tags: []
            });
        } catch (error) {
            console.error('Error creating thread:', error);
        }
    };

    // Handle form input changes
    const handleFormChange = (field, value) => {
        setNewThreadForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-red-800 mb-2">Gagal Memuat Forum</h2>
                    <p className="text-red-600 mb-4">Terjadi kesalahan saat memuat data forum. Silakan coba lagi.</p>
                    <Button onClick={() => window.location.reload()} variant="outline">
                        Muat Ulang
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Forum Diskusi</h1>
                    <p className="text-gray-600 mt-1">Berpartisipasi dalam diskusi pembelajaran</p>
                </div>
                <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Buat Utas Baru
                </Button>
            </div>

            {/* Forum Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Utas</p>
                            <p className="text-2xl font-bold text-gray-900">{forumStats.totalThreads}</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Balasan</p>
                            <p className="text-2xl font-bold text-gray-900">{forumStats.totalReplies}</p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Pengguna Aktif</p>
                            <p className="text-2xl font-bold text-gray-900">{forumStats.activeUsers}</p>
                        </div>
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Utas Baru (24j)</p>
                            <p className="text-2xl font-bold text-gray-900">{forumStats.recentThreads}</p>
                        </div>
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="mb-6">
                <SearchFilter
                    categories={categories}
                    currentFilter={activeFilter}
                    onSearchChange={setSearchTerm}
                    onFilterChange={setActiveFilter}
                />
            </div>

            {/* Sort Options */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Urutkan:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newest">Terbaru</option>
                        <option value="oldest">Terlama</option>
                        <option value="mostReplies">Paling Banyak Balasan</option>
                        <option value="leastReplies">Paling Sedikit Balasan</option>
                    </select>
                </div>
            </div>

            {/* Thread List */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                        <LoadingSpinner />
                    </div>
                ) : filteredAndSortedThreads.length === 0 ? (
                    <div className="text-center py-12 px-4">
                        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Tidak Ada Utas Ditemukan</h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm || activeFilter !== 'all'
                                ? 'Coba gunakan kata kunci atau filter yang berbeda.'
                                : 'Belum ada utas diskusi. Mulai diskusi pertama!'}
                        </p>
                        <Button onClick={() => setShowCreateModal(true)} variant="outline">
                            Buat Utas Pertama
                        </Button>
                    </div>
                ) : (
                    <ThreadList threads={filteredAndSortedThreads} />
                )}
            </div>

            {/* Create Thread Modal */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Buat Utas Baru"
                maxWidth="2xl"
            >
                <form onSubmit={handleCreateThread} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Judul Utas *
                        </label>
                        <Input
                            type="text"
                            placeholder="Masukkan judul utas..."
                            value={newThreadForm.title}
                            onChange={(e) => handleFormChange('title', e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori *
                        </label>
                        <select
                            value={newThreadForm.category}
                            onChange={(e) => handleFormChange('category', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Pilih kategori...</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Konten *
                        </label>
                        <textarea
                            placeholder="Tulis konten utas Anda..."
                            value={newThreadForm.content}
                            onChange={(e) => handleFormChange('content', e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowCreateModal(false)}
                            disabled={isSubmitting}
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting || !newThreadForm.title.trim() || !newThreadForm.content.trim() || !newThreadForm.category}
                        >
                            {isSubmitting ? 'Membuat...' : 'Buat Utas'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Forum;
import { useState, useMemo } from 'react';
import {
    useThreads,
    useCategories,
    useCreateThread,
    useSearchThreads,
} from '../../hooks/useForum';
import StatCard from '../../components/forum/StatCard';
import ForumToolbar from '../../components/forum/ForumToolbar';
import ThreadListItem from '../../components/forum/ThreadListItem';
import ThreadDetail from '../../components/forum/ThreadDetail';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Plus, Link, MessageSquare, User, Clock } from 'lucide-react';

const Forum = () => {
    // State for UI
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedThread, setSelectedThread] = useState(null);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [tag, setTag] = useState('');
    const [author, setAuthor] = useState('');
    const [date, setDate] = useState('');

    // Thread creation form
    const [newThread, setNewThread] = useState({
        title: '',
        content: '',
        categoryId: '',
        tags: '',
    });

    // Data hooks
    const { data: categories = [], isLoading: loadingCategories } = useCategories();
    const {
        data: threadsData,
        isLoading: loadingThreads,
        error,
    } = useThreads({
        sortBy,
        categoryId: category || undefined,
    });
    const threads = threadsData?.data || [];

    // Stats
    const stats = useMemo(() => ({
        totalThreads: threads.length,
        totalReplies: threads.reduce((acc, t) => acc + (t.replies || 0), 0),
        activeUsers: new Set(threads.map(t => t.author?.id)).size,
        newThreads: threads.filter(t => {
            const d = new Date(t.createdAt);
            const now = new Date();
            return (now - d) < 24 * 60 * 60 * 1000;
        }).length,
    }), [threads]);

    // Thread creation mutation
    const createThread = useCreateThread();

    // Filtered & searched threads
    const filteredThreads = useMemo(() => {
        let filtered = threads;
        if (search) {
            filtered = filtered.filter(
                t => t.title.toLowerCase().includes(search.toLowerCase()) ||
                    t.content?.toLowerCase().includes(search.toLowerCase()) ||
                    (t.tags || []).some(tagVal => tagVal.toLowerCase().includes(search.toLowerCase()))
            );
        }
        if (category) {
            filtered = filtered.filter(t => String(t.categoryId) === String(category));
        }
        if (tag) {
            filtered = filtered.filter(t => (t.tags || []).includes(tag));
        }
        if (author) {
            filtered = filtered.filter(t => t.author?.name?.toLowerCase().includes(author.toLowerCase()));
        }
        if (date) {
            filtered = filtered.filter(t => t.createdAt?.slice(0, 10) === date);
        }
        // Sort
        switch (sortBy) {
            case 'popular':
                filtered = [...filtered].sort((a, b) => (b.votes || 0) - (a.votes || 0));
                break;
            case 'solved':
                filtered = [...filtered].filter(t => t.isSolved);
                break;
            case 'newest':
                filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }
        // Pin always on top
        const pinned = filtered.filter(t => t.isPinned);
        const regular = filtered.filter(t => !t.isPinned);
        return [...pinned, ...regular];
    }, [threads, search, category, tag, author, date, sortBy]);

    // Handlers
    const handleCreateThread = async (e) => {
        e.preventDefault();
        if (!newThread.title.trim() || !newThread.content.trim() || !newThread.categoryId) return;
        await createThread.mutateAsync({
            ...newThread,
            tags: newThread.tags.split(',').map(t => t.trim()).filter(Boolean),
        });
        setShowCreateModal(false);
        setNewThread({ title: '', content: '', categoryId: '', tags: '' });
    };

    // UI
    if (loadingThreads || loadingCategories) {
        return <div className="flex justify-center items-center h-96"><LoadingSpinner /></div>;
    }
    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Forum Discussions</h1>
                    <p className="text-gray-600 mt-2">Ask, discuss, and help each other on any topic.</p>
                </div>
                {/* FIXME: hover not working */}
                <div className='hover:cursor-pointer'>
                    <Button onClick={() => setShowCreateModal(true)}>
                        <Plus className="inline mr-2" /> New Thread
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Threads" value={stats.totalThreads} icon={<Link />} color="bg-green-100" iconColor="text-green-600" />
                <StatCard title="Total Replies" value={stats.totalReplies} icon={<MessageSquare />} color="bg-blue-100" iconColor="text-blue-600" />
                <StatCard title="Active Users" value={stats.activeUsers} icon={<User />} color="bg-orange-100" iconColor="text-orange-600" />
                <StatCard title="Last 24 hours" value={stats.newThreads} icon={<Clock />} color="bg-purple-100" iconColor="text-purple-600" />
            </div>
            {/* Toolbar for search/filter/sort */}
            <div className="mb-6">
                <ForumToolbar
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    categories={categories}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    tag={tag}
                    setTag={setTag}
                    author={author}
                    setAuthor={setAuthor}
                    date={date}
                    setDate={setDate}
                />
            </div>
            {/* Main content: thread list or thread detail */}
            <div>
                {selectedThread ? (
                    <ThreadDetail
                        threadId={selectedThread}
                        onBack={() => setSelectedThread(null)}
                    />
                ) : (
                    <div className="space-y-4">
                        {filteredThreads.length === 0 ? (
                            <div className="text-center text-gray-500 py-12">No threads found.</div>
                        ) : (
                            filteredThreads.map(thread => (
                                <div key={thread.id} onClick={() => setSelectedThread(thread.id)} className="cursor-pointer">
                                    <ThreadListItem thread={thread} />
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            {/* Modal for creating a new thread */}
            <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Thread" maxWidth="2xl">
                <form onSubmit={handleCreateThread} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newThread.title}
                            onChange={e => setNewThread(nt => ({ ...nt, title: e.target.value }))}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                        <select
                            value={newThread.categoryId}
                            onChange={e => setNewThread(nt => ({ ...nt, categoryId: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select category...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newThread.tags}
                            onChange={e => setNewThread(nt => ({ ...nt, tags: e.target.value }))}
                            placeholder="e.g. react, hooks, state"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                        <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newThread.content}
                            onChange={e => setNewThread(nt => ({ ...nt, content: e.target.value }))}
                            rows={6}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={!newThread.title.trim() || !newThread.content.trim() || !newThread.categoryId}>
                            Create Thread
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Forum;
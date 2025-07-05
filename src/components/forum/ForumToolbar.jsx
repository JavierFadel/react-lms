import { Search, ChevronDown } from "lucide-react";

// Controlled Toolbar: search, category, sort
const ForumToolbar = ({
    search,
    setSearch,
    category,
    setCategory,
    categories = [],
    sortBy,
    setSortBy,
}) => (
    <div className="bg-white border rounded-md border-gray-200 p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                placeholder="Search for threads..."
                className="input-field pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-shrink-0 w-1/2 md:w-48">
                <select
                    className="input-field appearance-none"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative flex-shrink-0 w-1/2 md:w-48">
                <select
                    className="input-field appearance-none"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                >
                    <option value="newest">Sort by: Newest</option>
                    <option value="popular">Sort by: Most Votes</option>
                    <option value="solved">Sort by: Solved</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
        </div>
    </div>
);

export default ForumToolbar;
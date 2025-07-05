import { Search, ChevronDown } from "lucide-react";

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

export default ForumToolbar;
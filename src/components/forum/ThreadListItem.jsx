import Voting from "./Voting";
import ReputationBadge from "./ReputationBadge";

import { Tag, Star, MessageSquare, Eye, Clock, MoreVertical, Pin } from "lucide-react";

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

export default ThreadListItem;
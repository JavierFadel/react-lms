import { useState } from "react";

const Reply = ({ reply, onReply }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    // Simple mention styling
    const renderContent = (text) => {
        return text.split(/(@\w+)/g).map((part, i) =>
            part.startsWith('@') ? <strong key={i} className="text-indigo-500 font-semibold">{part}</strong> : part
        );
    };
    return (
        <div className="flex space-x-4">
            <img src={reply.author.avatar} alt={reply.author.name} className="h-10 w-10 rounded-full flex-shrink-0 mt-1" />
            <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{reply.author.name}</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(reply.createdAt)}</span>
                    </div>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">{renderContent(reply.content)}</p>
                </div>
                <div className="mt-1 flex items-center space-x-4 text-xs">
                    <button className="font-semibold text-gray-500 hover:text-indigo-600">Vote</button>
                    <button onClick={() => setShowReplyForm(!showReplyForm)} className="font-semibold text-gray-500 hover:text-indigo-600">Balas</button>
                </div>
                {showReplyForm && <ReplyForm parentId={reply.id} onSubmit={(data) => { onReply(data); setShowReplyForm(false); }} />}
                {reply.children && (
                    <div className="mt-4 space-y-4">
                        {reply.children.map(childReply => <Reply key={childReply.id} reply={childReply} onReply={onReply} />)}
                    </div>
                )}
            </div>
        </div>
    );
};
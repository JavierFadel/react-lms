import React from "react";
import { useCallback, useState, useEffect } from "react";
import { forumService } from "../../services/forumService";
import LoadingSpinner from "../common/LoadingSpinner";
import UserInfo from "../common/UserInfo";
import { ArrowLeft, CheckSquare, Pin, AlertTriangle } from "lucide-react";
import Reply from "../forum/Reply";
import ReplyForm from "../forum/ReplyForm";
// import { CheckSquare } from "lucide-react";

const ThreadDetail = ({ threadId, onBack }) => {
    const [thread, setThread] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchThread = useCallback(async () => {
        setIsLoading(true);
        const data = await forumService.getThreadById(threadId);
        setThread(data);
        setIsLoading(false);
    }, [threadId]);

    useEffect(() => { fetchThread(); }, [fetchThread]);

    const handleAddReply = async (replyData) => {
        await forumService.addReply(threadId, replyData);
        fetchThread(); // Refetch to get updated replies
    };

    // Logic to nest replies
    const nestedReplies = React.useMemo(() => {
        if (!thread?.replies) return [];
        const replyMap = {};
        const topLevelReplies = [];
        thread.replies.forEach(reply => {
            replyMap[reply.id] = { ...reply, children: [] };
        });
        thread.replies.forEach(reply => {
            if (reply.parentId && replyMap[reply.parentId]) {
                replyMap[reply.parentId].children.push(replyMap[reply.id]);
            } else {
                topLevelReplies.push(replyMap[reply.id]);
            }
        });
        return topLevelReplies;
    }, [thread]);

    if (isLoading || !thread) return <LoadingSpinner />;

    return (
        <div>
            <button onClick={onBack} className="flex items-center space-x-2 text-indigo-600 font-semibold mb-6 hover:underline hover:cursor-pointer"><ArrowLeft className="h-5 w-5" /><span>Kembali ke Forum</span></button>
            <div className="card bg-white p-6 rounded-lg">
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold text-gray-900">{thread.title}</h1>
                    {/* Moderation Tools (UI Only) */}
                    <div className="flex items-center space-x-2">
                        <button title="Tandai Terpecahkan" className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"><CheckSquare className="h-5 w-5 text-green-500" /></button>
                        <button title="Pin Thread" className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"><Pin className="h-5 w-5 text-indigo-500" /></button>
                        <button title="Laporkan" className="p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer"><AlertTriangle className="h-5 w-5 text-red-500" /></button>
                    </div>
                </div>
                <div className="mt-3"><UserInfo user={thread.author} /></div>
                <div className="mt-4 flex flex-wrap gap-2">{thread.tags.map(tag => <span key={tag} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{tag}</span>)}</div>
                <p className="mt-6 text-gray-700 leading-relaxed">{thread.content}</p>
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{thread.replies?.length || 0} Balasan</h2>
                <div className="space-y-5">{nestedReplies.map(reply => <Reply key={reply.id} reply={reply} onReply={handleAddReply} />)}</div>
                <ReplyForm onSubmit={handleAddReply} />
            </div>
        </div>
    );
};

export default ThreadDetail;
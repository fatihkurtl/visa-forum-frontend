"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/composables/date";
import { IReply } from "@/interfaces/thread";
import { FlagIcon, ReplyIcon, ThumbsUpIcon } from "lucide-react";


export default function ReplyArea({ reply, depth = 0, onReply, onLike, onReport }: { reply: IReply; depth?: number; onReply: (type: 'reply', id: number) => void; onLike: (id: number) => void; onReport: (type: 'reply', id: number) => void }) {
  const maxDepth = 5; // Maximum depth for nested replies

  return (
    <div className={`ml-${depth * 4} flex space-x-4 mt-4`}>
      <Avatar className="h-8 w-8">
        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-sm">{reply.author}</h5>
          <span className="text-xs text-gray-500">{timeAgo(reply.created_at)}</span>
        </div>
        <p className="text-sm text-gray-600">{reply.content}</p>
        <div className="flex items-center space-x-4 text-sm">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={() => onLike(reply.id)}>
            <ThumbsUpIcon className="h-3 w-3 mr-1" />
            Beğen ({reply.likes_count})
          </Button>
          {depth < maxDepth && (
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
              onClick={() => onReply('reply', reply.id)}
            >
              <ReplyIcon className="h-3 w-3 mr-1" />
              Yanıtla
            </Button>
          )}
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={() => onReport('reply', reply.id)}>
            <FlagIcon className="h-3 w-3 mr-1" />
            Raporla
          </Button>
        </div>
        {reply.children && reply.children.length > 0 && (
          <div className="space-y-4">
            {reply.children.map((nestedReply: IReply) => (
              <ReplyArea key={nestedReply.id} reply={nestedReply} depth={depth + 1} onReply={onReply} onLike={onLike} onReport={onReport} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
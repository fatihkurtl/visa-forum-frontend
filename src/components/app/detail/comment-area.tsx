"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FlagIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ReplyIcon,
} from "lucide-react";

export default function CommentArea() {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Emma S.",
      content: "Thanks for sharing this slot! I've been waiting for months.",
      timestamp: "2 hours ago",
      likes: 5,
      dislikes: 0,
    },
    {
      id: 2,
      user: "John D.",
      content:
        "Could you please provide more details about the embassy location?",
      timestamp: "1 hour ago",
      likes: 2,
      dislikes: 0,
    },
    {
      id: 3,
      user: "Sarah M.",
      content:
        "I had my interview last week. The process was smooth. Good luck to everyone!",
      timestamp: "30 minutes ago",
      likes: 8,
      dislikes: 1,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "You",
          content: newComment,
          timestamp: "Just now",
          likes: 0,
          dislikes: 0,
        },
      ]);
      setNewComment("");
    }
  };
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Comments ({comments.length})
      </h2>

      <Card className="mb-6">
        <CardContent>
          <form onSubmit={handleCommentSubmit} className="space-y-4">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full"
            />
            <Button type="submit">Post Comment</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={comment.user}
                  />
                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {comment.user}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-600">{comment.content}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <ThumbsUpIcon className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsDownIcon className="h-4 w-4 mr-1" />
                      {comment.dislikes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ReplyIcon className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FlagIcon className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

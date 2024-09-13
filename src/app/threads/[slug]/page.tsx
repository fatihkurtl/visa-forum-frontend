"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  UserIcon,
  FlagIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ReplyIcon,
} from "lucide-react";

export default function ThreadDetailPage() {
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
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                US B1/B2 Visa Slot Available
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Posted by Michael L. • 3 hours ago
              </p>
            </div>
            <Badge variant="secondary">Tourist Visa</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            I have a B1/B2 visa appointment slot available for July 15th, 2023
            at 10:30 AM at the US Embassy in London. Unfortunately, I can&apos;t make
            it and thought someone here might be able to use it. Please let me
            know if you&apos;re interested!
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              July 15, 2023
            </span>
            <span className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              120 views
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ThumbsUpIcon className="h-4 w-4 mr-1" />
              Helpful (23)
            </Button>
            <Button variant="outline" size="sm">
              <FlagIcon className="h-4 w-4 mr-1" />
              Report
            </Button>
          </div>
          <Button>
            <ReplyIcon className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </CardFooter>
      </Card>

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
    </div>
  );
}

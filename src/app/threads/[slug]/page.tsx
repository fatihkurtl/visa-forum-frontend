"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  UserIcon,
  FlagIcon,
  ThumbsUpIcon,
  ReplyIcon,
  SendIcon,
} from "lucide-react";

type Comment = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  time: string;
  replies: Comment[];
};

export default function ThreadDetailPage() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Jane Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "This is really helpful information! Do you know if there's a way to transfer visa appointment slots between applicants?",
      likes: 5,
      time: "2 hours ago",
      replies: [
        {
          id: 3,
          author: "Michael L.",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "Unfortunately, I don't think it's possible to transfer slots directly. The best option would be for me to cancel and for you to book immediately after.",
          likes: 2,
          time: "1 hour ago",
          replies: [],
        },
      ],
    },
    {
      id: 2,
      author: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "I've been trying to get a slot for weeks now. This is a great opportunity for someone who needs it urgently.",
      likes: 3,
      time: "1 hour ago",
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        likes: 0,
        time: "Just now",
        replies: [],
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const handleReply = (commentId: number) => {
    if (replyContent.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: comment.replies.length + 1,
                author: "You",
                avatar: "/placeholder.svg?height=40&width=40",
                content: replyContent,
                likes: 0,
                time: "Just now",
                replies: [],
              },
            ],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyingTo(null);
      setReplyContent('');
    }
  };

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="flex space-x-4 mb-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.avatar} alt={comment.author} />
        <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{comment.author}</h4>
          <span className="text-sm text-gray-500">{comment.time}</span>
        </div>
        <p className="text-sm text-gray-600">{comment.content}</p>
        <div className="flex items-center space-x-4 text-sm">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <ThumbsUpIcon className="h-4 w-4 mr-1" />
            Like ({comment.likes})
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
          >
            <ReplyIcon className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </div>
        {replyingTo === comment.id && (
          <div className="mt-2 flex space-x-2">
            <Textarea
              placeholder="Write your reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => handleReply(comment.id)}>
              <SendIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
        <div className="ml-8 mt-4 space-y-4">
          {comment.replies.map(reply => renderComment(reply))}
        </div>
      </div>
    </div>
  );

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
            at 10:30 AM at the US Embassy in London. Unfortunately, I can&apos;t
            make it and thought someone here might be able to use it. Please let
            me know if you&apos;re interested!
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
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {comments.map(comment => renderComment(comment))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 sticky bottom-4">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your Avatar" />
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <Textarea
                placeholder="Write your comment here..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleAddComment}>
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
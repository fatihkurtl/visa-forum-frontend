"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, UserIcon, FlagIcon, ThumbsUpIcon, ReplyIcon, SendIcon } from "lucide-react";
import { ThreadHelper } from "@/helpers/threads"
import api from "@/services/api"
import { IComment, IReply, IThread } from '@/interfaces/thread';
import { timeAgo } from '@/composables/date';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const threadHelper = new ThreadHelper(api);

export default function ThreadDetailPage({ searchParams }: { searchParams: any }) {
  const [error, setError] = useState<string | null>(null);
  const [thread, setThread] = useState<IThread | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ type: 'comment' | 'reply', id: number } | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const getThreadDetail = async () => {
      try {
        const response: IThread = await threadHelper.getThread(searchParams.id);
        console.log(response);
        if (!response) return;
        setThread(response);
      } catch (error) {
        console.log("Error: ", error);
        setError("Hata oluştu, Konu yüklenirken bir hata oluştu");
      }
    }

    getThreadDetail();
  }, [searchParams.id]);

  const handleAddComment = async () => {
    if (newComment.trim() && thread) {
      try {
        const newCommentData = await threadHelper.addComment(thread.id, newComment);
        setThread(prevThread => {
          if (!prevThread) return null;
          return {
            ...prevThread,
            comments: [...prevThread.comments, newCommentData]
          };
        });
        setNewComment('');
      } catch (error) {
        console.error("Error adding comment:", error);
        setError("Yorum eklenirken bir hata oluştu");
      }
    }
  };

  const handleReply = async () => {
    if (replyContent.trim() && thread && replyingTo) {
      try {
        let newReplyData: any;
        if (replyingTo.type === 'comment') {
          newReplyData = await threadHelper.addReply(replyingTo.id, replyContent);
          setThread(prevThread => {
            if (!prevThread) return null;
            return {
              ...prevThread,
              comments: prevThread.comments.map(comment => 
                comment.id === replyingTo.id 
                  ? { ...comment, replies: [...comment.replies, newReplyData] }
                  : comment
              )
            };
          });
        } else {
          newReplyData = await threadHelper.addReplyToReply(replyingTo.id, replyContent);
          setThread(prevThread => {
            if (!prevThread) return null;
            return {
              ...prevThread,
              comments: prevThread.comments.map(comment => ({
                ...comment,
                replies: comment.replies.map(reply => 
                  reply.id === replyingTo.id
                    ? { ...reply, replies: [...(reply.children || []), newReplyData] }
                    : reply
                )
              }))
            };
          });
        }
        setReplyingTo(null);
        setReplyContent('');
      } catch (error) {
        console.error("Error adding reply:", error);
        setError("Yanıt eklenirken bir hata oluştu");
      }
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  if (!thread) {
    return <div className="container mx-auto px-4 py-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {thread.title}
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
              &quot;{thread.author}&quot; tarafından oluşturuldu • {timeAgo(thread.created_at)}
              </p>
            </div>
            <Badge variant="secondary">{thread.category}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-gray-600 mb-4 ql-editor" dangerouslySetInnerHTML={{ __html: thread.content }} />
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {new Date(thread.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <UserIcon className="h-4 w-4 mr-1" />
              {thread.views} görüntülenme
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <ThumbsUpIcon className="h-4 w-4 mr-1" />
              Beğen ({thread.likes_count})
            </Button>
            <Button variant="outline" size="sm">
              <FlagIcon className="h-4 w-4 mr-1" />
              Raporla
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yorumlar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {thread.comments.map((comment: IComment) => (
            <div key={comment.id} className="space-y-4">
              <div className="flex space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{comment.author}</h4>
                    <span className="text-sm text-gray-500">{timeAgo(comment.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                      <ThumbsUpIcon className="h-4 w-4 mr-1" />
                      Beğen ({comment.likes_count})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setReplyingTo({ type: 'comment', id: comment.id })}
                    >
                      <ReplyIcon className="h-4 w-4 mr-1" />
                      Yanıtla ({comment.replies.length})
                    </Button>
                  </div>
                  {replyingTo?.type === 'comment' && replyingTo.id === comment.id && (
                    <div className="mt-2 flex space-x-2">
                      <Textarea
                        placeholder="Yanıtınızı yazın..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleReply}>
                        <SendIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              {comment.replies.map((reply: IReply) => (
                <div key={reply.id} className="ml-12 flex space-x-4 mt-4">
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
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <ThumbsUpIcon className="h-3 w-3 mr-1" />
                        Beğen ({reply.likes_count})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => setReplyingTo({ type: 'reply', id: reply.id })}
                      >
                        <ReplyIcon className="h-3 w-3 mr-1" />
                        Yanıtla
                      </Button>
                    </div>
                    {replyingTo?.type === 'reply' && replyingTo.id === reply.id && (
                      <div className="mt-2 flex space-x-2">
                        <Textarea
                          placeholder="Yanıtınızı yazın..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleReply}>
                          <SendIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {reply.children && reply.children.length > 0 && (
                      <div className="ml-8 space-y-4">
                        {reply.children.map((nestedReply: IReply) => (
                          <div key={nestedReply.id} className="flex space-x-4 mt-4">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{nestedReply.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h6 className="font-semibold text-sm">{nestedReply.author}</h6>
                                <span className="text-xs text-gray-500">{timeAgo(nestedReply.created_at)}</span>
                              </div>
                              <p className="text-sm text-gray-600">{nestedReply.content}</p>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                <ThumbsUpIcon className="h-3 w-3 mr-1" />
                                Beğen ({nestedReply.likes_count > 0 ? nestedReply.likes_count : 0})
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6 sticky bottom-4">
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback>YA</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex space-x-2">
              <Textarea
                placeholder="Yorumunuzu buraya yazın..."
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
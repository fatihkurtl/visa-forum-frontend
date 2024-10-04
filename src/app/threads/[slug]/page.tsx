"use client";
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CalendarIcon, UserIcon, FlagIcon, ThumbsUpIcon, ReplyIcon, SendIcon } from "lucide-react";
import { ThreadHelper } from "@/helpers/threads"
import api from "@/services/api"
import { IComment, IReply, IThread } from '@/interfaces/thread';
import { timeAgo } from '@/composables/date';
import 'react-quill/dist/quill.snow.css';
import ReactConfetti from 'react-confetti';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const threadHelper = new ThreadHelper(api);

const ReplyComponent = ({ reply, depth = 0, onReply, onLike, onReport }: { reply: IReply; depth?: number; onReply: (type: 'reply', id: number) => void; onLike: (id: number) => void; onReport: (type: 'reply', id: number) => void }) => {
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
              <ReplyComponent key={nestedReply.id} reply={nestedReply} depth={depth + 1} onReply={onReply} onLike={onLike} onReport={onReport} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ThreadDetailPage({ searchParams }: { searchParams: any }) {
  const [error, setError] = useState<string | null>(null);
  const [thread, setThread] = useState<IThread | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ type: 'comment' | 'reply', id: number } | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingItem, setReportingItem] = useState<{ type: 'thread' | 'comment' | 'reply', id: number } | null>(null);
  const [reportReasons, setReportReasons] = useState({
    spam: false,
    harassment: false,
    inappropriate: false,
    other: false,
  });
  const [reportExplanation, setReportExplanation] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

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
                replies: updateRepliesRecursively(comment.replies, replyingTo.id, newReplyData)
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

  const updateRepliesRecursively = (replies: IReply[], targetId: number, newReply: IReply): IReply[] => {
    return replies.map(reply => {
      if (reply.id === targetId) {
        return { ...reply, children: [...(reply.children || []), newReply] };
      }
      if (reply.children) {
        return { ...reply, children: updateRepliesRecursively(reply.children, targetId, newReply) };
      }
      return reply;
    });
  };

  const handleReportSubmit = async () => {
    if (reportingItem) {
      // Here you would typically send the report to your backend
      console.log('Report submitted:', { type: reportingItem.type, id: reportingItem.id, reasons: reportReasons, explanation: reportExplanation });
      // Reset the form and close the modal
      setReportReasons({ spam: false, harassment: false, inappropriate: false, other: false });
      setReportExplanation('');
      setIsReportModalOpen(false);
      setReportingItem(null);
    }
  };

  const handleThreadLike = async () => {
    if (thread) {
      try {
        // Here you would typically send the like to your backend
        // For now, we'll just update the local state
        setThread(prevThread => {
          if (!prevThread) return null;
          return {
            ...prevThread,
            likes_count: prevThread.likes_count + 1
          };
        });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
      } catch (error) {
        console.error("Error liking thread:", error);
        setError("Beğeni eklenirken bir hata oluştu");
      }
    }
  };

  const handleCommentLike = async (commentId: number) => {
    if (thread) {
      try {
        // Here you would typically send the like to your backend
        // For now, we'll just update the local state
        setThread(prevThread => {
          if (!prevThread) return null;
          return {
            ...prevThread,
            comments: prevThread.comments.map(comment => 
              comment.id === commentId 
                ? { ...comment, likes_count: comment.likes_count + 1 }
                : comment
            )
          };
        });
      } catch (error) {
        console.error("Error liking comment:", error);
        setError("Yorum beğenilirken bir hata oluştu");
      }
    }
  };

  const handleReplyLike = async (replyId: number) => {
    if (thread) {
      try {
        // Here you would typically send the like to your backend
        // For now, we'll just update the local state
        setThread(prevThread => {
          if (!prevThread) return null;
          return {
            ...prevThread,
            comments: prevThread.comments.map(comment => ({
              ...comment,
              replies: updateReplyLikesRecursively(comment.replies, replyId)
            }))
          };
        });
      } catch (error) {
        console.error("Error liking reply:", error);
        setError("Yanıt beğenilirken bir hata oluştu");
      }
    }
  };

  const updateReplyLikesRecursively = (replies: IReply[], targetId: number): IReply[] => {
    return replies.map(reply => {
      if (reply.id === targetId) {
        return { ...reply, likes_count: reply.likes_count + 1 };
      }
      if (reply.children) {
        return { ...reply, children: updateReplyLikesRecursively(reply.children, targetId) };
      }
      return reply;
    });
  };

  const handleReport = (type: 'thread' | 'comment' | 'reply', id: number) => {
    setReportingItem({ type, id });
    setIsReportModalOpen(true);
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  if (!thread) {
    return <div className="container mx-auto px-4 py-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && <ReactConfetti />}
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
            <Button variant="outline" size="sm" onClick={handleThreadLike}>
              <ThumbsUpIcon className="h-4 w-4 mr-1" />
              Beğen ({thread.likes_count})
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleReport('thread', thread.id)}>
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
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={() => handleCommentLike(comment.id)}>
                      <ThumbsUpIcon className="h-4 w-4 mr-1" />
                      Be�en ({comment.likes_count})
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
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={() => handleReport('comment', comment.id)}>
                      <FlagIcon className="h-4 w-4 mr-1" />
                      Raporla
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
              <div className="ml-14 space-y-4">
                {comment.replies.map((reply: IReply) => (
                  <ReplyComponent 
                    key={reply.id} 
                    reply={reply} 
                    onReply={setReplyingTo} 
                    onLike={handleReplyLike}
                    onReport={handleReport}
                  />
                ))}
              </div>
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

      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{reportingItem ? `${reportingItem.type.charAt(0).toUpperCase() + reportingItem.type.slice(1)}u Raporla` : 'Raporla'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Raporlama Nedeni</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="spam"
                    checked={reportReasons.spam}
                    onCheckedChange={(checked) => setReportReasons(prev => ({ ...prev, spam: checked as boolean }))}
                  />
                  <Label htmlFor="spam">Spam</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="harassment"
                    checked={reportReasons.harassment}
                    onCheckedChange={(checked) => setReportReasons(prev => ({ ...prev, harassment: checked as boolean }))}
                  />
                  <Label htmlFor="harassment">Taciz</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inappropriate"
                    checked={reportReasons.inappropriate}
                    onCheckedChange={(checked) => setReportReasons(prev => ({ ...prev, inappropriate: checked as boolean }))}
                  />
                  <Label htmlFor="inappropriate">Uygunsuz İçerik</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="other"
                    checked={reportReasons.other}
                    onCheckedChange={(checked) => setReportReasons(prev => ({ ...prev, other: checked as boolean }))}
                  />
                  <Label htmlFor="other">Diğer</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="explanation">Açıklama (İsteğe bağlı)</Label>
              <Textarea
                id="explanation"
                placeholder="Lütfen raporlama nedeninizi açıklayın..."
                value={reportExplanation}
                onChange={(e) => setReportExplanation(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>İptal</Button>
            <Button onClick={handleReportSubmit}>Raporla</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, UserIcon, FlagIcon, ThumbsUpIcon, ReplyIcon, SendIcon } from "lucide-react";
import { ThreadHelper } from "@/helpers/threads"
import { useToast } from "@/hooks/use-toast"
import api from "@/services/api"
import { IComment, ICreateComment, ICreateReply, IReply, IThread } from '@/interfaces/thread';
import { timeAgo } from '@/composables/date';
import 'react-quill/dist/quill.snow.css';
import ReactConfetti from 'react-confetti';
import ReportForm from '@/components/app/detail/ReportForm';
import ReplyArea from '@/components/app/detail/RepyArea';
import CommentForm from '@/components/app/detail/CommentForm';


const threadHelper = new ThreadHelper(api);


export default function ThreadDetailPage({ searchParams }: { searchParams: { id: string } }) {
  const { toast } = useToast()
  const [error, setError] = useState<string | null>(null);
  const [thread, setThread] = useState<IThread | null>(null);
  const [newComment, setNewComment] = useState<ICreateComment>({
    thread_id: thread?.id || '',
    content: '',
  });
  const [replyingTo, setReplyingTo] = useState<{ type: 'comment' | 'reply', id: number } | null>(null);
  const [replyContent, setReplyContent] = useState<ICreateReply>({
    type: replyingTo?.type || '',
    parent_id: replyingTo?.id || '',
    content: '',
  });
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

  const handleChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(prevComment => ({ ...prevComment, thread_id: thread?.id || '', content: event.target.value }));
  };

  const handleChangeReply = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(prevReply => ({ ...prevReply, parent_id: replyingTo?.id || '', content: event.target.value }));
  };

  const handleAddComment = async () => {
    if (newComment.content !== '' && thread) {
      try {
        const response = await threadHelper.addComment(newComment as ICreateComment);
        console.log(response);
        if (!response) return;
        if (!thread) return;
        if (response.status === 'success') {
          toast({
            title: 'Başarılı',
            description: response.message,
            variant: 'default',
          });
        }
        // setThread(prevThread => {
        //   if (!prevThread) return null;
        //   return {
        //     ...prevThread,
        //     comments: [...prevThread.comments, newCommentData]
        //   };
        // });
        console.log(response);
        setNewComment({ thread_id: thread.id, content: '' });
      } catch (error) {
        console.error("Error adding comment:", error);
        setError("Yorum eklenirken bir hata oluştu");
      }
    }
  };

  const handleReply = async () => {
    if (replyContent.content !== '' && thread && replyingTo) {
      console.log(replyingTo, replyContent);
      try {
        let newReplyData: any;
        if (replyingTo.type === 'comment') {
          newReplyData = await threadHelper.addReply(replyContent);
          // setThread(prevThread => {
          //   if (!prevThread) return null;
          //   return {
          //     ...prevThread,
          //     comments: prevThread.comments.map(comment =>
          //       comment.id === replyingTo.id
          //         ? { ...comment, replies: [...comment.replies, newReplyData] }
          //         : comment
          //     )
          //   };
          // });
          console.log(replyingTo, replyContent);
        } else {
          newReplyData = await threadHelper.addReplyToReply(replyContent);
          
          console.log(replyContent);
        }

        setReplyingTo(null);
        setReplyContent({ type: '', parent_id: '', content: '' });
      } catch (error) {
        console.error("Error adding reply:", error);
        setError("Yanıt eklenirken bir hata oluştu");
      }
    }
  };

  // const updateRepliesRecursively = (replies: IReply[], targetId: number, newReply: IReply): IReply[] => {
  //   return replies.map(reply => {
  //     if (reply.id === targetId) {
  //       return { ...reply, children: [...(reply.children || []), newReply] };
  //     }
  //     if (reply.children) {
  //       return { ...reply, children: updateRepliesRecursively(reply.children, targetId, newReply) };
  //     }
  //     return reply;
  //   });
  // };

  const handleReportSubmit = async () => {
    if (reportingItem) {
      console.log('Report submitted:', { type: reportingItem.type, id: reportingItem.id, reasons: reportReasons, explanation: reportExplanation });
      setReportReasons({ spam: false, harassment: false, inappropriate: false, other: false });
      setReportExplanation('');
      setIsReportModalOpen(false);
      setReportingItem(null);
    }
  };

  const handleThreadLike = async () => {
    if (thread) {
      try {
        setThread(prevThread => {
          if (!prevThread) return null;
          return {
            ...prevThread,
            likes_count: prevThread.likes_count + 1
          };
        });
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } catch (error) {
        console.error("Error liking thread:", error);
        setError("Beğeni eklenirken bir hata oluştu");
      }
    }
  };

  const handleCommentLike = async (commentId: number) => {
    if (thread) {
      try {
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
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700" onClick={() => handleReport('comment', comment.id)}>
                      <FlagIcon className="h-4 w-4 mr-1" />
                      Raporla
                    </Button>
                  </div>
                  {replyingTo?.type === 'comment' && replyingTo.id === comment.id && (
                    <div className="mt-2 flex space-x-2">
                      <Textarea
                        placeholder="Yanıtınızı yazın..."
                        value={replyContent.content}
                        name="content"
                        id="content"
                        onChange={handleChangeReply}
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
                  <ReplyArea
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

      <CommentForm
        newComment={newComment}
        handleChangeComment={handleChangeComment}
        handleAddComment={handleAddComment}
      />

      <ReportForm
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
        reportingItemType={reportingItem?.type}
      />
    </div>
  );
}
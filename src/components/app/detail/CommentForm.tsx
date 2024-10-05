"use client";
// import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ICreateComment } from "@/interfaces/thread";
import { SendIcon } from "lucide-react";

export default function CommentForm({ newComment, handleChangeComment, handleAddComment }: { newComment: ICreateComment, handleChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, handleAddComment: () => void }) {
    return (
        <Card className="mt-6 sticky bottom-4">
            <CardContent className="p-4">
                <div className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>YA</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex space-x-2">
                        <Textarea
                            placeholder="Yorumunuzu buraya yazın..."
                            value={newComment.content}
                            name="content"
                            id="content"
                            onChange={handleChangeComment}
                            className="flex-1"
                        />
                        <Button onClick={handleAddComment}>
                            <SendIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
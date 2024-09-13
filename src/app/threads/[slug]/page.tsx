"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  UserIcon,
  FlagIcon,
  ThumbsUpIcon,
  ReplyIcon,
} from "lucide-react";
import CommentArea from "@/components/app/detail/comment-area";

export default function ThreadDetailPage() {
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
          <Button>
            <ReplyIcon className="h-4 w-4 mr-1" />
            Reply
          </Button>
        </CardFooter>
      </Card>

      <CommentArea />
    </div>
  );
}

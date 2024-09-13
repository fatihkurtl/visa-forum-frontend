import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquareIcon, UserIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { slugify } from "@/utils/slugify";

export default function ThreadsTabs() {
  return (
    <Tabs defaultValue="recent" className="mb-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
      </TabsList>
      <TabsContent value="recent">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Recent Threads
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "US B1/B2 Visa Slot Available",
              category: "Tourist Visa",
              user: "Emma S.",
              replies: 5,
              views: 120,
              lastReply: "2 hours ago",
            },
            {
              title: "Schengen Visa Appointment Open",
              category: "Schengen Visa",
              user: "Michael L.",
              replies: 3,
              views: 85,
              lastReply: "4 hours ago",
            },
            {
              title: "Canada Study Permit Slot",
              category: "Student Visa",
              user: "Rahul K.",
              replies: 7,
              views: 200,
              lastReply: "1 day ago",
            },
          ].map((thread, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                        <Link href={`/threads/${slugify(thread.title)}`}>{thread.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Started by {thread.user}
                      </p>
                    </div>
                    <Badge variant="secondary">{thread.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <MessageSquareIcon className="h-4 w-4 mr-1" />
                      {thread.replies} replies
                    </span>
                    <span className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {thread.views} views
                    </span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {thread.lastReply}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="popular">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Popular Threads
        </h2>
        <p className="text-gray-600">Popular threads will be displayed here.</p>
      </TabsContent>
      <TabsContent value="unanswered">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Unanswered Threads
        </h2>
        <p className="text-gray-600">
          Unanswered threads will be displayed here.
        </p>
      </TabsContent>
    </Tabs>
  );
}

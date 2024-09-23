"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, MessageSquareIcon, UserIcon, SettingsIcon, AwardIcon, TrendingUpIcon, UserPlusIcon, UsersIcon } from "lucide-react"
import Link from 'next/link'

export default function UserProfilePage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(1234) // Initial followers count

  const sharedTopics = [
    { id: 1, title: "US B1/B2 Visa Slot Available", date: "2023-06-10", replies: 15, views: 230 },
    { id: 2, title: "Schengen Visa Tips for First-Timers", date: "2023-05-22", replies: 28, views: 412 },
  ]

  const commentedTopics = [
    { id: 3, title: "Canada Study Permit Processing Time", date: "2023-06-05", yourComment: "Thanks for the information! This is really helpful." },
    { id: 4, title: "UK Skilled Worker Visa Requirements", date: "2023-05-30", yourComment: "Does anyone know if the rules have changed recently?" },
  ]

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
    // Update followers count
    setFollowersCount(prevCount => isFollowing ? prevCount - 1 : prevCount + 1)
    // Here you would typically make an API call to update the follow status
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="@johndoe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-800">John Doe</h1>
              <p className="text-gray-600">Joined June 2022</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <Badge variant="secondary">Tourist Visa Expert</Badge>
                <Badge variant="secondary">Helpful Member</Badge>
              </div>
              <div className="flex items-center justify-center md:justify-start mt-2">
                <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-gray-600">{followersCount} followers</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <Link href="/members/edit">
                <Button>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
              <Button variant="outline" onClick={handleFollowClick}>
                <UserPlusIcon className="mr-2 h-4 w-4" />
                {isFollowing ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="shared" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shared">Shared Topics</TabsTrigger>
              <TabsTrigger value="commented">Commented Topics</TabsTrigger>
            </TabsList>
            <TabsContent value="shared">
              <Card>
                <CardHeader>
                  <CardTitle>Shared Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  {sharedTopics.map((topic) => (
                    <div key={topic.id} className="mb-4 last:mb-0">
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                        <a href={`/thread/${topic.id}`}>{topic.title}</a>
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {topic.date}
                        </span>
                        <span className="flex items-center">
                          <MessageSquareIcon className="h-4 w-4 mr-1" />
                          {topic.replies} replies
                        </span>
                        <span className="flex items-center">
                          <UserIcon className="h-4 w-4 mr-1" />
                          {topic.views} views
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="commented">
              <Card>
                <CardHeader>
                  <CardTitle>Commented Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  {commentedTopics.map((topic) => (
                    <div key={topic.id} className="mb-4 last:mb-0">
                      <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                        <a href={`/thread/${topic.id}`}>{topic.title}</a>
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {topic.date}
                      </div>
                      <p className="mt-2 text-gray-600 italic">&quot;{topic.yourComment}&quot;</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Reputation</span>
                    <span className="font-semibold">750 / 1000</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Topics Created</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Comments Posted</span>
                  <span className="font-semibold">189</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Helpful Votes</span>
                  <span className="font-semibold">531</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <AwardIcon className="h-6 w-6 mr-2 text-yellow-500" />
                  <span className="text-gray-800">Top Contributor 2023</span>
                </div>
                <div className="flex items-center">
                  <TrendingUpIcon className="h-6 w-6 mr-2 text-green-500" />
                  <span className="text-gray-800">Rising Star</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="email-notifications" className="text-base font-medium text-gray-900">
                    Email Notifications
                  </label>
                  <p className="text-sm text-gray-500">Receive email updates about your activity</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
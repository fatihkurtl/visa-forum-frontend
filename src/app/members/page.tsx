"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, UserPlus } from "lucide-react"
import Link from "next/link"

// Mock data for members
const members = [
  { id: 1, name: "John Doe", username: "johnd", avatar: "/avatars/john-doe.jpg", role: "Member", posts: 156, joined: "2022-03-15" },
  { id: 2, name: "Jane Smith", username: "janes", avatar: "/avatars/jane-smith.jpg", role: "Moderator", posts: 342, joined: "2021-11-22" },
  { id: 3, name: "Bob Johnson", username: "bobj", avatar: "/avatars/bob-johnson.jpg", role: "Member", posts: 89, joined: "2023-01-05" },
  { id: 4, name: "Alice Brown", username: "aliceb", avatar: "/avatars/alice-brown.jpg", role: "Admin", posts: 567, joined: "2021-07-30" },
  { id: 5, name: "Charlie Wilson", username: "charliew", avatar: "/avatars/charlie-wilson.jpg", role: "Member", posts: 201, joined: "2022-09-18" },
  { id: 6, name: "Eva Garcia", username: "evag", avatar: "/avatars/eva-garcia.jpg", role: "Member", posts: 78, joined: "2023-04-02" },
  { id: 7, name: "David Lee", username: "davidl", avatar: "/avatars/david-lee.jpg", role: "Moderator", posts: 412, joined: "2021-12-10" },
  { id: 8, name: "Grace Taylor", username: "gracet", avatar: "/avatars/grace-taylor.jpg", role: "Member", posts: 135, joined: "2022-06-25" },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role.toLowerCase() === roleFilter.toLowerCase()
    return matchesSearch && matchesRole
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Forum Members</h1>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search members..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-sm text-gray-500">@{member.username}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Badge variant={member.role === "Admin" ? "destructive" : member.role === "Moderator" ? "default" : "secondary"}>
                  {member.role}
                </Badge>
                <span className="text-sm text-gray-500">Joined {formatDate(member.joined)}</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Posts: {member.posts}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Follow
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No members found matching your search criteria.</p>
      )}

      <div className="mt-8 text-center">
        <Button asChild>
          <Link href="/members/directory">View Full Member Directory</Link>
        </Button>
      </div>
    </div>
  )
}
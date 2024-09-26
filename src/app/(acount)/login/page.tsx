"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, MessageSquareIcon, UsersIcon, GlobeIcon, TrendingUpIcon } from "lucide-react"

export default function VisaForumLoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Log in to VisaConnect and join the discussion
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col justify-center">
            <form className="space-y-4 max-w-sm mx-auto w-full">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Username</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input id="email" placeholder="Enter your email or username" className="pl-10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full">Log In</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              Don&quot;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">VisaConnect Forum</CardTitle>
            <CardDescription>Your community for visa and travel advice</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <UsersIcon className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-semibold">Active Community</p>
                  <p className="text-muted-foreground">Thousands of travelers</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquareIcon className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-semibold">Real-time Support</p>
                  <p className="text-muted-foreground">Quick visa answers</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <GlobeIcon className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-semibold">Global Insights</p>
                  <p className="text-muted-foreground">Worldwide visa info</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUpIcon className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <p className="font-semibold">Trending Topics</p>
                  <p className="text-muted-foreground">Stay updated</p>
                </div>
              </div>
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <h3 className="font-semibold mb-2 text-sm">Recent Discussions</h3>
              <ul className="space-y-1 text-sm">
                <li>• UK Skilled Worker Visa Updates</li>
                <li>• Canada Express Entry Draw Results</li>
                <li>• US Student Visa Interview Tips</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-sm">Featured Members</h3>
              <div className="flex items-center space-x-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" alt="@emmawatson" />
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Emma Watson</p>
                  <Badge variant="secondary" className="text-xs">Visa Expert</Badge>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" alt="@alexchen" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Alex Chen</p>
                  <Badge variant="secondary" className="text-xs">Travel Guru</Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground italic">
              &quot; VisaConnect has been my go-to resource for all visa-related questions. The community is incredibly knowledgeable and supportive!&quot;
              <br />
              - Maria G., Forum Member
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
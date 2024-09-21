"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, MessageSquareIcon, UsersIcon, GlobeIcon, TrendingUpIcon } from "lucide-react"

export default function VisaForumRegisterPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <Card className="flex-1">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center">Join Our Visa Forum</CardTitle>
                        <CardDescription className="text-center">
                            Connect with fellow travelers and share visa experiences
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-6">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="Enter your first name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Enter your last name" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" placeholder="Choose a unique username" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <Input id="email" type="email" placeholder="Enter your email" className="pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
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

                            <div className="space-y-2">
                                <Label htmlFor="country">Country of Interest</Label>
                                <Select>
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usa">United States</SelectItem>
                                        <SelectItem value="canada">Canada</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                        <SelectItem value="australia">Australia</SelectItem>
                                        <SelectItem value="schengen">Schengen Area</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms" className="text-sm">
                                    I agree to the <a href="#" className="text-primary hover:underline">Forum Rules</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                                </Label>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Create Account</Button>
                    </CardFooter>
                    <div className="text-center text-sm mt-4 mb-6">
                        Already have an account?{" "}
                        <a href="#" className="text-primary hover:underline font-medium">
                            Sign in
                        </a>
                    </div>
                </Card>

                <div className="flex-1">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Welcome to VisaConnect Forum</CardTitle>
                            <CardDescription>Your community for visa and travel advice</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <UsersIcon className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-lg font-semibold">Global Community</h3>
                                    <p className="text-sm text-muted-foreground">Connect with travelers from around the world</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MessageSquareIcon className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-lg font-semibold">Expert Advice</h3>
                                    <p className="text-sm text-muted-foreground">Get tips from experienced travelers and visa applicants</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <GlobeIcon className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-lg font-semibold">Diverse Topics</h3>
                                    <p className="text-sm text-muted-foreground">Discuss visas, immigration, and travel experiences</p>
                                </div>
                            </div>

                            <div className="bg-muted p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Top Contributors</h3>
                                <div className="flex items-center space-x-2 mb-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@johndoe" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">John Doe</p>
                                        <Badge variant="secondary">Expert</Badge>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@janedoe" />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium">Jane Doe</p>
                                        <Badge variant="secondary">Moderator</Badge>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-2">Trending Topics</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <TrendingUpIcon className="h-4 w-4 text-primary" />
                                        <span className="text-sm">US Student Visa Process 2023</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <TrendingUpIcon className="h-4 w-4 text-primary" />
                                        <span className="text-sm">Schengen Visa Tips and Tricks</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm text-muted-foreground italic">
                                &quot;VisaConnect has been an invaluable resource for my travels. The community is incredibly helpful!&quot;
                                <br />
                                - Sarah T., Forum Member
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
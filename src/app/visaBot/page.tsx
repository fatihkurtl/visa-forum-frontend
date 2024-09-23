"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, HelpCircle, AlertCircle } from "lucide-react"

interface Message {
    id: number
    text: string
    sender: "user" | "bot"
}

export default function ChatbotPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I'm VisaBot. How can I assist you with visa-related questions today?", sender: "bot" }
    ])
    const [input, setInput] = useState("")
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    const handleSendMessage = () => {
        if (input.trim()) {
            const newMessage: Message = { id: messages.length + 1, text: input.trim(), sender: "user" }
            setMessages([...messages, newMessage])
            setInput("")
            // Simulate bot response
            setTimeout(() => {
                const botResponse: Message = {
                    id: messages.length + 2,
                    text: "I'm sorry, but I'm a demo chatbot and can't provide real visa advice. For accurate information, please consult official sources or speak with a visa specialist.",
                    sender: "bot"
                }
                setMessages(prevMessages => [...prevMessages, botResponse])
            }, 1000)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Chat with VisaBot</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Bot className="mr-2 h-5 w-5" />
                            VisaBot Chat
                        </CardTitle>
                        <CardDescription>Ask VisaBot about visa processes, requirements, and general information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[400px] w-full pr-4" ref={scrollAreaRef}>
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
                                >
                                    <div className={`flex items-start ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <Avatar className="h-8 w-8">
                                            {message.sender === "user" ? (
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                            ) : (
                                                <AvatarImage src="/visabot-avatar.png" alt="VisaBot" />
                                            )}
                                            <AvatarFallback>{message.sender === "user" ? "U" : "V"}</AvatarFallback>
                                        </Avatar>
                                        <div
                                            className={`mx-2 px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                                                }`}
                                        >
                                            {message.text}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>
                    </CardContent>
                    <CardFooter>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSendMessage()
                            }}
                            className="flex w-full items-center space-x-2"
                        >
                            <Input
                                type="text"
                                placeholder="Type your message..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button type="submit">
                                <Send className="h-4 w-4 mr-2" />
                                Send
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <HelpCircle className="mr-2 h-5 w-5" />
                            About VisaBot
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">
                            VisaBot is here to assist you with general visa-related inquiries. While it can provide helpful information,
                            please note that it&apos;s not a substitute for professional advice.
                        </p>
                        <h3 className="font-semibold mb-2">VisaBot can help with:</h3>
                        <ul className="list-disc list-inside space-y-1 mb-4">
                            <li>General visa application processes</li>
                            <li>Document requirements for various visa types</li>
                            <li>Visa application timelines</li>
                            <li>Common visa terminology explanations</li>
                        </ul>
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm">
                                        For specific cases or official advice, please consult with a qualified immigration specialist or the
                                        relevant embassy/consulate.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
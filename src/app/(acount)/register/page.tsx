"use client"

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquareIcon, UsersIcon, GlobeIcon, TrendingUpIcon } from "lucide-react"
import RegisterForm from "@/components/app/member/RegisterForm"

export default function VisaForumRegisterPage() {

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <Card className="flex-1">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-bold text-center">Vize Forumumuza Katılın</CardTitle>
                        <CardDescription className="text-center">
                            Diğer gezginlerle bağlantı kurun ve vize deneyimlerini paylaşın
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="mt-6">
                        <RegisterForm />
                    </CardContent>
                    {/* <CardFooter>
                        
                    </CardFooter> */}
                    <div className="text-center text-sm mt-4 mb-6">
                        Zaten bir hesabınız var mı?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Oturum aç
                        </Link>
                    </div>
                </Card>

                <div className="flex-1">
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">VisaConnect Forum&apos;a Hoş Geldiniz</CardTitle>
                            <CardDescription>Vize ve seyahat tavsiyeleri için topluluğunuz</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <UsersIcon className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-lg font-semibold">Küresel Topluluk</h3>
                                    <p className="text-sm text-muted-foreground">Dünyanın dört bir yanından gezginlerle bağlantı kurun</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <MessageSquareIcon className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-lg font-semibold">Uzman Tavsiyesi</h3>
                                    <p className="text-sm text-muted-foreground">Deneyimli gezginlerden ve vize başvuru sahiplerinden ipuçları alın</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <GlobeIcon className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-lg font-semibold">Çeşitli Konular</h3>
                                    <p className="text-sm text-muted-foreground">Vize, göçmenlik ve seyahat deneyimlerini tartışın</p>
                                </div>
                            </div>

                            <div className="bg-muted p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">En Çok Katkıda Bulunanlar</h3>
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
                                <h3 className="font-semibold mb-2">Gündemdeki Konular</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <TrendingUpIcon className="h-4 w-4 text-primary" />
                                        <span className="text-sm">ABD Öğrenci Vizesi Süreci 2023</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <TrendingUpIcon className="h-4 w-4 text-primary" />
                                        <span className="text-sm">Schengen Vizesi İpuçları ve Püf Noktaları</span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <p className="text-sm text-muted-foreground italic">
                                &quot;VisaConnect seyahatlerim için paha biçilmez bir kaynak oldu. Topluluk inanılmaz derecede yardımcı oluyor!&quot;
                                <br />
                                - Sarah T.,
                                Forum Üyesi
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
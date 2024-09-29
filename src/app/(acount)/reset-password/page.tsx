"use client"

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquareIcon, UsersIcon, GlobeIcon, TrendingUpIcon } from "lucide-react"
import ResetPasswordForm from '@/components/app/member/ResetPasswordForm'

export default function VisaForumForgotPasswordPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                <Card className="flex-1 flex flex-col">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">
                            Şifrenizi mi Unuttunuz?
                        </CardTitle>
                        <CardDescription className="text-center">
                            E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-center">
                        <ResetPasswordForm />
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <div className="text-center text-sm">
                            Şifrenizi hatırladınız mı?{" "}
                            <Link href="/login" className="text-primary hover:underline font-medium">
                                Giriş yapın
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">VisaConnect Forum</CardTitle>
                        <CardDescription>Vize ve seyahat tavsiyeleri için topluluğunuz</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <UsersIcon className="h-5 w-5 text-primary" />
                                <div className="text-sm">
                                    <p className="font-semibold">Aktif Topluluk</p>
                                    <p className="text-muted-foreground">Binlerce gezgin</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageSquareIcon className="h-5 w-5 text-primary" />
                                <div className="text-sm">
                                    <p className="font-semibold">Gerçek Zamanlı Destek</p>
                                    <p className="text-muted-foreground">Hızlı vize cevapları</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <GlobeIcon className="h-5 w-5 text-primary" />
                                <div className="text-sm">
                                    <p className="font-semibold">Küresel İçgörüler</p>
                                    <p className="text-muted-foreground">Dünya çapında vize bilgileri</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TrendingUpIcon className="h-5 w-5 text-primary" />
                                <div className="text-sm">
                                    <p className="font-semibold">Gündemdeki Konular</p>
                                    <p className="text-muted-foreground">Güncel kalın</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-muted p-3 rounded-lg">
                            <h3 className="font-semibold mb-2 text-sm">Son Tartışmalar</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• Birleşik Krallık Vasıflı İşçi Vizesi Güncellemeleri</li>
                                <li>• Kanada Hızlı Giriş Kura Sonuçları</li>
                                <li>• ABD Öğrenci Vizesi Mülakat İpuçları</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2 text-sm">Öne Çıkan Üyeler</h3>
                            <div className="flex items-center space-x-2 mb-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="@emmawatson" />
                                    <AvatarFallback>EW</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">Emma Watson</p>
                                    <Badge variant="secondary" className="text-xs">Vize Uzmanı</Badge>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage src="/placeholder.svg?height=24&width=24" alt="@alexchen" />
                                    <AvatarFallback>AC</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">Alex Chen</p>
                                    <Badge variant="secondary" className="text-xs">Seyahat Gurusu</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <p className="text-xs text-muted-foreground italic">
                            &quot;VisaConnect vize ile ilgili tüm sorularım için başvurduğum kaynak oldu. Topluluk inanılmaz derecede bilgili ve destekleyici!&quot;
                            <br />
                            - Maria G., Forum Üyesi
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
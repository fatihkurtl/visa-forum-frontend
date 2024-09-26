"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon, MessageSquareIcon, UsersIcon, GlobeIcon, TrendingUpIcon } from "lucide-react"
import type { IRegisterData } from "@/interfaces/member"
import api from '@/services/api'
import { MemberHelper } from '@/helpers/member'


const memberHelper = new MemberHelper(api)

export default function VisaForumRegisterPage() {
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState<IRegisterData>({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        checked && setError(null)
        setFormData((prevData) => ({ ...prevData, terms: checked }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!formData.firstname || !formData.lastname || !formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            toast({
                title: 'Hata',
                description: 'Kayıt olmak için tüm alanları doldurmalısınız.',
                variant: 'destructive',
                duration: 4000,
            })
            return
        }
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Hata',
                description: 'Şifreler uyuşmuyor.',
                variant: 'destructive',
                duration: 4000,
            })
            return
        }
        if (formData.password.length < 8) {
            toast({
                title: 'Hata',
                description: 'Şifre en az 8 karakter olmalıdır.',
                variant: 'destructive',
                duration: 4000,
            })
            return
        }
        if (!formData.terms) {
            toast({
                title: 'Hata',
                description: 'Forum Kuralları ve Gizlilik Politikasını kabul etmelisiniz.',
                variant: 'destructive',
            })
            setError('Forum kuralları ve Gizlilik Politikasını kabul etmelisiniz.')
            return
        }

        try {
            const response = await memberHelper.register(formData)
            console.log(response);
            if (response.status === 201) {
                toast({
                    title: 'Hesap oluşturuldu',
                    description: response.message,
                    duration: 4000,
                    onAnimationEnd: () => {
                        window.location.href = '/login'
                    }
                })
            } else {
                toast({
                    title: 'Hata',
                    description: 'Kullanıcı adı veya e-posta zaten kayıtlı.',
                    variant: 'destructive',
                })
                console.log(response);
            }
            console.log(formData)
        } catch (error) {
            toast({
                title: 'Hata',
                description: 'Bir hata oluştu.',
                variant: 'destructive',
            })
            console.error(error);
        }
    }

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
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstname">Ad</Label>
                                    <Input id="firstname" name='firstname' value={formData.firstname} onChange={handleChange} type="text" placeholder="Adınızı girin" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastname">Soyad</Label>
                                    <Input id="lastname" name='lastname' value={formData.lastname} onChange={handleChange} type="text" placeholder="Soyadınızı girin" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Kullanıcı Adı</Label>
                                <Input id="username" name='username' value={formData.username} onChange={handleChange} type="text" placeholder="Benzersiz bir kullanıcı adı seçin" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">E-posta</Label>
                                <div className="relative">
                                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <Input id="email" name='email' value={formData.email} onChange={handleChange} autoComplete='email' type="email" placeholder="E-posta adresinizi girin" className="pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Şifre</Label>
                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <Input
                                        id="password"
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Güçlü bir şifre oluşturun"
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
                                <Label htmlFor="password">Şifre Onayı</Label>
                                <div className="relative">
                                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <Input
                                        id="confirmPassword"
                                        name='confirmPassword'
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Şifrenizi tekrar girin"
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

                            <div className="flex items-center space-x-2">
                                <input
                                    id="terms"
                                    name='terms'
                                    type='checkbox'
                                    onChange={handleCheckboxChange}
                                    className="w-4 h-4 accent-gray-950"
                                />
                                <Label htmlFor="terms" className={error === null ? "text-sm text-primary" : formData.terms ? "text-sm text-primary" : "text-sm text-red-500"}>
                                    <a href="#" className="hover:underline">Forum Kurallarını</a> ve <a href="#" className="hover:underline">Gizlilik Politikasını</a> kabul ediyorum.
                                </Label>
                            </div>

                            <Button type="submit" className="w-full">Kayıt Ol</Button>
                        </form>
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
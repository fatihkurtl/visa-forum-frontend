"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from "lucide-react"
import type { IRegisterData } from "@/interfaces/member"
import api from '@/services/api'
import { MemberHelper } from '@/helpers/member'
import { PASSWORD_REGEX } from '@/constants/index'

const memberHelper = new MemberHelper(api)

export default function RegisterForm() {
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
        if (!PASSWORD_REGEX.test(formData.password)) {
            toast({
                title: 'Hata',
                description: 'Şifre en az 8 karakter olmalı, küçük/büyük harf, sayı ve özel karakter içermelidir.',
                variant: 'destructive',
                duration: 4000,
            })
            setError('Şifre en az 8 karakter olmalı, küçük/büyük harf, sayı ve özel karakter içermelidir.')
            return
        }
        if (formData.username.length < 4) {
            toast({
                title: 'Hata',
                description: 'Kullanıcı adı en az 4 karakter olmalıdır.',
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
                })
                setFormData({
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    terms: false,
                })
                setTimeout(() => {
                    window.location.href = '/login'
                }, 2000);
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
        <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <span className="text-red-500">{error}</span>}
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
    )
}
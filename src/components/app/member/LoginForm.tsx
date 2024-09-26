"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, MailIcon, LockIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import api from '@/services/api'
import { MemberHelper } from '@/helpers/member'
import { ILoginData } from '@/interfaces/member'
import { setMemberCookies } from '@/middlewares/cookies'

const memberHelper = new MemberHelper(api)

export default function LoginForm() {
    const { toast } = useToast()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<ILoginData>({
        identifier: "",
        password: "",
    })
    const [remember, setRemember] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await memberHelper.login(formData)
            console.log("Response: ", response);
            if ('non_field_errors' in response) {
                toast({
                    title: "Giriş Hatası",
                    description: response.non_field_errors.join(", "),
                    variant: "destructive",
                });
                setError(response.non_field_errors.join(", "));
            } else {
                toast({
                    title: "Giriş Yapıldı",
                    description: "Hoşgeldiniz.",
                });
                setError(null);
                await setMemberCookies(response);
                setFormData({ identifier: "", password: "" });
                setRemember(false);
                setTimeout(() => {
                    window.location.href = "/"
                }, 2000)
                console.log("Giriş Yapıldı:", response);
            }

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <form className="space-y-4 max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-2">
                <Label htmlFor="email">E-posta veya Kullanıcı Adı</Label>
                <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input id="identifier" name="identifier" value={formData.identifier} onChange={handleChange} placeholder="E-posta adresinizi veya kullanıcı adınızı girin" className="pl-10" />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        placeholder="Şifrenizi girin"
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
                    <input
                        id="remember"
                        name='remember'
                        type='checkbox'
                        className="w-4 h-4 accent-gray-950"
                        onChange={() => setRemember(!remember)}
                    />
                    <Label htmlFor="remember" className="text-sm">Beni hatırla</Label>
                </div>
                <Link href="#" className="text-sm text-primary hover:underline">
                    Şifrenizi mi unuttunuz?
                </Link>
            </div>

            <Button type="submit" className="w-full">Oturum Aç</Button>
        </form>
    )
}
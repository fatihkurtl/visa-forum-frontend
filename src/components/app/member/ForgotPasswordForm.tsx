"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MailIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import api from '@/services/api'
import { MemberHelper } from '@/helpers/member'

const memberHelper = new MemberHelper(api)

interface IForgotPasswordData {
    email: string
}

export default function ForgotPasswordForm() {
    const { toast } = useToast()
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState<IForgotPasswordData>({
        email: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (formData.email === "") {
                toast({
                    title: "Hata",
                    description: "Lütfen e-posta adresinizi giriniz.",
                    variant: "destructive",
                })
                return
            }

            // Burada API çağrısı yapılacak
            // const response = await memberHelper.forgotPassword(formData)

            // Simüle edilmiş başarılı yanıt
            const response = { success: true }

            if (response.success) {
                toast({
                    title: "Başarılı",
                    description: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
                })
                setError(null)
                setFormData({ email: "" })
                setTimeout(() => {
                    router.push('/login')
                }, 3000)
            } else {
                toast({
                    title: "Hata",
                    description: "Şifre sıfırlama işlemi başarısız oldu. Lütfen tekrar deneyin.",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "Hata",
                description: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
                variant: "destructive",
            })
        }
    }

    return (
        <form className="space-y-4 max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-2">
                <Label htmlFor="email">E-posta Adresi</Label>
                <div className="relative">
                    <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-posta adresinizi girin"
                        className="pl-10"
                    />
                </div>
            </div>

            <Button type="submit" className="w-full">Şifre Sıfırlama Bağlantısı Gönder</Button>
        </form>
    )
}
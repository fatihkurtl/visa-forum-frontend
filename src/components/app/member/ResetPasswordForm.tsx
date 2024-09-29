"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import api from '@/services/api'
import { MemberHelper } from '@/helpers/member'

const memberHelper = new MemberHelper(api)

interface IResetPasswordData {
  password: string
  confirmPassword: string
  token: string
}

export default function ResetPasswordForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<IResetPasswordData>({
    password: "",
    confirmPassword: "",
    token: "" // Bu token URL'den alınacak
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (formData.password === "" || formData.confirmPassword === "") {
        toast({
          title: "Hata",
          description: "Lütfen tüm alanları doldurunuz.",
          variant: "destructive",
        })
        return
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Hata",
          description: "Şifreler eşleşmiyor.",
          variant: "destructive",
        })
        return
      }

      // Burada API çağrısı yapılacak
      // const response = await memberHelper.resetPassword(formData)
      
      // Simüle edilmiş başarılı yanıt
      const response = { success: true }

      if (response.success) {
        toast({
          title: "Başarılı",
          description: "Şifreniz başarıyla sıfırlandı.",
        })
        setError(null)
        setFormData({ password: "", confirmPassword: "", token: "" })
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
        <Label htmlFor="password">Yeni Şifre</Label>
        <div className="relative">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            placeholder="Yeni şifrenizi girin"
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
        <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
        <div className="relative">
          <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Yeni şifrenizi tekrar girin"
            className="pl-10 pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOffIcon className="h-4 w-4 text-gray-400" />
            ) : (
              <EyeIcon className="h-4 w-4 text-gray-400" />
            )}
          </Button>
        </div>
      </div>

      <Button type="submit" className="w-full">Şifreyi Sıfırla</Button>
    </form>
  )
}
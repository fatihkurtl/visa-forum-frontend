"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Bot, CheckCircle, Lock } from "lucide-react"
import Image from 'next/image'

const plans = [
  { name: 'Aylık Plan', price: '49.99', period: 'ay' },
  { name: 'Yıllık Plan', price: '499.99', period: 'yıl', discount: '15% indirim' },
]

export default function VisaChatBotPayment() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0])
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardHolderName, setCardHolderName] = useState('')

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada iyzico ödeme işlemini başlatacak fonksiyon çağrılacak
    console.log("iyzico ödeme işlemi başlatılıyor:", { 
      plan: selectedPlan, 
      cardNumber, 
      expiryDate, 
      cvv, 
      cardHolderName 
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">VisaConnect ChatBot</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Vize başvuru sürecinizde size yardımcı olacak yapay zeka destekli chatbot&apos;umuza hoş geldiniz.
        7/24 erişilebilir uzman yardımı için hemen abone olun!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bot className="mr-2 h-6 w-6" />
              ChatBot Özellikleri
            </CardTitle>
            <CardDescription>
              VisaConnect ChatBot ile vize sürecinizi kolaylaştırın
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <span>7/24 anında cevaplar</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <span>100+ ülke için vize bilgileri</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <span>Kişiselleştirilmiş vize tavsiyeleri</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <span>Güncel vize gereksinimleri</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" />
              <span>Sınırsız soru sorma hakkı</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Abonelik ve Ödeme</CardTitle>
            <CardDescription>Size en uygun planı seçin ve güvenle ödeyin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment}>
              <RadioGroup 
                defaultValue={selectedPlan.name} 
                onValueChange={(value) => setSelectedPlan(plans.find(plan => plan.name === value) || plans[0])}
                className="mb-6"
              >
                {plans.map((plan) => (
                  <div key={plan.name} className="flex items-center space-x-2 mb-4">
                    <RadioGroupItem value={plan.name} id={plan.name} />
                    <Label htmlFor={plan.name} className="flex-grow">
                      <span className="font-medium">{plan.name}</span>
                      <span className="block text-sm text-gray-500">
                        {plan.price} TL / {plan.period}
                        {plan.discount && <span className="ml-2 text-green-600">{plan.discount}</span>}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardHolderName">Kart Üzerindeki İsim</Label>
                  <Input
                    id="cardHolderName"
                    placeholder="Ad Soyad"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Kart Numarası</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                    <Input
                      id="expiryDate"
                      placeholder="AA/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full mt-6">
                <Lock className="mr-2 h-4 w-4" />
                Güvenli Ödeme Yap
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-2">Ödeme altyapımız</p>
        <Image src="/iyzico-logo.png" alt="iyzico logo" width={120} height={40} className="mx-auto" />
      </div>

      <Separator className="my-12" />

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Sıkça Sorulan Sorular</h2>
        <Tabs defaultValue="usage" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="usage">Kullanım</TabsTrigger>
            <TabsTrigger value="payment">Ödeme</TabsTrigger>
            <TabsTrigger value="support">Destek</TabsTrigger>
          </TabsList>
          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>ChatBot Nasıl Kullanılır?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>1. Aboneliğinizi seçin ve ödemeyi tamamlayın.</p>
                <p>2. Hesabınıza giriş yapın ve ChatBot sekmesine gidin.</p>
                <p>3. Vize ile ilgili sorularınızı sorun ve anında cevaplar alın.</p>
                <p>4. ChatBot&apos;un cevaplarını kullanarak vize başvurunuzu hazırlayın.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Ödeme Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>- Tüm ödemeler güvenli iyzico altyapısı üzerinden yapılmaktadır.</p>
                <p>- Kredi kartı ve banka kartı ile ödeme yapabilirsiniz.</p>
                <p>- Abonelikler otomatik olarak yenilenir, istediğiniz zaman iptal edebilirsiniz.</p>
                <p>- İlk 7 gün içinde iade garantisi sunuyoruz.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Destek ve Yardım</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>- Teknik sorunlar için support@visaconnect.com adresine e-posta gönderin.</p>
                <p>- ChatBot kullanımı hakkında yardım için yardım merkezimizi ziyaret edin.</p>
                <p>- Çalışma saatlerimiz içinde canlı destek hattımızdan yardım alabilirsiniz.</p>
                <p>- Sık sorulan sorular için SSS sayfamızı inceleyebilirsiniz.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 flex items-center justify-center">
          <Lock className="mr-1 h-4 w-4" />
          Tüm ödemeler iyzico altyapısı ile 256-bit SSL şifrelemesi kullanılarak güvence altındadır.
        </p>
      </div>
    </div>
  )
}
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Search } from "lucide-react"

const faqItems = [
    {
        question: "VisaConnect Forum'a nasıl üye olabilirim?",
        answer: "VisaConnect Forum'a üye olmak için ana sayfadaki 'Üye Ol' butonuna tıklayın. E-posta adresinizi, kullanıcı adınızı ve şifrenizi girerek hesabınızı oluşturabilirsiniz. E-posta doğrulamasından sonra hesabınız aktif hale gelecektir."
    },
    {
        question: "Hangi vize türleri hakkında bilgi paylaşılıyor?",
        answer: "Forum'umuzda turist vizeleri, öğrenci vizeleri, çalışma vizeleri, aile birleşimi vizeleri ve daha birçok vize türü hakkında bilgi paylaşılmaktadır. Ayrıca, farklı ülkelerin vize politikaları ve başvuru süreçleri hakkında da güncel bilgiler bulabilirsiniz."
    },
    {
        question: "Vize başvurum hakkında özel tavsiye alabilir miyim?",
        answer: "Forum üyeleri genel deneyimlerini ve bilgilerini paylaşmakta özgürdür, ancak unutmayın ki bu tavsiyeler resmi veya yasal tavsiye niteliğinde değildir. Spesifik vize başvurunuz için en doğru bilgiyi ilgili ülkenin resmi kaynaklarından veya yetkili vize danışmanlarından almanızı öneririz."
    },
    {
        question: "Forumda uygunsuz bir içerik gördüm, ne yapmalıyım?",
        answer: "Uygunsuz içerik gördüğünüzde, lütfen içeriğin yanındaki 'Bildir' butonunu kullanarak moderatörlerimize bildirin. Ekibimiz en kısa sürede içeriği inceleyecek ve gerekli işlemi yapacaktır. Topluluğumuzun güvenli ve saygılı kalmasına yardımcı olduğunuz için teşekkür ederiz."
    },
    {
        question: "Profilimi nasıl düzenleyebilirim?",
        answer: "Profilinizi düzenlemek için, sağ üst köşedeki kullanıcı menüsüne tıklayın ve 'Profil Ayarları'nı seçin. Buradan profil fotoğrafınızı, kişisel bilgilerinizi ve forum tercihlerinizi güncelleyebilirsiniz."
    },
    {
        question: "Vize randevusu için ipuçları nerede bulabilirim?",
        answer: "Vize randevuları hakkında ipuçları için 'Vize Randevuları' kategorisini ziyaret edebilirsiniz. Burada, diğer üyelerin deneyimlerini, bekleme süreleri hakkında güncel bilgileri ve randevu alma stratejilerini bulabilirsiniz."
    },
    {
        question: "Forum'da nasıl arama yapabilirim?",
        answer: "Forum'da arama yapmak için üst menüdeki arama çubuğunu kullanabilirsiniz. Anahtar kelimeler, kullanıcı adları veya konu başlıkları girerek ilgili içerikleri bulabilirsiniz. Gelişmiş arama seçenekleri için arama sonuçları sayfasındaki filtreleri kullanabilirsiniz."
    },
    {
        question: "Bir konuya nasıl yeni bir cevap ekleyebilirim?",
        answer: "Bir konuya cevap eklemek için, ilgili konuyu açın ve sayfanın altındaki cevap formunu kullanın. Cevabınızı yazdıktan sonra 'Gönder' butonuna tıklayarak cevabınızı paylaşabilirsiniz. Cevap vermeden önce konu başlığını ve önceki cevapları okuduğunuzdan emin olun."
    }
]

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredFAQs, setFilteredFAQs] = useState(faqItems)

    const handleSearch = () => {
        const filtered = faqItems.filter(
            item =>
                item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredFAQs(filtered)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sıkça Sorulan Sorular</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="SSS'lerde ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-grow"
                            />
                            <Button onClick={handleSearch}>
                                <Search className="h-4 w-4 mr-2" />
                                Ara
                            </Button>
                        </div>
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        {filteredFAQs.map((item, index) => (
                            <AccordionItem value={`item-${index}`} key={index}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    {filteredFAQs.length === 0 && (
                        <p className="text-center text-gray-500 mt-4">
                            Aramanızla eşleşen soru bulunamadı. Lütfen farklı bir arama terimi deneyin.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
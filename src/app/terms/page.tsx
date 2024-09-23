import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Kullanım Şartları</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Genel Kurallar</h2>
                <p>Vize Randevu Forumu&apos;na (&apos;Forum&apos;) hoş geldiniz. Bu forumu kullanarak, aşağıdaki şartları kabul etmiş olursunuz:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Forum&apos;u yalnızca yasal amaçlar için kullanacağınızı,</li>
                  <li>Diğer kullanıcılara saygılı davranacağınızı,</li>
                  <li>Kişisel bilgilerinizi korumak için gerekli önlemleri alacağınızı,</li>
                  <li>Telif hakkı ve diğer fikri mülkiyet haklarına saygı göstereceğinizi kabul edersiniz.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">2. İçerik Politikası</h2>
                <p>Forum&apos;da paylaşılan içerikler hakkında:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Yasa dışı, tehdit edici, küçük düşürücü, müstehcen veya iftira niteliğinde içerik paylaşmak yasaktır.</li>
                  <li>Spam veya reklam amaçlı içerik paylaşımı yapılamaz.</li>
                  <li>Vize randevuları ve süreçleri hakkında yanlış veya yanıltıcı bilgi vermekten kaçının.</li>
                  <li>Kişisel deneyimlerinizi paylaşırken, hassas bilgileri (pasaport numarası, tam adres gibi) gizli tutun.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">3. Gizlilik</h2>
                <p>Kullanıcıların gizliliği bizim için önemlidir:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Kişisel bilgileriniz, Forum&apos;un işleyişi için gerekli olduğu ölçüde kullanılacaktır.</li>
                  <li>E-posta adresiniz ve diğer kişisel bilgileriniz üçüncü taraflarla paylaşılmayacaktır.</li>
                  <li>Forum&apos;da paylaştığınız bilgilerin herkese açık olduğunu unutmayın.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">4. Vize Randevuları Hakkında Tartışmalar</h2>
                <p>Vize randevuları hakkında bilgi paylaşırken dikkat edilmesi gerekenler:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Resmi vize başvuru süreçleri hakkında güncel ve doğru bilgi paylaşmaya özen gösterin.</li>
                  <li>Kişisel deneyimlerinizi paylaşırken, bu deneyimlerin herkesi bağlamayabileceğini belirtin.</li>
                  <li>Vize başvuru merkezleri veya büyükelçilikler hakkında yapıcı eleştiriler yapabilirsiniz, ancak hakaret veya iftiradan kaçının.</li>
                  <li>Diğer kullanıcıların sorularına yardımcı olurken, resmi kaynaklara yönlendirmeyi unutmayın.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">5. Moderasyon ve Yaptırımlar</h2>
                <p>Forum&apos;un düzenli işleyişi için moderasyon uygulanmaktadır:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Kurallara uymayan içerikler kaldırılabilir veya düzenlenebilir.</li>
                  <li>Tekrarlayan ihlaller, hesabınızın geçici veya kalıcı olarak askıya alınmasına neden olabilir.</li>
                  <li>Moderatör kararlarına itiraz etme hakkınız vardır, ancak son karar Forum yönetimine aittir.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">6. Değişiklikler ve Güncellemeler</h2>
                <p>Bu kullanım şartları zaman zaman güncellenebilir. Önemli değişiklikler olduğunda, Forum üzerinden bilgilendirileceksiniz. Forum&apos;u kullanmaya devam etmeniz, güncel şartları kabul ettiğiniz anlamına gelir.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">7. İletişim</h2>
                <p>Bu kullanım şartları veya Forum ile ilgili herhangi bir sorunuz varsa, lütfen <a href="mailto:iletisim@vizerandevuforumu.com" className="text-primary hover:underline">iletisim@vizerandevuforumu.com</a> adresinden bizimle iletişime geçin.</p>
              </section>

              <p className="text-sm text-muted-foreground mt-6">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Gizlilik Politikası</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Bilgi Toplama ve Kullanımı</h2>
                <p>VisaConnect Forum olarak, kullanıcılarımızın gizliliğine önem veriyoruz. Bu politika, topladığımız bilgileri ve bunları nasıl kullandığımızı açıklar:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Kayıt sırasında e-posta adresiniz, kullanıcı adınız ve şifreniz gibi kişisel bilgiler topluyoruz.</li>
                  <li>Forum kullanımınız sırasında paylaştığınız içerikler ve etkileşimler kaydedilir.</li>
                  <li>IP adresi, tarayıcı türü ve ziyaret edilen sayfalar gibi teknik bilgiler otomatik olarak toplanır.</li>
                  <li>Bu bilgiler, hizmetlerimizi iyileştirmek, kişiselleştirilmiş deneyim sunmak ve güvenliği sağlamak için kullanılır.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">2. Bilgi Paylaşımı</h2>
                <p>Topladığımız bilgileri nasıl paylaştığımız hakkında:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Kişisel bilgileriniz, yasal zorunluluklar dışında üçüncü taraflarla paylaşılmaz.</li>
                  <li>Forum&apos;da paylaştığınız içerikler herkese açıktır ve diğer kullanıcılar tarafından görüntülenebilir.</li>
                  <li>Anonim istatistiksel veriler, hizmet kalitemizi artırmak için kullanılabilir ve paylaşılabilir.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">3. Çerezler ve İzleme Teknolojileri</h2>
                <p>Web sitemizde çerezler ve benzer teknolojiler kullanıyoruz:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Çerezler, oturum yönetimi ve kullanıcı tercihlerini hatırlamak için kullanılır.</li>
                  <li>Google Analytics gibi üçüncü taraf araçları, site trafiğini analiz etmek için kullanılabilir.</li>
                  <li>Bu teknolojileri devre dışı bırakabilirsiniz, ancak bu durumda bazı site özellikleri düzgün çalışmayabilir.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">4. Veri Güvenliği</h2>
                <p>Bilgilerinizin güvenliği bizim için önemlidir:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>SSL şifreleme kullanarak verilerinizi koruyoruz.</li>
                  <li>Düzenli güvenlik denetimleri ve güncellemeleri yapıyoruz.</li>
                  <li>Çalışanlarımız, gizlilik ve veri güvenliği konusunda eğitilmiştir.</li>
                  <li>Ancak, internet üzerinden hiçbir veri iletiminin %100 güvenli olmadığını unutmayın.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">5. Kullanıcı Hakları</h2>
                <p>Kişisel verilerinizle ilgili haklarınız:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Hakkınızda topladığımız bilgileri görüntüleme ve düzeltme hakkına sahipsiniz.</li>
                  <li>Verilerinizin silinmesini talep edebilirsiniz (yasal yükümlülüklerimiz saklı kalmak kaydıyla).</li>
                  <li>Veri işleme faaliyetlerimize itiraz etme hakkınız vardır.</li>
                  <li>Bu haklarınızı kullanmak için bizimle iletişime geçebilirsiniz.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">6. Çocukların Gizliliği</h2>
                <p>VisaConnect Forum, 13 yaşın altındaki çocuklara yönelik değildir. Bilerek 13 yaşın altındaki çocuklardan kişisel bilgi toplamayız.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">7. Değişiklikler ve Güncellemeler</h2>
                <p>Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda, sitemiz üzerinden veya e-posta yoluyla bilgilendirileceksiniz. Politikamızı düzenli olarak gözden geçirmenizi öneririz.</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">8. İletişim</h2>
                <p>Gizlilik politikamız veya veri uygulamalarımızla ilgili sorularınız varsa, lütfen <a href="mailto:gizlilik@vizerandevuforumu.com" className="text-primary hover:underline">gizlilik@vizerandevuforumu.com</a> adresinden bizimle iletişime geçin.</p>
              </section>

              <p className="text-sm text-muted-foreground mt-6">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
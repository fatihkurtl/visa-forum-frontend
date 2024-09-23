import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
// import Link from "next/link"

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Çerez Politikası</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-2">1. Çerezler Hakkında</h2>
                <p>
                  VisaConnect Forum olarak, web sitemizde çerezler kullanmaktayız. Çerezler, bir web sitesi tarafından 
                  cihazınıza yerleştirilen küçük metin dosyalarıdır. Bu dosyalar, sizin site deneyiminizi iyileştirmek 
                  ve size daha iyi bir hizmet sunmak için kullanılır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">2. Kullandığımız Çerez Türleri</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Çerez Türü</TableHead>
                      <TableHead>Açıklama</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Zorunlu Çerezler</TableCell>
                      <TableCell>Sitenin temel işlevlerini yerine getirmek için gereklidir.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tercih Çerezleri</TableCell>
                      <TableCell>Dil tercihi gibi ayarlarınızı hatırlamak için kullanılır.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">İstatistik Çerezleri</TableCell>
                      <TableCell>Site trafiğini analiz etmek ve kullanıcı davranışlarını anlamak için kullanılır.</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pazarlama Çerezleri</TableCell>
                      <TableCell>Size özel reklamlar göstermek için kullanılır (üçüncü taraf çerezleri).</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">3. Çerezlerin Kullanım Amaçları</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Oturum yönetimi ve kullanıcı kimlik doğrulaması</li>
                  <li>Kullanıcı tercihlerinin hatırlanması</li>
                  <li>Site trafiğinin analiz edilmesi ve performans iyileştirmeleri</li>
                  <li>Kişiselleştirilmiş içerik ve reklamların sunulması</li>
                  <li>Güvenlik önlemlerinin uygulanması</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">4. Çerez Yönetimi</h2>
                <p>
                  Çoğu web tarayıcısı, çerezleri otomatik olarak kabul eder. Ancak, isterseniz tarayıcı ayarlarınızı 
                  değiştirerek çerezleri reddedebilir veya size bildirilmesini sağlayabilirsiniz. Çerezleri devre dışı 
                  bırakmak, sitemizin bazı özelliklerinin düzgün çalışmamasına neden olabilir.
                </p>
                <p className="mt-2">
                  Çerez ayarlarınızı yönetmek için tarayıcınızın yardım sayfasını ziyaret edebilirsiniz:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><a href="https://support.google.com/chrome/answer/95647" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">5. Çerez Tercihleriniz</h2>
                <p>
                  Sitemizde kullanılan çerez türlerini ve tercihlerinizi aşağıdaki butonları kullanarak yönetebilirsiniz:
                </p>
                <div className="flex space-x-4 mt-4">
                  <Button variant="outline">Tüm Çerezleri Kabul Et</Button>
                  <Button variant="outline">Sadece Zorunlu Çerezleri Kabul Et</Button>
                  <Button variant="outline">Çerez Tercihlerini Yönet</Button>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">6. Değişiklikler ve Güncellemeler</h2>
                <p>
                  Bu çerez politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda, sitemiz üzerinden 
                  bilgilendirileceksiniz. Politikamızı düzenli olarak gözden geçirmenizi öneririz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-2">7. İletişim</h2>
                <p>
                  Çerez politikamız veya uygulamalarımızla ilgili sorularınız varsa, lütfen{' '}
                  <a href="mailto:cerez@vizerandevuforumu.com" className="text-primary hover:underline">cerez@vizerandevuforumu.com</a>{' '}
                  adresinden bizimle iletişime geçin.
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-6">
                Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
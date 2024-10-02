"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircleIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { ICategory, ICreateThread } from "@/interfaces/thread"
import { ThreadHelper } from "@/helpers/threads"
import api from "@/services/api"
import { isMemberAuthenticated, removeMemberCookies, setMemberCookies } from '@/middlewares/cookies'
import 'react-quill/dist/quill.snow.css';


const threadHelper = new ThreadHelper(api);

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import Link from 'next/link'

export default function CreateThread() {
  const { toast } = useToast()
  const router = useRouter()
  const [auth, setAuth] = useState<boolean>(false)

  const [formData, setFormData] = useState<ICreateThread>({
    title: '',
    category: '',
    content: '',
  })

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response: ICategory[] = await threadHelper.getCategories();
        console.log("Categories: ", response);
        if (!response) return;
        setCategories(response);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
        setError("Hata oluştu, Kategoriler alınırken bir hata oluştu");
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, []);


  useEffect(() => {
    const checkAuth = async () => {
      const member = await isMemberAuthenticated()
      console.log(member);
      if (member) {
        setAuth(true)
      }
    }

    checkAuth()
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!auth) {
      toast({
        title: "Giriş yapmalısınız",
        description: "Konu oluşturmak için giriş yapmalısınız.",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.category || !formData.content) {
      toast({
        title: "Hata",
        description: "Tüm alanları doldurmalısınız.",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await threadHelper.createThread(formData)
      if (response.token !== null && response.expires_at !== null) {
        await removeMemberCookies();
        await setMemberCookies(response)
        setFormData({ title: '', category: '', content: '' })
        setError(null)
        toast({
          title: "Başarılı",
          description: "Konu oluşturuldu",
        })
        setTimeout(() => {
          router.push('/threads')
        }, 2000)
      }
      console.log(response);
      console.log(formData)
      // router.push('/threads')
    } catch (error) {
      console.error("Error: ", error);
      setError("Hata oluştu, Konu oluşturulurken bir hata oluştu");
      toast({
        title: "Hata",
        description: "Konu oluşturulurken bir hata oluştu",
        variant: "destructive",
      })
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Yeni Konu Oluştur</CardTitle>
            </CardHeader>
            <CardContent>
              {auth ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error !== "" && <p className="text-red-500">{error}</p>}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Başlık</label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Konu başlığını girin"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bir kategori seçin" />
                      </SelectTrigger>
                      <SelectContent >
                        {categories.length > 0 && categories.map((category) => (
                          <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">İçerik</label>
                    <Tabs defaultValue="edit" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="edit">Düzenle</TabsTrigger>
                        <TabsTrigger value="preview">Önizleme</TabsTrigger>
                      </TabsList>
                      <TabsContent value="edit" className="mt-2">
                        <ReactQuill
                          theme="snow"
                          value={formData.content}
                          onChange={(value) => setFormData({ ...formData, content: value })}
                          modules={modules}
                          formats={formats}
                          placeholder="Konu içeriğini girin"
                          className="bg-white h-full"
                        />
                      </TabsContent>
                      <TabsContent value="preview" className="mt-2">
                        <div className="bg-white border rounded-md p-4 h-full overflow-auto ql-container ql-snow">
                          <div className="ql-editor" dangerouslySetInnerHTML={{ __html: formData.content }} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  <Button type="submit" className="w-full mt-4 disabled:opacity-50" disabled={!auth}>
                    <PlusCircleIcon className="mr-2 h-5 w-5" />
                    Konu Oluştur
                  </Button>
                </form>
              ) : (
                <p className="text-gray-600"> Yeni konu oluşturabilmek için <Link href="/login" className="text-gary-600 underline hover:text-gray-800">giriş yapın</Link>.</p>
              )
              }
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
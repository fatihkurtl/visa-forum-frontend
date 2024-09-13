"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircleIcon } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function CreateThread() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ title, content, category })
    router.push('/threads')
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
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
              <CardTitle className="text-2xl font-bold text-gray-800">Create New Thread</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter thread title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tourist-visa">Tourist Visa</SelectItem>
                      <SelectItem value="student-visa">Student Visa</SelectItem>
                      <SelectItem value="work-visa">Work Visa</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <Tabs defaultValue="edit" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="edit">Edit</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="edit" className="mt-2">
                    <ReactQuill 
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Enter thread content"
                    className="bg-white h-full"
                  />
                    </TabsContent>
                    <TabsContent value="preview" className="mt-2">
                      <div className="bg-white border rounded-md p-4 h-full overflow-auto">
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                <Button type="submit" className="w-full mt-4">
                  <PlusCircleIcon className="mr-2 h-5 w-5" />
                  Create Thread
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
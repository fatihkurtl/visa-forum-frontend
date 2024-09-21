"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SendIcon, InfoIcon } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form gönderme işlemleri burada yapılacak
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="min-w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="min-w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Forum</CardTitle>
            <p className="text-gray-600">Join our community to share your visa appointment experiences and get advice from others.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <InfoIcon className="h-6 w-6 text-blue-600" />
                <p className="text-gray-700">Share your visa appointment tips and tricks.</p>
              </div>
              <div className="flex items-center space-x-2">
                <InfoIcon className="h-6 w-6 text-blue-600" />
                <p className="text-gray-700">Ask questions and get feedback from our members.</p>
              </div>
              <div className="flex items-center space-x-2">
                <InfoIcon className="h-6 w-6 text-blue-600" />
                <p className="text-gray-700">Participate in discussions related to visa processes.</p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" asChild>
                <a href="/forum">Visit the Forum</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

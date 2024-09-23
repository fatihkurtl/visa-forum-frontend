import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, HelpCircle, Mail, MessageCircle, Search } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Help Center</h1>
      <p className="text-gray-600 mb-8">
        Welcome to the VisaConnect Forum Help Center. Here you can find answers to common questions, learn how to use the forum, and get support if you need it.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Search for Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Search help articles..." />
              <Button type="submit">Search</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Can&apos;t find what you&apos;re looking for? Our support team is here to help.</p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I create a new thread?</AccordionTrigger>
              <AccordionContent>
                To create a new thread, navigate to the relevant category page and click on the &apos;New Thread&apos; button. Fill in the title and content of your thread, then click &apos;Post&apos; to publish it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How can I edit my profile?</AccordionTrigger>
              <AccordionContent>
                To edit your profile, click on your avatar in the top right corner and select &apos;Profile Settings&apos;. From there, you can update your personal information, change your avatar, and manage your account settings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What are the forum rules?</AccordionTrigger>
              <AccordionContent>
                Our forum rules include being respectful to other users, not sharing personal information, staying on topic, and not spamming. You can find the full list of rules in our Terms of Service page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I report inappropriate content?</AccordionTrigger>
              <AccordionContent>
                If you come across inappropriate content, click the &apos;Report&apos; button next to the post or thread. Fill in the reason for reporting and our moderation team will review it as soon as possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I delete my account?</AccordionTrigger>
              <AccordionContent>
                Yes, you can delete your account. Go to your account settings and look for the &apos;Delete Account&apos; option. Please note that this action is irreversible and all your data will be permanently removed.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Forum Guide
                </CardTitle>
                <CardDescription>Learn how to use VisaConnect Forum effectively</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Creating and responding to threads</li>
                  <li>Using forum features like search and notifications</li>
                  <li>Best practices for getting helpful responses</li>
                </ul>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/guide">Read the Guide</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  Community Guidelines
                </CardTitle>
                <CardDescription>Understand our community standards</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Respectful communication</li>
                  <li>Sharing accurate visa information</li>
                  <li>Protecting personal information</li>
                </ul>
                <Button className="mt-4" variant="outline" asChild>
                  <Link href="/guidelines">View Guidelines</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Still Need Help?</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact Our Support Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                If you couldn&apos;t find the answer you were looking for, our support team is always ready to assist you.
                Please allow up to 24 hours for a response.
              </p>
              <Button asChild>
                <Link href="/contact">Send a Support Request</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
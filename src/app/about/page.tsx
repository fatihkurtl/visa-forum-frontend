import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, MessageCircle, Award } from "lucide-react"
import Link from "next/link"

const teamMembers = [
    { name: "Jane Smith", role: "Founder & CEO", avatar: "/avatars/jane-smith.jpg" },
    { name: "John Doe", role: "Lead Developer", avatar: "/avatars/john-doe.jpg" },
    { name: "Alice Johnson", role: "Community Manager", avatar: "/avatars/alice-johnson.jpg" },
    { name: "Bob Williams", role: "Visa Specialist", avatar: "/avatars/bob-williams.jpg" },
]

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">About VisaConnect Forum</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-gray-600 mb-4">
                            VisaConnect Forum is dedicated to simplifying the visa application process by connecting applicants with experienced travelers and visa specialists. Our mission is to provide a supportive community where members can share knowledge, experiences, and advice about visa applications for various countries.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                            <div className="flex items-center space-x-2">
                                <Globe className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Global Community</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Expert Advice</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageCircle className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Open Discussions</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Award className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">Verified Information</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-gray-600 mb-4">
                            Founded in 2020, VisaConnect Forum emerged from the personal experiences of our founder, Jane Smith. After facing numerous challenges during her own visa applications, Jane recognized the need for a centralized platform where travelers could share insights and support one another.
                        </p>
                        <p className="text-gray-600 mb-4">
                            What started as a small online community has now grown into a thriving forum with members from over 100 countries. Our dedicated team of moderators and visa specialists work tirelessly to ensure that the information shared on our platform is accurate, up-to-date, and helpful.
                        </p>
                        <p className="text-gray-600">
                            Today, VisaConnect Forum stands as a testament to the power of community-driven support, helping thousands of people navigate the complex world of visa applications with confidence and ease.
                        </p>
                    </CardContent>
                </Card>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Avatar className="h-24 w-24 mx-auto">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardTitle className="text-lg mb-1">{member.name}</CardTitle>
                                <CardDescription>{member.role}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mt-12">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Join Our Community</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">
                            Whether you&apos;re a first-time visa applicant or a seasoned traveler, your experiences and knowledge are valuable to our community. Join VisaConnect Forum today and be part of a global network dedicated to making visa applications easier for everyone.
                        </p>
                        <div className="flex justify-center">
                            <Link href="/register">
                                <Badge className="text-lg py-2 px-4" variant="secondary">
                                    Register Now
                                </Badge>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}
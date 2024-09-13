import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WelcomeCard() {
    return (
        <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800">
                  Welcome to VisaConnect Forum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Share and find visa appointment slots. Help others, get help.
                  Please read our community guidelines before posting.
                </p>
              </CardContent>
            </Card>
    )
}
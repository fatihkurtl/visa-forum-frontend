import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PinIcon } from "lucide-react";
export default function Announcements() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Announcements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center">
            <PinIcon className="h-4 w-4 mr-2 text-red-500" />
            <a href="#" className="text-blue-600 hover:underline">
              New posting guidelines - Please read
            </a>
          </li>
          <li className="flex items-center">
            <PinIcon className="h-4 w-4 mr-2 text-red-500" />
            <a href="#" className="text-blue-600 hover:underline">
              Forum maintenance scheduled for June 15th
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

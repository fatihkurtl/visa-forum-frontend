"use client";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import WelcomeCard from "@/components/app/home/welcome-card";
import AnnouncementsCard from "@/components/app/home/announcements-card";
import ThreadsTabs from "@/components/app/home/threads-tabs";
import Sidebar from "@/layouts/app/sidebar";
import Link from "next/link";

export default function Home() {
  console.log("NEXT .env file => ", process.env.NEXT_PUBLIC_BASE_API_URL);
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <WelcomeCard />

          <AnnouncementsCard />

          <ThreadsTabs />
          <div className="mt-4">
            <Link href="/threads/create">
              <Button>
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                New Thread
              </Button>
            </Link>
          </div>
        </div>
        <div className="md:col-span-1 space-y-6">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

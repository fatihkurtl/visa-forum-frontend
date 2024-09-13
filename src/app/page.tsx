"use client";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import WelcomeCard from "@/components/app/home/welcome-card";
import AnnouncementsCard from "@/components/app/home/announcements-card";
import Threads from "@/components/app/home/threads";
import Sidebar from "@/layouts/app/sidebar";

export default function Component() {
  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <WelcomeCard />

            <AnnouncementsCard />

            <Threads />
            <div className="mt-4">
              <Button>
                <PlusCircleIcon className="mr-2 h-5 w-5" />
                New Thread
              </Button>
            </div>
          </div>
          <div className="md:col-span-1 space-y-6">
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  );
}

"use client";
import ThreadList from "@/components/app/threads/thread-list";
import Sidebar from "@/layouts/app/sidebar";

export default function Threads() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          All Threads - VisaConnect Forum
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <ThreadList />

          <div className="md:col-span-1 space-y-6">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

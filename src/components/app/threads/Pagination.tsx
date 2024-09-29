"use client"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function PaginationComp() {
    return (
        <Pagination className="flex items-center justify-center space-x-2">
            <PaginationContent className="flex items-center space-x-2">
                <PaginationItem>
                    <Link href="#" passHref className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600">
                        <ChevronLeft className="h-4 w-4 inline-flex" />
                        <span>Önceki</span>
                    </Link>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <Link href="#" passHref className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600">
                        <span>Sonraki</span>
                        <ChevronRight className="h-4 w-4 inline-flex" />
                    </Link>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

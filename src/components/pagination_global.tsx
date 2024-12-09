import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface IProps {
    countPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const PaginationGlobal: React.FC<IProps> = ({ countPage, currentPage, setCurrentPage }) => {
    return (
        <Pagination className="flex justify-start py-3">
            <PaginationContent>
                {/* Previous Page Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    />
                </PaginationItem>

                {/* Map dynamic page numbers */}
                {Array.from({ length: countPage }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href="#"
                            onClick={() => setCurrentPage(index + 1)}
                            isActive={currentPage === index + 1}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next Page Button */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => currentPage < countPage && setCurrentPage(currentPage + 1)}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationGlobal;

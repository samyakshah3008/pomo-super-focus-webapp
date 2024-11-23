"use client";

import CardHoverEffect from "@/components/common/card-hover-effect";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/primitives/pagination";
import { fetchTemplatesService } from "@/services/working-framework/working-framework";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StarterTemplates = ({ isGuestUser }: { isGuestUser: boolean }) => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const currentUser = useSelector((state: any) => state?.user?.pomoSuperUser);

  const fetchTemplates = async () => {
    const response = await fetchTemplatesService();
    let fetchedTemplates = response?.data?.data?.frameworkTemplates;
    setTemplates(fetchedTemplates);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  if (!templates?.length) {
    return null;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = templates.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(templates.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!currentUser?._id) {
    return null;
  }

  return (
    <div className="flex flex-col gap-5 align-center justify-center">
      <div className="text-2xl font-bold text-center">
        {currentUser?.isWorkingFrameworkActivated
          ? "Want to change your working framework? Have a look to other options!"
          : "Here are some starter working framework templates!"}
      </div>
      <div>
        <CardHoverEffect
          cardItems={currentItems}
          type="working-framework-sidesheet"
          isGuestUser={isGuestUser}
        />
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={
                currentPage == 1
                  ? () => {}
                  : () => handlePageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={
                currentPage !== totalPages
                  ? () => handlePageChange(currentPage + 1)
                  : () => {}
              }
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default StarterTemplates;

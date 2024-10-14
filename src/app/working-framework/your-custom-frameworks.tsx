import CardHoverEffect from "@/components/common/card-hover-effect";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/primitives/pagination";

interface YourCustomFrameworksProps {
  customTemplates: any[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (pageNumber: number) => void;
  getCustomWorkingFrameworkTemplates: () => void;
}

const YourCustomFrameworks = ({
  customTemplates,
  currentPage,
  totalPages,
  handlePageChange,
  getCustomWorkingFrameworkTemplates,
}: YourCustomFrameworksProps) => {
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = customTemplates.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="text-2xl font-bold">Your Crafted Frameworks: </div>

      {customTemplates.length > 0 ? (
        <>
          <CardHoverEffect
            cardItems={currentItems}
            type="custom-work-framework-sidesheet"
            getCustomWorkingFrameworkTemplates={
              getCustomWorkingFrameworkTemplates
            }
          />

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={
                    currentPage === 1
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
        </>
      ) : (
        <div>
          <div className="text-lg text-center">No custom frameworks found.</div>
        </div>
      )}
    </div>
  );
};

export default YourCustomFrameworks;

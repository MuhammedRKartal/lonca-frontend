import React from "react";
import { Box, Button } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getDisplayedPages = () => {
    const maxVisiblePages = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 2) {
        pages.push(1);
        if (currentPage > 3) pages.push("...");
      }

      const start = Math.max(1, currentPage === 1 ? currentPage : currentPage - 1);
      const end = Math.min(totalPages, currentPage === totalPages ? currentPage : currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
    }
  };

  const displayedPages = getDisplayedPages();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={2}>
      <Button
        sx={{ minWidth: 0 }}
        variant="text"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </Button>

      {displayedPages.map((page, index) => (
        <Button
          sx={{
            minWidth: "0",
            px: typeof page !== "number" ? "0px" : 1,
          }}
          key={index}
          variant={
            typeof page !== "number" ? "text" : page === currentPage ? "contained" : "outlined"
          }
          onClick={() => handlePageClick(page)}
          disabled={typeof page !== "number"}
        >
          {page}
        </Button>
      ))}

      <Button
        sx={{ minWidth: 0 }}
        variant="text"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </Button>
    </Box>
  );
};

export default Pagination;

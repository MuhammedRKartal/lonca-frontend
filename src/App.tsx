import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "./components/Pagination";
import VendorsGrid from "./components/VendorsGrid";
import { VendorType } from "./types";
import { PaginationType } from "./types/interfaces";
import { vendors } from "./urls";
import Header from "./views/layout/Header";

interface VendorsResponse {
  vendors: VendorType[];
  pagination: PaginationType;
}

const App: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [vendorData, setVendorData] = useState<VendorType[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchVendors = useCallback(
    async (page: number) => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await fetch(`${backendUrl}${vendors.getAllVendors}?page=${page}&limit=23`);

        if (response.ok) {
          const data: VendorsResponse = await response.json();

          setVendorData(data.vendors);
          setPagination(data.pagination);
        } else {
          const error = await response.json();

          navigate("/error", { state: { code: error.code, message: error.message } });
        }
      } catch {
        navigate("/error", { state: { message: "An unexpected error occurred." } });
      }
    },
    [navigate]
  );

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);

    fetchVendors(page);
  }, [fetchVendors, searchParams]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() }); // Updates the URL without reloading the page
    fetchVendors(page);
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <Header title={"Vendors List"} />

      <VendorsGrid vendors={vendorData} />
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default App;

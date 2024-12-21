import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination"; // Assuming you have a reusable Pagination component
import VendorDetailsGrid from "../components/VendorDetailsGrid";
import { PaginationType } from "../types/interfaces";
import { orders } from "../urls";

interface SummedOrderDetail {
  productName: string;
  totalItemsSold: number;
  totalPacksSold: number;
  totalMoneyEarned: number;
  totalCogs: number;
}

interface VendorDetailsResponse {
  orders: SummedOrderDetail[];
  pagination: PaginationType;
}

const VendorDetails: React.FC = () => {
  const { vendorName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [data, setData] = useState<SummedOrderDetail[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchVendorDetails = useCallback(
    async (page: number) => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        const response = await fetch(
          `${backendUrl}${orders.getTotalProductsInfoSoldByVendor(vendorName)}?page=${page}&limit=21`
        );

        if (response.ok) {
          const data: VendorDetailsResponse = await response.json();

          setData(data.orders);

          setPagination(data.pagination);
        } else {
          const error = await response.json();

          navigate("/error", { state: { code: error.code, message: error.message } });
        }
      } catch {
        navigate("/error", { state: { message: "An unexpected error occurred." } });
      }
    },
    [vendorName, navigate]
  );

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);

    fetchVendorDetails(page);
  }, [fetchVendorDetails, searchParams]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 } }}>
      <VendorDetailsGrid vendorDetails={data} />
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default VendorDetails;

import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import SalesGraph from "../components/SalesGraph";
import VendorDetailsGrid from "../components/VendorDetailsGrid";
import { OrderDetailsType } from "../types";
import { PaginationType } from "../types/interfaces";
import { orders } from "../urls";
import Header from "../views/layout/Header";

interface VendorDetailsResponse {
  orders: OrderDetailsType[];
  pagination: PaginationType;
}

const VendorDetails: React.FC = () => {
  const { vendorName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [data, setData] = useState<OrderDetailsType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const fetchVendorDetails = useCallback(
    async (page: number) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${orders.getTotalProductsInfoSoldByVendor(vendorName)}?page=${page}&limit=19`
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
      } finally {
        setLoading(false);
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
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: "100%" }}>
      <Header title={`Vendor: ${vendorName} Details`} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          alignItems: { xs: "flex-start" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            mb: { xs: 2, md: 10 },
            width: "100%",
          }}
        >
          <SalesGraph vendorName={vendorName} initialYear="2023" />
        </Box>
        <Box
          sx={{
            flex: { xs: 1, md: 1.35 },
            width: "100%",
          }}
        >
          <VendorDetailsGrid vendorDetails={data} loading={loading} />
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default VendorDetails;

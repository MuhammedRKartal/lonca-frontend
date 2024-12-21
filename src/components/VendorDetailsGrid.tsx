import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { OrderDetailsType } from "../types";
import { Loading } from "../views/scenes/Loading";

interface VendorDetailsProps {
  vendorDetails: OrderDetailsType[];
  loading: boolean;
}

const VendorDetailsGrid = ({ vendorDetails, loading }: VendorDetailsProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    p: isMobile ? "0.75rem" : "1rem",
                  }}
                >
                  Product Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    p: isMobile ? "0.75rem" : "1rem",
                  }}
                >
                  Total Packs Sold
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    p: isMobile ? "0.75rem" : "1rem",
                  }}
                >
                  Total Items Sold
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    p: isMobile ? "0.75rem" : "1rem",
                  }}
                >
                  Total Cogs
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    p: isMobile ? "0.75rem" : "1rem",
                  }}
                >
                  Total Money Earned
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendorDetails?.map((detail: OrderDetailsType) => (
                <TableRow sx={{ py: 1 }} key={detail?.productName}>
                  <TableCell
                    sx={{
                      py: 1,
                      p: isMobile ? "0.75rem" : "1rem",
                    }}
                  >
                    {detail?.productName}
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 1,
                      p: isMobile ? "0.75rem" : "1rem",
                    }}
                  >
                    {detail?.totalPacksSold}
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 1,
                      p: isMobile ? "0.75rem" : "1rem",
                    }}
                  >
                    {detail?.totalItemsSold}
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 1,
                      p: isMobile ? "0.75rem" : "1rem",
                    }}
                  >
                    {detail?.totalCogs}
                  </TableCell>
                  <TableCell
                    sx={{
                      py: 1,
                      p: isMobile ? "0.75rem" : "1rem",
                    }}
                  >
                    {detail?.totalMoneyEarned}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default React.memo(VendorDetailsGrid);

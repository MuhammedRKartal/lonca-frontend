import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { OrderDetailsType } from "../types";
import { Loading } from "../views/scenes/Loading";

interface VendorDetailsProps {
  vendorDetails: OrderDetailsType[];
  loading: boolean;
}

const VendorDetailsGrid = ({ vendorDetails, loading }: VendorDetailsProps) => {
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Packs Sold</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Items Sold</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Cogs</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Total Money Earned</TableCell>

                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendorDetails?.map((detail: OrderDetailsType) => (
                <TableRow sx={{ py: 1 }} key={detail?.productName}>
                  <TableCell sx={{ py: 1 }}>{detail?.productName}</TableCell>
                  <TableCell sx={{ py: 1 }}>{detail?.totalPacksSold}</TableCell>
                  <TableCell sx={{ py: 1 }}>{detail?.totalItemsSold}</TableCell>
                  <TableCell sx={{ py: 1 }}>{detail?.totalCogs}</TableCell>
                  <TableCell sx={{ py: 1 }}>{detail?.totalMoneyEarned}</TableCell>
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

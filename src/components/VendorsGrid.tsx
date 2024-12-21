import React from "react";
import { Visibility } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { VendorType } from "../types";

interface VendorProps {
  vendors: VendorType[];
}

const VendorsGrid = ({ vendors }: VendorProps) => {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors?.map((vendor: VendorType) => (
            <TableRow key={vendor?._id} sx={{ py: 1 }}>
              <TableCell sx={{ py: 1 }}> {vendor?.name}</TableCell>
              <TableCell sx={{ textAlign: "right", py: 1, pr: 4 }}>
                <IconButton onClick={() => navigate(`/vendors/${vendor?.name}`)} size="small">
                  <Visibility fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(VendorsGrid);

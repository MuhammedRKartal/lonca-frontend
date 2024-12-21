import React from "react";
import { Home } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        mb: 2,
      }}
    >
      <IconButton href="/">
        <Home color="success" fontSize="large"></Home>
      </IconButton>

      <Typography variant="h4" color="success" sx={{ fontWeight: "bold", pr: 2 }}>
        {props.title}
      </Typography>
    </Box>
  );
};

export default Header;

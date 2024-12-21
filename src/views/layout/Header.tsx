import React from "react";
import { Home } from "@mui/icons-material";
import { Box, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        <Home color="success" fontSize="large" />
      </IconButton>

      <Typography
        variant={isMobile ? "h6" : "h4"}
        color="success"
        sx={{ fontWeight: "bold", pr: 2, textAlign: "right" }}
      >
        {props.title}
      </Typography>
    </Box>
  );
};

export default Header;

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Top Bar for navigation through pages

function TopBar() {
  const navigate = useNavigate();

  function handleClickPricingHistory() {
    navigate("/");
  }

  function handleClickMyPortfolio() {
    navigate("/MyPortfolio");
  }

  return (
    <CssBaseline>
      <AppBar position="static" component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Cryptocurrency Dashboard
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              key="PricingHistoryButton"
              variant="text"
              color="inherit"
              onClick={handleClickPricingHistory}
            >
              Pricing History
            </Button>
            <Button
              key="MyPortfolioButton"
              variant="text"
              color="inherit"
              onClick={handleClickMyPortfolio}
            >
              My Portfolio
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </CssBaseline>
  );
}

export default TopBar;

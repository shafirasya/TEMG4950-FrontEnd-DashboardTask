import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import TransactionForm from "../Components/TransactionForm";
import TopBar from "../Components/TopBar";

function MyPortfolio() {
  return (
    <CssBaseline>
      <TopBar />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Card>
          <CardHeader title="My Portfolio" />
          <CardContent>
            {/* Transaction Form */}
            <TransactionForm />
          </CardContent>
        </Card>
      </Box>
    </CssBaseline>
  );
}

export default MyPortfolio;

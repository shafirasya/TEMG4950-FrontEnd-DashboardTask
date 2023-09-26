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
import PricingGraph from "../Components/PricingGraph";
import TopBar from "../Components/TopBar";

// Pricing History page, consist of time period options & graph

function PricingHistory() {
  // const [timeFrame, setChosenTimeFrame] = useState("Daily");

  // function handleChangeTimeFrame(event) {
  //   setChosenTimeFrame(event.target.value);
  // }

  return (
    <CssBaseline>
      <TopBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >
        <Card>
          <CardHeader title="Pricing History" />

          <CardContent>
            {/* History Graph */}
            <PricingGraph />
          </CardContent>
        </Card>
      </Box>
    </CssBaseline>
  );
}

export default PricingHistory;

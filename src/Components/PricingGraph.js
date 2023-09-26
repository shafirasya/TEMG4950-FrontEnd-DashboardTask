import {
  Card,
  CardContent,
  Typography,
  Stack,
  Autocomplete,
  TextField,
  Checkbox,
  Grid,
  Button,
} from "@mui/material";
import Papa from "papaparse";
import BinanceCoin_Data from "../Components/Data/data_BinanceCoin.csv";
import Cardano_Data from "../Components/Data/data_Cardano.csv";
import ChainLink_Data from "../Components/Data/data_ChainLink.csv";
import EOS_Data from "../Components/Data/data_EOS.csv";
import Tron_Data from "../Components/Data/data_Tron.csv";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const cryptoList = ["BinanceCoin", "Cardano", "ChainLink", "EOS", "Tron"];
const cryptoDataMap = {
  BinanceCoin: BinanceCoin_Data,
  Cardano: Cardano_Data,
  ChainLink: ChainLink_Data,
  EOS: EOS_Data,
  Tron: Tron_Data,
};
const timeMap = {
  Daily: "Close",
  Quarterly: "QuarterlyClose",
  Yearly: "YearlyClose",
};

function TimeOptionsButton({ time, functionUpdate }) {
  return (
    <Grid container justifyContent="center" columnSpacing={2}>
      <Grid item xs={2}>
        <Button
          value="Daily"
          variant={time === "Daily" ? "contained" : "outlined"}
          fullWidth
          onClick={functionUpdate}
        >
          Daily
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          value="Quarterly"
          variant={time === "Quarterly" ? "contained" : "outlined"}
          fullWidth
          onClick={functionUpdate}
        >
          Quarterly
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          value="Yearly"
          variant={time === "Yearly" ? "contained" : "outlined"}
          fullWidth
          onClick={functionUpdate}
        >
          Yearly
        </Button>
      </Grid>
    </Grid>
  );
}

function PricingGraph() {
  const [timeFrame, setChosenTimeFrame] = useState("Daily");

  function handleChangeTimeFrame(event) {
    setChosenTimeFrame(event.target.value);
  }

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const chartOptions = {
    chart: {
      type: "line",
      stacked: true,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    title: {
      text: "Price History",
      align: "left",
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
      categories: chartData.labels,
    },
    tooltip: {
      shared: true,
      //   tooltip: {
      //     y: [
      //       {
      //         title: {
      //           formatter: function (val) {
      //             return val.toFixed(2);
      //           },
      //         },
      //       },
      //       {
      //         title: {
      //           formatter: function (val) {
      //             return val + " per session";
      //           },
      //         },
      //       },
      //       {
      //         title: {
      //           formatter: function (val) {
      //             return val;
      //           },
      //         },
      //       },
      //     ],
      //   },
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  useEffect(() => {
    setChosenTimeFrame("Daily");
  }, []);

  useEffect(() => {
    const shownCryptoDatasets = [];
    const chosenTime = timeMap[timeFrame];

    console.log(cryptoList);

    cryptoList.forEach((crypto) => {
      const cryptoData = cryptoDataMap[crypto];

      Papa.parse(cryptoData, {
        download: true,
        header: true,
        dynamicTyping: true,
        delimiter: ",",
        complete: (result) => {
          const data = result.data;
          const retrievedData = data.slice(data.length - 1374, data.length - 1);
          console.log(retrievedData);
          const labels = retrievedData.map((item) => {
            const date = new Date(item.Date);
            return date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          });
          const prices = retrievedData.map((item) => item[chosenTime]);

          shownCryptoDatasets.push({
            name: crypto,
            data: prices,
          });

          if (shownCryptoDatasets.length === cryptoList.length) {
            setChartData({
              labels: labels,
              datasets: shownCryptoDatasets,
            });

            console.log(chartData);
          }
        },
      });
    });
  }, [timeFrame]);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          {/* Button Time Frame Options */}
          <TimeOptionsButton
            time={timeFrame}
            functionUpdate={handleChangeTimeFrame}
          />
          <ReactApexChart
            type="line"
            options={chartOptions}
            series={chartData.datasets}
            height="400"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PricingGraph;

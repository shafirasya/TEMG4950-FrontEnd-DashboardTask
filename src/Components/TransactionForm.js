import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  MenuItem,
  Dialog,
  Box,
  TextField,
  Stack,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const cryptoList = ["BinanceCoin", "Cardano", "ChainLink", "EOS", "Tron"];

const transactionEntryKey = "listTransaction";

const columnTransactionData = [
  {
    field: "cryptoCode",
    headerName: "Cryptocurrency Code",
    flex: 1,
    align: "left",
  },
  {
    field: "transactionDate",
    headerName: "Date of Transaction",
    type: "date",
    //valueGetter: (params) => new Date(params.getValue("transactionDate")),
    flex: 1,
    align: "left",
  },
  {
    field: "transactionType",
    headerName: "Buy/Sell",
    flex: 1,
    align: "left",
  },
  {
    field: "transactionAmount",
    headerName: "Amount in Cryptocurrency Units",
    type: "number",
    flex: 1,
    align: "left",
  },
];

const transactionDataList = [
  {
    transactionID: 1,
    cryptoCode: "BinanceCoin",
    transactionDate: new Date(2023, 7, 15),
    transactionType: "Buy",
    transactionAmount: 100,
  },
  {
    transactionID: 2,
    cryptoCode: "Cardano",
    transactionDate: new Date(2023, 7, 20),
    transactionType: "Sell",
    transactionAmount: 50,
  },
  {
    transactionID: 3,
    cryptoCode: "EOS",
    transactionDate: new Date(2023, 8, 10),
    transactionType: "Buy",
    transactionAmount: 20,
  },
];

function NewTransactionField({
  newTransactionData,
  handleNewTransactionSubmissionFunction,
  handleInputChangeFunction,
  handleCancelFunction,
}) {
  return (
    <Box sx={{ paddingX: 2 }}>
      {/* Crypto Option */}
      <Stack spacing={2}>
        <Stack>
          <Typography variant="subtitle2">Cryptocurrency Code</Typography>
          <TextField
            name="cryptoCode"
            select
            value={newTransactionData["cryptoCode"]}
            onChange={handleInputChangeFunction}
            fullWidth
          >
            {cryptoList.map((crypto) => (
              <MenuItem key={crypto} value={crypto}>
                {crypto}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
        <Stack>
          <Typography variant="subtitle2">Buy/Sell</Typography>
          <TextField
            name="transactionType"
            select
            value={newTransactionData["transactionType"]}
            onChange={handleInputChangeFunction}
            fullWidth
          >
            <MenuItem value="Buy">Buy</MenuItem>
            <MenuItem value="Sell">Sell</MenuItem>
          </TextField>
        </Stack>
        <Stack>
          <Typography variant="subtitle2">
            Amount in Cryptocurrency Units
          </Typography>
          <TextField
            name="transactionAmount"
            type="number"
            value={newTransactionData["transactionAmount"]}
            onChange={handleInputChangeFunction}
            fullWidth
          />
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle2">Transaction Date</Typography>
          <Typography>
            {new Date().toLocaleDateString().split("T")[0]}
          </Typography>
          {/* <TextField
            name="transactionDate"
            //type="date"
            value={new Date().toISOString().split("T")[0]}
            fullWidth
            contentEditable={false}
          /> */}
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button
            type="submit"
            onClick={handleNewTransactionSubmissionFunction}
            sx={{ minWidth: 200 }}
            variant="contained"
          >
            Submit Transaction
          </Button>
          <Button
            onClick={handleCancelFunction}
            sx={{ minWidth: 200 }}
            variant="outlined"
          >
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

function TransactionForm() {
  const [transactionData, setTransactionData] = useState([]);
  const [openTransactionForm, setOpenTransactionForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    transactionID: "",
    cryptoCode: "",
    transactionDate: new Date(),
    transactionType: "",
    transactionAmount: "",
  });

  function DataEntry() {
    return (
      <DataGrid
        rows={transactionData}
        columns={columnTransactionData}
        disableRowSelectionOnClick
        getRowId={(row) => row.transactionID}
      />
    );
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  }

  function handleNewTransaction(event) {
    const newTransactionRecord = {
      ...newTransaction,
      transactionID: transactionData.length + 1,
      transactionDate: new Date(),
    };

    //setNewTransaction(newTransactionRecord);
    setTransactionData([...transactionData, newTransactionRecord]);
    setNewTransaction({
      transactionID: "",
      cryptoCode: "",
      transactionDate: new Date(),
      transactionType: "",
      transactionAmount: "",
    });
    setOpenTransactionForm(false);
  }

  function cancelAddTransaction() {
    setOpenTransactionForm(false);
  }

  // Initialize Transaction Data
  useEffect(() => {
    const newData = localStorage.getItem(transactionEntryKey);
    const parsedData = JSON.parse(newData);
    console.log("data:", parsedData);

    if (parsedData && parsedData.length) {
      const transformedData = parsedData.map((transaction) => ({
        ...transaction,
        transactionDate: new Date(transaction.transactionDate),
      }));
      setTransactionData(transformedData);
      console.log("read");
    } else {
      setTransactionData(transactionDataList);
      console.log("here new data");
    }
  }, []);

  //Save transaction data
  useEffect(() => {
    if (transactionData && transactionData.length) {
      localStorage.setItem(
        transactionEntryKey,
        JSON.stringify(transactionData)
      );
      const newData = localStorage.getItem(transactionEntryKey);
      console.log("New Transaction Added", newData);
    }
  }, [transactionData]);

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Typography variant="h6">Transaction Record</Typography>
            <Button
              onClick={() => setOpenTransactionForm(true)}
              variant="contained"
              maxWidth={200}
            >
              Add Transaction
            </Button>
          </Stack>
          <Dialog
            open={openTransactionForm}
            onClose={cancelAddTransaction}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>New Transaction</DialogTitle>
            <DialogContent>
              <NewTransactionField
                handleCancelFunction={cancelAddTransaction}
                handleInputChangeFunction={handleInputChange}
                handleNewTransactionSubmissionFunction={handleNewTransaction}
                newTransactionData={newTransaction}
              />
            </DialogContent>
          </Dialog>
          <DataEntry />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TransactionForm;

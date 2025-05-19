import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const receiptData = [
  {
    name: "John Doe",
    uhid: "UH123456",
    orderNumber: "ORD001",
    amount: 250.0,
    status: "Paid Receipts",
  },
  {
    name: "Alice Smith",
    uhid: "UH234567",
    orderNumber: "ORD002",
    amount: 120.5,
    status: "Pending Receipts",
  },
  {
    name: "Michael Johnson",
    uhid: "UH345678",
    orderNumber: "ORD003",
    amount: 460.0,
    status: "Overdue Receipts",
  },
  {
    name: "Emma Brown",
    uhid: "UH456789",
    orderNumber: "ORD004",
    amount: 310.75,
    status: "Paid Receipts",
  },
  {
    name: "David Wilson",
    uhid: "UH567890",
    orderNumber: "ORD005",
    amount: 89.99,
    status: "Pending Receipts",
  },
  {
    name: "Olivia Davis",
    uhid: "UH678901",
    orderNumber: "ORD006",
    amount: 512.3,
    status: "Overdue Receipts",
  },
  {
    name: "William Martinez",
    uhid: "UH789012",
    orderNumber: "ORD007",
    amount: 199.0,
    status: "Paid Receipts",
  },
  {
    name: "Sophia Garcia",
    uhid: "UH890123",
    orderNumber: "ORD008",
    amount: 340.45,
    status: "Pending Receipts",
  },
  {
    name: "James Rodriguez",
    uhid: "UH901234",
    orderNumber: "ORD009",
    amount: 105.2,
    status: "Overdue Receipts",
  },
  {
    name: "Mia Lee",
    uhid: "UH012345",
    orderNumber: "ORD010",
    amount: 275.0,
    status: "Paid Receipts",
  },
];

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    maxWidth: 600,
  },
}));

const StyledListItem = styled("li")({
  listStyle: "none",
  width: "100%",
});

const BillDashboard = () => {
  const statusOptions = [
    { title: "All Receipts", count: 6, color: "#4CAF50" },
    { title: "Pending Receipts", count: 3, color: "#2196F3" },
    { title: "Paid Receipts", count: 2, color: "#FFC107" },
    { title: "Overdue Receipts", count: 1, color: "#F44336" },
  ];

  return (
    <div className="billDashboard">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          px: 2,
        }}
      >
        {statusOptions.map((item, index) => {
          return (
            <Card
              key={index}
              sx={{
                p: 2,
                flex: "1 1 calc(25% - 16px)",
                minWidth: { xs: "100%", sm: "45%", md: "22%" },
                color: (theme) => `0 4px 8px ${theme.palette.info.light}`,
                borderRadius: 2,
                textAlign: "center",
                boxShadow: (theme) => `0 0 2px ${item.color}`,
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: (theme) => `0 4px 8px ${item.color}`,
                },
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {item.title}
              </Typography>
              <Typography variant="h6">{item.count}</Typography>
            </Card>
          );
        })}
      </Box>

      <hr></hr>

      <Box sx={{ marginRight: "10px" }}>
        <Grid container spacing={2}>
          {receiptData &&
            receiptData.map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      margin: "5px",
                      width: "100%",
                      borderRadius: 4,
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#fff",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                      },
                    }}
                  >
                    <CardContent sx={{ paddingBottom: 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ marginRight: 2 }}>
                          <Avatar
                            src="/assets/displayPictureIcon.png"
                            sx={{
                              width: 80,
                              height: 80,
                              border: "4px solid #fff",
                              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                        </Box>
                        <Box>
                          <Typography fontWeight="bold" variant="h5">
                            Deneshwara Sai Ila
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.uhid} | M | 25 |
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body1" fontWeight="bold">
                          Order Details
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Order Number:
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {item.orderNumber}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Amount:
                          </Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {item.amount}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Status:
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color:
                                item.status === "Success"
                                  ? "green"
                                  : item.status === "Failed"
                                  ? "red"
                                  : "orange",
                              fontWeight: "bold",
                            }}
                          >
                            {item.status}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions
                      sx={{
                        justifyContent: "space-between",
                        padding: 2,
                        backgroundColor: "#f7f7f7",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          width: "45%",
                          backgroundColor: "#4CAF50",
                          "&:hover": {
                            backgroundColor: "#3e8e41",
                          },
                        }}
                      >
                        Go To Order
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          width: "45%",
                          backgroundColor: "#2196F3",
                          "&:hover": {
                            backgroundColor: "#1976D2",
                          },
                        }}
                      >
                        Go to Bill
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </div>
  );
};

export default BillDashboard;

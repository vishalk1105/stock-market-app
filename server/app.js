// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
  const allowedOrigins = ["http://localhost:3000"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.enable("trust proxy");

app.post("/api/fetchStockData", async (req, res) => {
  try {
    const stockName = req.body.stockName;
    const inputDate = req.body.inputDate;
    if (stockName?.length === 0 || inputDate?.length === 0) {
      res.status(400).send({ status: false, message: "Enter valid Data" });
    } else if (!stockName || !inputDate) {
      res.status(400).send({ status: false, message: "Invalid Input" });
    } else {
      const dataApi = await axios.get(
        `https://api.polygon.io/v2/aggs/ticker/${stockName}/range/1/day/${inputDate}/${inputDate}?apiKey=N0FxbxD3Y3soSxF3HvdDGv6W3dXcBOOo`
      );

      const result = dataApi.data.results;
      if (result === undefined || !result || result.length === 0) {
        res.status(400).send({ message: "No Data" });
      } else {
        const requiredData = result?.map(({ o, c, h, l, v }) => ({
          o,
          c,
          h,
          l,
          v,
        }));
        res
          .status(200)
          .send({ values: requiredData, ticker: dataApi.data.ticker });
      }
    }
  } catch (error) {
    res.send(error);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

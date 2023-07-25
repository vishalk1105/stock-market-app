import React, { useState } from "react";
import axios from "axios";
const InputForm = ({ setGetData, setHttpError }) => {
  const [stockName, setStockName] = useState("");
  const [stockDate, setStockDate] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ stockName: stockName, inputDate: stockDate });
    axios
      .post("http://localhost:5000/api/fetchStockData", {
        stockName: stockName,
        inputDate: stockDate,
      })
      .then((response) => {
        setGetData(response.data);
        console.log("response", response);
      })
      .catch((error) => setHttpError(error.response.data.message));

    setStockName("");
    setStockDate("");
  };

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setStockName(e.target.value)}
            value={stockName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            onChange={(e) => setStockDate(e.target.value)}
            value={stockDate}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default InputForm;

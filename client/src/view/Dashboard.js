import React, { useState } from "react";
import InputForm from "../component/InputForm";
import List from "../component/List";

const Dashboard = () => {
  const [getData, setGetData] = useState([]);
  const [httpError, setHttpError] = useState("");
  return (
    <div>
      <InputForm setGetData={setGetData} setHttpError={setHttpError} />
      <List getData={getData} httpError={httpError} />
    </div>
  );
};

export default Dashboard;

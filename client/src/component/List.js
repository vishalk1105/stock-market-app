import React from "react";

const List = ({ getData, httpError }) => {
  console.log(httpError);
  return (
    <div className="list_container">
      <h2>List Data Container</h2>
      <h4 className="list_ticker">{getData?.ticker}</h4>
      {!httpError && getData?.values !== 0 && getData.values !== undefined ? (
        <ul className="list">
          <li>Opening:{getData?.values[0]?.o} </li>
          <li>Closing:{getData?.values[0]?.c} </li>
          <li>High:{getData?.values[0]?.h} </li>
          <li>Low: {getData?.values[0]?.l}</li>
          <li>Volume: {getData?.values[0]?.v}</li>
        </ul>
      ) : (
        <div> {httpError}</div>
      )}
    </div>
  );
};

export default List;

import React, { useState, useCallback } from "react";
import "./style.css";

const debounce = (fn, timer) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, timer);
  };
};

const token = JSON.parse(localStorage.getItem("token"));

function Search() {
  const [searchKey, setSearchKey] = useState("");
  const [stockData, setData] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchKey(value);
  };

  const handleKeyPress = useCallback(
    debounce((searchKey) => {
      if (searchKey) {
        fetch(`http://3.108.225.220:5000/api/data?search_string=${searchKey}`, {
          headers: { "user-access-token": token },
        })
          .then((data) => data.json())
          .then((jsonData) => {
            setData(jsonData);
          });
      }
    }, 400),
    []
  );

  return (
    <div className="search-wrp">
      <input
        onChange={handleChange}
        value={searchKey}
        placeholder={"Seach stocks...."}
        onKeyUp={() => handleKeyPress(searchKey)}
      />
      <div className="search-results">
        {stockData.map((data, index) => (
          <div
            key={`${data[0]}${data[1]}${data[2]}${index}`}
            className="stocks-wrp"
          >
            <span>{data[0]}</span>
            <span>{data[1]}</span>
            <span>{data[2]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

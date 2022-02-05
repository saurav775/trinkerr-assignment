import React, { useEffect } from "react";

const token = JSON.parse(localStorage.getItem("token"));
function UserDataForm() {
  useEffect(() => {
    fetch(`http://3.108.225.220:5000/api/data`, {
      method: "POST",
      headers: { "user-access-token": token },
      body: JSON.stringify([
        "test",
        Number(parseFloat(30.0).toFixed(2)),
        Number(parseFloat(30.0).toFixed(2)),
      ]),
    })
      .then((data) => data.json())
      .then((jsonData) => {
        console.log(jsonData);
      });
  }, []);
  return <div>UserData</div>;
}

export default UserDataForm;

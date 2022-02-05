import { useEffect } from "react";
import { Search, UserDataForm } from "./components";
import "./App.css";

function App() {
  useEffect(() => {
    const authToken = JSON.parse(localStorage.getItem("token"));
    if (!authToken) {
      fetch("http://3.108.225.220:5000/api/user-access-token")
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          localStorage.setItem("token", JSON.stringify(responseJson.token));
        });
    }
  }, []);

  return (
    <div className="App">
      <Search />
      <UserDataForm />
    </div>
  );
}

export default App;

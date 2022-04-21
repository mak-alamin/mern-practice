import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  return <div className="App">
    <h1>Users: {users.length}</h1>
  </div>;
}

export default App;

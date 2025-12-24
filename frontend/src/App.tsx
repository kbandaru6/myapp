// src/App.tsx
import { useState } from "react";
import { Login } from "./components/Login/Login";
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem("jwt"));

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("jwt", token);
    setJwt(token);
  };

  return (
    <div className="App">
      {!jwt ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard jwt={jwt} />
      )}
    </div>
  );
}

export default App;

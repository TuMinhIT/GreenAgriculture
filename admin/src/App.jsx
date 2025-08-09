import DashboardLayout from "./pages/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

function App() {
  const [token, setToken] = useState("admin");
  return (
    <>
      {token ? (
        <DashboardLayout />
      ) : (
        <LoginPage token={token} setToken={setToken} />
      )}
    </>
  );
}

export default App;

import { ShopContext } from "./context/ShopContext";
import DashboardLayout from "./pages/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";

function App() {
  const { token, setToken } = useContext(ShopContext);
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

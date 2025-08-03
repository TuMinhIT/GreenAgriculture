import Footer from "./components/Footer";
import Header from "./components/header/Header";

import { AppContext } from "./context/AppContext";
import { useContext } from "react";
import ContactInfo from "./components/contactInfo";
import Routers from "./Routers";
import { ToastContainer } from "react-toastify";
const App = () => {
  const { state } = useContext(AppContext);
  return (
    <div>
      <ContactInfo />
      <Header />
      <ToastContainer />
      <Routers />
      <Footer />
    </div>
  );
};

export default App;

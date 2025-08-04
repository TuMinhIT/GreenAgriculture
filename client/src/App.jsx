import Footer from "./components/Footer";
import Header from "./components/header/Header";

import ContactInfo from "./components/contactInfo";
import Routers from "./Routers";
import { ToastContainer } from "react-toastify";
const App = () => {
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

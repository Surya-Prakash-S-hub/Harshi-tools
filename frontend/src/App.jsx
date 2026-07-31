import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/SourceFiled";
import About from "./components/pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/pages/Notfound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="bottom-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

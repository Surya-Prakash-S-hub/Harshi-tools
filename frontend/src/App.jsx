import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/SourceFiled";
import About from "./components/pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFound from "./components/pages/Notfound";
import BatchConversion from "./components/pages/BatchConversion";
import ResizeImage from "./components/pages/ResizeImage";
import CompressImage from "./components/pages/CompressImage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer position="top-left" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/batch-conversion" element={<BatchConversion />} />
          <Route path="/resize-image" element={<ResizeImage />} />
          <Route path="/compress-image" element={<CompressImage />} />
          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

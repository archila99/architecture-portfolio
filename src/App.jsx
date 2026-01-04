import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Architecture from "./pages/Architecture";
import Landscape from "./pages/Landscape";
import Interior from "./pages/Interior";
import AllProjects from "./pages/AllProjects";
import News from "./pages/News";
import People from "./pages/People";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/landscape" element={<Landscape />} />
            <Route path="/interior" element={<Interior />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/news" element={<News />} />
            <Route path="/people" element={<People />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

import "./App.css";
import Onboarding from "./pages/Onboarding.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

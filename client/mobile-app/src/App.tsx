import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { VoiceSummary } from "./pages/VoiceSummary";
import Home from "./pages/Home";
import { Recommendations } from "./pages/Recommendations";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voice-summary" element={<VoiceSummary />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

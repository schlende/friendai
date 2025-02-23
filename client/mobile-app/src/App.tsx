import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { VoiceSummary } from "./pages/VoiceSummary";
import Home from "./pages/Home";
import { Recommendations } from "./pages/Recommendations";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/voice-summary" element={<VoiceSummary />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

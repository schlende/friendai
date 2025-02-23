import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import { VoiceSummary } from "./pages/VoiceSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VoiceSummary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

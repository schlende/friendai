import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/voice-summary")}>Voice Summary</button>
      <button onClick={() => navigate("/recommendations")}>
        Recommendations
      </button>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export const Recommendations = () => {
  const navigate = useNavigate();
  return (
    <div>
      Recommendations
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

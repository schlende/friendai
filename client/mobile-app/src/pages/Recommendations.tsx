import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Recommendations = () => {
  const [suggestions] = useState<string[]>(["1", "2", "3"]);
  const navigate = useNavigate();
  return (
    <div style={{ height: "100vh", padding: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{ alignSelf: "flex-end", backgroundColor: "transparent" }}
        >
          Back
        </button>
        <div
          style={{
            fontSize: "18px",
            color: "rgba(102, 98, 102, 1)",
          }}
        >
          Great! Here are a few options for a fun hangout:
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {suggestions.map((suggestion) => (
            <div
              key={suggestion}
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

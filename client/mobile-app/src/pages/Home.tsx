import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, rgba(232, 248, 247, 1) 0%, rgba(251, 242, 252, 1) 100%)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        <img
          src="/src/assets/friend-ai-logo.svg"
          alt="Friend AI Logo"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <div style={{ width: "100vw" }}>
        <img
          src="/src/assets/my-circles-image.png"
          alt="My Circles"
          width="100%"
        />
      </div>
      <div style={{ paddingInline: "50px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            backgroundColor: "white",
            padding: "28px 32px",
            borderRadius: "16px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <img
              src="/src/assets/avatar2.png"
              alt="Avatar 2"
              style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            />
            <div style={{ color: "black", flex: 1 }}>
              You met{" "}
              <span style={{ color: "rgba(0, 155, 146, 1)" }}>Forest</span> last
              week while walking your dog. Want to hang out again soon?
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                color: "black",
                padding: "10px 20px",
                borderRadius: "40px",
                border: "1px solid rgba(0, 0, 0, 0.5)",
              }}
              onClick={() => navigate("/voice-summary")}
            >
              Dismiss
            </button>
            <button
              style={{
                flex: 1,
                backgroundColor: "rgba(241, 116, 255, 1)",
                color: "white",
                padding: "10px 20px",
                borderRadius: "40px",
              }}
              onClick={() => navigate("/recommendations")}
            >
              Arrange
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

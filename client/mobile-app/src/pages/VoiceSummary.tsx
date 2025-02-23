import { useNavigate } from "react-router-dom";

export const VoiceSummary = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "300%",
            height: "100%",
          }}
        >
          <source src="/src/assets/wave-form-final.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(105.81deg, #F9C1FF 14.82%, #6CFFF6 80.65%)",
            mixBlendMode: "lighten",
            pointerEvents: "none",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "40px",
          gap: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src="/src/assets/friend-ai-logo.svg"
          alt="Friend AI Logo"
          style={{ width: "100px", height: "100px" }}
        />
        <div
          style={{
            color: "black",
            fontWeight: 800,
            fontSize: "48px",
            lineHeight: "50px",
          }}
        >
          Daily Summary
        </div>
        <div
          style={{
            color: "black",
            fontWeight: 600,
            width: "60%",
            fontSize: "18px",
          }}
        >
          From your personal friendship assistant
        </div>
        <div>
          <button
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "black",
              padding: "10px 20px",
              borderRadius: "40px",
              height: "50px",
              width: "150px",
              border: "1.5px solid",
              borderImage: "none",
              borderColor:
                "linear-gradient(105.81deg, #F9C1FF 14.82%, #6CFFF6 80.65%)",
            }}
            onClick={() => navigate("/")}
          >
            My Friends
          </button>
        </div>
      </div>
    </div>
  );
};

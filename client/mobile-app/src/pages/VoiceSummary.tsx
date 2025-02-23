export const VoiceSummary = () => {
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
      <div style={{ position: "absolute", top: 0, left: 0, padding: "20px" }}>
        <img
          src="/src/assets/friend-ai-logo.svg"
          alt="Friend AI Logo"
          style={{ width: "100px", height: "100px" }}
        />
        <div style={{ color: "black", fontWeight: 800, fontSize: "48px" }}>
          Daily Summary
        </div>
        <div style={{ color: "black", fontWeight: 400 }}>
          From your personal friendship assistant
        </div>
        <button
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            color: "black",
            padding: "10px 20px",
            borderRadius: "20px",
          }}
        >
          My Friends
        </button>
      </div>
    </div>
  );
};

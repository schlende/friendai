import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const friendAiUrl = "https://friendai.pages.dev/api/recommendation";
export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState<
    {
      id: number;
      userId: string;
      friendId: number;
      friend: {
        id: number;
        name: string;
        howwemet: string;
        birthday: string;
        interests: string;
        lastRecommended: string;
        priority: string;
      };
      reason: string;
      datetime: string;
      actionDate: string;
      status: string;
      recommendations: {
        idea: string;
        reason: string;
      }[];
    }[]
  >([]);

  useEffect(() => {
    const fetchFriendAi = async () => {
      setIsLoading(true);
      const response = await fetch(friendAiUrl);
      const data = await response.json();
      console.log(data);
      setFriends(data.recommendations ?? []);
      setIsLoading(false);
    };
    fetchFriendAi();
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <div className="slider">
          <div className="slides" style={{ paddingInline: "50px" }}>
            {friends.map((slide) => (
              <div
                key={slide.id}
                id={`slide-${slide.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  backgroundColor: "white",
                  padding: "28px 32px",
                  borderRadius: "16px",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", gap: "10px" }}>
                  <img
                    src="/src/assets/avatar2.png"
                    alt="Avatar 2"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                    }}
                  />
                  <div style={{ color: "black", textAlign: "start" }}>
                    Want to hang out with{" "}
                    <span style={{ color: "rgba(0, 155, 146, 1)" }}>
                      {slide.friend.name}
                    </span>
                    {"? You met "}
                    {slide.friend.howwemet.toLocaleLowerCase()}
                    {". "}
                    Would you want to{" "}
                    {slide.recommendations[0].idea?.toLowerCase()}?{" "}
                    {capitalizeFirstLetter(slide.recommendations[1].reason)}
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
                    onClick={() => navigate(`/recommendation/${slide.id}`)}
                  >
                    Arrange
                  </button>
                </div>
              </div>
            ))}
          </div>
          å
        </div>
      )}
    </div>
  );
}

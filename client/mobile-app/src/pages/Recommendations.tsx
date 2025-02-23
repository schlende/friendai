import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "./components/Modal";

const MessageModal = (props: ReturnType<typeof Modal>) => {
  const [message, setMessage] =
    useState(`Would you like to go to Music in the park this Sunday at 3:00pm?

Looks like they have music and food, it’s gonna be fun!
You can check out the event here: musicinpark/abcd123
Let me know if you’re up for it!`);
  return (
    <Modal {...props}>
      <div style={{ textAlign: "left" }}>
        <div
          style={{ fontWeight: "bold", marginBottom: "16px", color: "black" }}
        >
          Invite Forrest
        </div>
        <textarea
          id="eventMessage"
          className="event-message"
          
          style={{
            width: "100%",
            height: "200px",
            textAlign: "left" /* Align text to the left */,
            color: "black",
            fontSize: "1rem",
            border: "none",
            resize: "none",
            background: "inherit",
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button
            className="modal-button-cancel"
            onClick={() => setSelectedRecommendation(null)}
          >
            {" "}
            Cancel
          </button>
          <button
            className="modal-button-copy"
            onClick={() => {
              const text = document.getElementById("eventMessage")?.value || "";
              navigator.clipboard.writeText(text);
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </Modal>
  );
};
import LoadingSpinner from "./components/LoadingSpinner";

const Recommendations: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecommendation, setSelectedRecommendation] = useState<
    string | null
  >(null);
  console.log("id", id);
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<
    {
      id: number;
      title: string;
      date: string;
      description: string;
      onDoThis: () => void;
      onTweakThis: () => void;
    }[]
  >([]);
  useEffect(() => {
    const recommendationsUrl = "https://friendai.pages.dev/api/recommendation";
    const fetchRecommendations = async () => {
      console.log("fetching recommendations");
      setIsLoading(true);
      const response = await fetch(recommendationsUrl);
      const data = await response.json();
      console.log("data", data);
      const recommendationForFriend = (
        data.recommendations as {
          id: number;
          userId: string;
          friendId: number;
          reason: string;
          datetime: string;
          actionDate: string;
          status: string;
          recommendations: {
            idea: string;
            reason: string;
          }[];
        }[]
      ).find((rec) => rec.id === Number(id));

      const transformedRecommendations =
        recommendationForFriend?.recommendations.map((rec, index) => ({
          id: index,
          title: rec.idea,
          // a random time between 1 and 3 days from now
          date: new Date(
            new Date().getTime() + Math.random() * 2 * 24 * 60 * 60 * 1000
          ).toLocaleString(),
          description: rec.idea,
          onDoThis: () => console.log("Let's Do This"),
          onTweakThis: () => console.log("Tweak this"),
        })) ?? [];
      setRecommendations(transformedRecommendations);
      setIsLoading(false);
    };
    fetchRecommendations();
  }, [id]);
  return (
    <div className="recommendations-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {recommendations.map((rec, index) => (
            <Card
              key={index}
              title={rec.title}
              date={rec.date}
              description={rec.description}
              onDoThis={() => setSelectedRecommendation(rec.id.toString())}
              onTweakThis={() => setSelectedRecommendation(rec.title)}
            />
          ))}

          <button
            className="load-more-button"
            onClick={() => console.log("Load more")}
          >
            Load More
          </button>
          <Modal
            isOpen={selectedRecommendation !== null}
            onClose={() => setSelectedRecommendation(null)}
          >
            <div>
              <h1 style={{ color: "black" }}>Modal</h1>
              <p style={{ color: "black" }}>
                Currently selected recommendation: {selectedRecommendation}
              </p>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Recommendations;

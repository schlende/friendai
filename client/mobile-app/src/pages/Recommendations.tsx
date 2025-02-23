import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import "../styles/Card.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "./components/Modal";
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

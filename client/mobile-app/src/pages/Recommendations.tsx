import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import "../styles/Card.css"; // Import the CSS file
import { useNavigate, useParams } from "react-router-dom";

const Recommendations: React.FC = () => {
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<
    {
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
        recommendationForFriend?.recommendations.map((rec) => ({
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
    };
    fetchRecommendations();
  }, [id]);
  return (
    <div className="recommendations-container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back
      </button>
      {recommendations.map((rec, index) => (
        <Card
          key={index}
          title={rec.title}
          date={rec.date}
          description={rec.description}
          onDoThis={rec.onDoThis}
          onTweakThis={rec.onTweakThis}
        />
      ))}
      <button
        className="load-more-button"
        onClick={() => console.log("Load more")}
      >
        Load More
      </button>
    </div>
  );
};

export default Recommendations;

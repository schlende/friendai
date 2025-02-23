import React from 'react';
import Card from './components/Card';
import '../styles/Card.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const recommendations = [
  {
    title: "Music in the park",
    date: "This Sunday, 3:00 pm",
    description: "Forest likes outdoor music, he may enjoy the festival",
    onDoThis: () => console.log("Let's Do This"),
    onTweakThis: () => console.log("Tweak this")
  },
  {
    title: "Art Exhibition",
    date: "Next Saturday, 1:00 pm",
    description: "Forest enjoys art, he might like the new exhibition",
    onDoThis: () => console.log("Let's Do This"),
    onTweakThis: () => console.log("Tweak this")
  },
  {
    title: "Food Festival",
    date: "Next Friday, 5:00 pm",
    description: "Forest loves trying new foods, he should check out the festival",
    onDoThis: () => console.log("Let's Do This"),
    onTweakThis: () => console.log("Tweak this")
  },
  {
    title: "Book Fair",
    date: "Tomorrow, 10:00 am",
    description: "Forest is an avid reader, he might enjoy the book fair",
    onDoThis: () => console.log("Let's Do This"),
    onTweakThis: () => console.log("Tweak this")
  }
];

const Recommendations: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="recommendations-container">
      <button className="back-button" onClick={() => navigate('/')}>Back</button>
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
      <button className="load-more-button" onClick={() => console.log("Load more")}>Load More</button>
    </div>
  );
};

export default Recommendations;
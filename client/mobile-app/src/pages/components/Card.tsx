import React from 'react';
import '../../styles/Card.css';

interface CardProps {
  title: string;
  date: string;
  description: string;
  image: string;
  onDoThis: () => void;
  onTweakThis: () => void;
}

const Card: React.FC<CardProps> = ({ title, date, description, image, onDoThis, onTweakThis }) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-image">
          <img src="/src/assets/imageCard.png" alt="Music in the park" />
        </div>
        <div className="card-title">{title}</div>
        <div className="card-date">{date}</div>
        <div className="card-description">{description}</div>
        <div className="card-buttons">
          <div className="card-button-wrapper card-button-wrapper-secondary">
            <button
              className="card-button card-button-secondary"
              onClick={onTweakThis}
            >
              Tweak This
            </button>
          </div>
          <div className="card-button-wrapper card-button-wrapper-primary">
            <button
              className="card-button card-button-primary"
              onClick={onDoThis}
            >
              Let's Do This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
import React, { useState } from "react";
import "./PropertyCard.css";

const PropertyCard = ({ card }) => {
  const [showBuy, setShowBuy] = useState(false);

  // Only show the "Buy" button if the property is not sold and hover is active
  const handleMouseEnter = () => {
    if (!card.isSold) {
      setShowBuy(true);
    }
  };

  const handleMouseLeave = () => {
    setShowBuy(false);
  };

  return (
    <div
      className={`property-card ${card.isSold ? "sold" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`http://localhost:3000/${card.image}`}
        alt={card.name}
        className="property-image"
      />
      <div className="property-info">
        <h3>{card.name}</h3>
        <p>{card.address}</p>
        <p>{card.details}</p>
        <p className="property-price">Rs.{card.price}</p>
      </div>
      {/* Show "Buy" button only if the property is not sold */}
      {!card.isSold && showBuy && (
        <button className="buy-button" onClick={() => card.onBuyClick(card)}>
          Buy
        </button>
      )}
    </div>
  );
};

export default PropertyCard;

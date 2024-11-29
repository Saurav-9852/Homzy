import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Properties.css";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

const Properties = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [soldProperties, setSoldProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/properties");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProperties();

    // Load sold properties from local storage
    const storedSold = JSON.parse(localStorage.getItem("soldProperties")) || [];
    setSoldProperties(storedSold);
  }, []);

  const handleBuyClick = (property) => {
    setSelectedProperty(property);
  };

  const handleBookNow = () => {
    if (selectedProperty) {
      const updatedSold = [...soldProperties, selectedProperty];
      setSoldProperties(updatedSold);

      // Store in local storage
      localStorage.setItem("soldProperties", JSON.stringify(updatedSold));

      // Mark property as sold
      setData((prevData) =>
        prevData.map((prop) =>
          prop.id === selectedProperty.id
            ? { ...prop, isSold: true }
            : prop
        )
      );

      setSelectedProperty(null);
      alert(`Property "${selectedProperty.name}" has been sold!`);
    }
  };

  const closePopup = () => {
    setSelectedProperty(null);
  };

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="properties">
          {data
            .filter(
              (property) =>
                property.name.toLowerCase().includes(filter.toLowerCase()) ||
                property.address.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => (
              <PropertyCard
                card={{
                  ...card,
                  isSold: soldProperties.some((p) => p.id === card.id),
                  onBuyClick: handleBuyClick,
                }}
                key={i}
              />
            ))}
        </div>
      </div>

      {selectedProperty && (
        <div className="popup">
          <div className="popup-content">
            <h2>Booking for {selectedProperty.name}</h2>
            <p>{selectedProperty.address}</p>
            <button className="book-now-button" onClick={handleBookNow}>
              Book Now
            </button>
            <button className="close-popup" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;

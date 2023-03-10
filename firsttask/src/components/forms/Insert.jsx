import React, { useState } from "react";
import axios from "axios";
import "../../styles/Insert.scss";
import { useNavigate } from "react-router-dom";
const Insert = () => {
  const [formData, setFormData] = useState({
    continentName: "",
    noOfCountry: "",
    countryName: "",
    noOfState: "",
    population: "",
    stateName: "",
    noOfCity: "",
    countryCapitalName: "",
    stateCapitalName: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // Submit data to backend here
    axios
      .post("/v1/api/insert", formData)
      .then((response) => {
        console.log(response.data);
        setShowPopup(true); // Show popup on successful submission
        alert("Form submitted successfully!");
        setTimeout(() => {
          setShowPopup(false); // Hide popup after a brief delay
          navigate("/"); // Redirect user to homepage
        }, 3000);
      })
      .catch((error) => {
        console.log(error); // Handle error
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="continentName">Continent Name *</label>
          <input
            type="text"
            name="continentName"
            id="continentName"
            value={formData.continentName}
            onChange={handleInputChange}
            required
          />
          <div className="form-group">
            <label htmlFor="noOfCountry">Number of country</label>
            <input
              type="number"
              name="noOfCountry"
              id="noOfCountry"
              value={formData.noOfCountry}
              onChange={handleInputChange}
              min={0}
              max={500}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="countryName">Country Name *</label>
          <input
            type="text"
            name="countryName"
            id="countryName"
            value={formData.countryName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="noOfState">Number of States</label>
          <input
            type="number"
            name="noOfState"
            id="noOfState"
            value={formData.noOfState}
            onChange={handleInputChange}
            min={0}
            max={500}
          />
          <div className="form-group">
            <label htmlFor="population">Population</label>
            <input
              type="number"
              name="population"
              id="population"
              value={formData.population}
              onChange={handleInputChange}
              min={0}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="stateName">State Name *</label>
          <input
            type="text"
            name="stateName"
            id="stateName"
            value={formData.stateName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="noOfCity">Number of Cities</label>
          <input
            type="number"
            name="noOfCity"
            id="noOfCity"
            value={formData.noOfCity}
            onChange={handleInputChange}
            min={0}
            max={500}
          />
        </div>
        <div className="form-group">
          <label htmlFor="countryCapitalName">Country Capital Name *</label>
          <input
            type="text"
            name="countryCapitalName"
            id="countryCapitalName"
            value={formData.countryCapitalName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stateCapitalName">State Capital Name *</label>
          <input
            type="text"
            name="stateCapitalName"
            id="stateCapitalName"
            value={formData.stateCapitalName}
            onChange={handleInputChange}
            required
          />
        </div>
        {showPopup && (
          <div className="popup"> data submitted successfully!</div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Insert;

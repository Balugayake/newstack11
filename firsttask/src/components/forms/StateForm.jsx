import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function StateForm() {
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();
  console.log(data);
  const [formData, setFormData] = useState({
    id: data._id,
    stateName: data.name,
    noOfCity: data.NoOfCity,
    countryId: data.countryId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, stateName, noOfCity, countryId } = formData;
    if (window.confirm("Are you sure you want to submit the form?")) {
      // Submit the form
      try {
        const response = await axios.put(`/v1/api/updatestate`, {
          id: id,
          name: stateName,
          NoOfCity: noOfCity,
          countryId: countryId,
        });
        console.log(response.data);
        alert("Form submitted successfully!");
        navigate("/view");
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 400) {
          alert("Error: Duplicate data not allowed");
        }
      }
      console.log("Submitting form...");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        State Name:
        <input
          type="text"
          name="stateName"
          value={formData.stateName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Number of Cities:
        <input
          type="number"
          name="noOfCity"
          value={formData.noOfCity}
          onChange={handleInputChange}
          min={0}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default StateForm;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CountryForm(props) {
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();
  console.log(data);
  const [formData, setFormData] = useState({
    id: data._id,
    countryName: data.name,
    noOfState: data.NoOfState,
    population: data.population,
    continentId: data.continentId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, countryName, noOfState, population, continentId } = formData;
    alert(
      `Country Name: ${countryName}\nNumber of States: ${noOfState}\nPopulation: ${population}`
    );
    if (window.confirm("Are you sure you want to submit the form?")) {
      // Submit the form
      try {
        const response = await axios.put(`/v1/api/updatecountry`, {
          id: id,
          name: countryName,
          NoOfState: noOfState,
          population: population,
          continentId: continentId,
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
        Country Name:
        <input
          type="text"
          name="countryName"
          value={formData.countryName}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Number of States:
        <input
          type="number"
          name="noOfState"
          value={formData.noOfState}
          onChange={handleInputChange}
          min={0}
          required
        />
      </label>
      <label>
        Population:
        <input
          type="number"
          name="population"
          value={formData.population}
          onChange={handleInputChange}
          min={0}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CountryForm;

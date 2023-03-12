import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/forms.scss";
function ContinentForm(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  console.log("data  is", data);
  const [formData, setFormData] = useState({
    id: data._id,
    continentName: data.name,
    numberOfCountries: data.noOfCountry,
  });
  if (!data) {
    // Render some kind of error message or redirect to a different page
    return <div>Error: No data found</div>;
  }
  // You can now access the data object here
  const formatInput = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = formatInput(value);
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { id, continentName, numberOfCountries } = formData;
    alert(
      `Continent Name: ${continentName}\nNumber of Countries: ${numberOfCountries}`
    );
    if (window.confirm("Are you sure you want to submit the form?")) {
      axios
        .put(`/v1/api/updatecontinent`, {
          id: id,
          name: continentName,
          noOfCountry: numberOfCountries,
        })

        .then((response) => {
          console.log(`Continent with id ${id} has been Updated`);
          navigate("/view");
          // Perform any other necessary actions, such as updating the UI
        })
        .catch((error) => {
          console.log(`updating continent with id ${id}: ${error}`);

          if (error.response.status === 400) {
            alert(`not allow to enter Duplicate entry`);
          }
        });
      console.log("Submitting form...");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Continent Name:
        <input
          type="text"
          name="continentName"
          value={formData.continentName}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Number of Countries:
        <input
          type="number"
          name="numberOfCountries"
          value={formData.numberOfCountries}
          onChange={handleInputChange}
          min={0}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ContinentForm;

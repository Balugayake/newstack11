import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/forms.scss";
function Ccapitalform(props) {
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();
  console.log(data);
  const [formData, setFormData] = useState({
    id: data._id,
    capitalname: data.name,
    countryId: data.countryId,
  });
  const formatInput = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = formatInput(value);
    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, capitalname, countryId } = formData;
    alert(`Country Name: ${capitalname}`);
    if (window.confirm("Are you sure you want to submit the form?")) {
      // Submit the form
      try {
        const response = await axios.put(`/v1/api/updateCcapital`, {
          id: id,
          name: capitalname,
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
        Country Name:
        <input
          type="text"
          name="capitalname"
          value={formData.capitalname}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Ccapitalform;

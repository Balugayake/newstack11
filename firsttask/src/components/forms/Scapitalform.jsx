import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Scapitalform(props) {
  const location = useLocation();
  const { data } = location.state;
  const navigate = useNavigate();
  console.log(data);
  const [formData, setFormData] = useState({
    id: data._id,
    statename: data.name,
    stateId: data.stateId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { id, statename, stateId } = formData;
    alert(`Country Name: ${statename}`);
    if (window.confirm("Are you sure you want to submit the form?")) {
      // Submit the form
      try {
        const response = await axios.put(`/v1/api/updateScapital`, {
          id: id,
          name: statename,
          stateId: stateId,
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
          name="statename"
          value={formData.statename}
          onChange={handleInputChange}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Scapitalform;

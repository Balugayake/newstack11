import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/update.scss";
function Update(props) {
  const [continent, setContinent] = useState({
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

  useEffect(() => {
    axios
      .get(`/api/continents/${props.continentId}`)
      .then((response) => {
        setContinent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.continentId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContinent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`/api/continents/${props.continentId}`, continent)
      .then((response) => {
        console.log(response.data);
        // Do something with the updated continent data
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="continentName">Continent Name:</label>
      <input
        type="text"
        id="continentName"
        name="continentName"
        value={continent.continentName}
        onChange={handleChange}
      />

      <label htmlFor="noOfCountry">Number of Countries:</label>
      <input
        type="number"
        id="noOfCountry"
        name="noOfCountry"
        value={continent.noOfCountry}
        onChange={handleChange}
      />

      <label htmlFor="countryName">Country Name:</label>
      <input
        type="text"
        id="countryName"
        name="countryName"
        value={continent.countryName}
        onChange={handleChange}
      />

      <label htmlFor="noOfState">Number of States/Provinces:</label>
      <input
        type="number"
        id="noOfState"
        name="noOfState"
        value={continent.noOfState}
        onChange={handleChange}
      />

      <label htmlFor="population">Population:</label>
      <input
        type="number"
        id="population"
        name="population"
        value={continent.population}
        onChange={handleChange}
      />

      <label htmlFor="stateName">State/Province Name:</label>
      <input
        type="text"
        id="stateName"
        name="stateName"
        value={continent.stateName}
        onChange={handleChange}
      />

      <label htmlFor="noOfCity">Number of Cities:</label>
      <input
        type="number"
        id="noOfCity"
        name="noOfCity"
        value={continent.noOfCity}
        onChange={handleChange}
      />

      <label htmlFor="countryCapitalName">Country Capital Name:</label>
      <input
        type="text"
        id="countryCapitalName"
        name="countryCapitalName"
        value={continent.countryCapitalName}
        onChange={handleChange}
      />

      <label htmlFor="stateCapitalName">State/Province Capital Name:</label>
      <input
        type="text"
        id="stateCapitalName"
        name="stateCapitalName"
        value={continent.stateCapitalName}
        onChange={handleChange}
      />

      <button type="submit">Update Continent</button>
    </form>
  );
}

export default Update;

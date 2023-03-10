import React, { useState, useEffect } from "react";
import axios from "axios";
const Show = () => {
  const [data, setData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    console.log("IN");
    const fetchData = async () => {
      try {
        const response = await fetch("/v1/api/getdata");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.continents[0]);
        const newData = [];

        data.continents.forEach((continent) => {
          continent.countries.forEach((country) => {
            country.states.forEach((state) => {
              const countryCapital = data.countryCapitals.find(
                (capital) => capital.countryId === country._id
              );
              const stateCapital = data.stateCapitals.find(
                (capital) => capital.stateId === state._id
              );
              console.log("hello", continent[0].name);
              newData.push({
                continentId: continent._id,
                continentName: continent.name,
                noOfCountries: continent.noOfCountry,
                countryId: country._id,
                countryName: country.name,
                noOfStates: country.NoOfState,
                population: country.population,
                stateId: state._id,
                stateName: state.name,
                noOfCities: state.NoOfCity,
                countryCapitalName: countryCapital ? countryCapital.name : "",
                stateCapitalName: stateCapital ? stateCapital.name : "",
              });
            });
          });
        });

        setCombinedData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log("out");
  }, []);

  console.log("this is table data", combinedData, data);
  return (
    <div>
      <h1>Data Table</h1>
      <table striped bordered hover>
        <thead>
          <tr>
            <th>_id</th>
            <th>Continent Name</th>
            <th>No. of Countries</th>
            <th>Country Id</th>
            <th>Country Name</th>
            <th>No. of state</th>
            <th>population</th>
            <th>State Id</th>
            <th>state Name</th>
            <th>No. of city</th>
            <th>Country Capital Name</th>
            <th>State Capital Name</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((data) => (
            <tr key={data._id}>
              <td>{data._id}</td>
              <td>{data.continentName}</td>
              <td>{data.numOfCountries}</td>
              <td>{data.countryId}</td>
              <td>{data.countryName}</td>
              <td>{data.numOfStates}</td>
              <td>{data.population}</td>
              <td>{data.stateId}</td>
              <td>{data.stateName}</td>
              <td>{data.numOfCities}</td>
              <td>{data.countryCapitalName}</td>
              <td>{data.stateCapitalName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Show;

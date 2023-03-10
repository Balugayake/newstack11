import React, { useState, useEffect } from "react";
import "../../styles/tabale.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [data, setData] = useState();
  const [continentId, setContinentId] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/v1/api/getdata`, {
        params: {
          continentId: continentId,
        },
      });
      setData(response.data);
    };
    fetchData();
  }, [continentId]);
  const handleUpdate1 = (data) => {
    navigate("/updatecontinent", { state: { data: data } });
  };
  const handleUpdate2 = (data) => {
    navigate("/updatecountry", { state: { data: data } });
  };
  const handleUpdate3 = (data) => {
    navigate("/updatestate", { state: { data: data } });
  };
  const handleUpdate4 = (data) => {
    navigate("/updateCcapital", { state: { data: data } });
  };
  const handleUpdate5 = (data) => {
    navigate("/updateScapital", { state: { data: data } });
  };

  // handleDelete function definition

  const handledeletecontinet = async (id) => {
    console.log(id);
    try {
      await axios.delete("/v1/api/deletecontinet", {
        data: { id: id },
      });
      // Refresh the page
      console.log("deleted");
      alert("delete successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handledeletecountry = async (id) => {
    console.log(id);
    try {
      await axios.delete("/v1/api/deletecountry", {
        data: { id: id },
      });
      // Refresh the page
      console.log("deleted");
      alert("delete successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handledeletestate = async (id) => {
    console.log(id);
    try {
      await axios.delete("/v1/api/deletestate", {
        data: { id: id },
      });
      // Refresh the page
      console.log("deleted");
      alert("delete successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handledeletecapital = async (id) => {
    console.log(id);
    try {
      await axios.delete("/v1/api/deleteCcapital", {
        data: { id: id },
      });
      // Refresh the page
      console.log("deleted");
      alert("delete successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handledelecapital = async (id) => {
    console.log(id);
    try {
      await axios.delete("/v1/api/deleteScapital", {
        data: { id: id },
      });
      // Refresh the page
      console.log("deleted");
      alert("delete successfully!");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Data Table</h1>
      <h1>Countinent Data</h1>
      <div>
        <table striped bordered hover>
          <thead>
            <tr>
              <th>_id</th>
              <th>Continent Name</th>
              <th>No. of Countries</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.continents.map((data) => (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.noOfCountry}</td>
                  <td>
                    <button onClick={() => handleUpdate1(data)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handledeletecontinet(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Country data</h1>
        <table striped bordered hover>
          <thead>
            <tr>
              <th>_id</th>
              <th>Country Name</th>
              <th>No. of state</th>
              <th>population</th>
              <th>continentId</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.countries.map((data) => (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.NoOfState}</td>
                  <td>{data.population}</td>
                  <td>{data.continentId}</td>
                  <td>
                    <button onClick={() => handleUpdate2(data)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handledeletecountry(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>state data</h1>
        <table striped bordered hover>
          <thead>
            <tr>
              <th>_id</th>
              <th>state Name</th>
              <th>No. of city</th>
              <th>countryId</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.states.map((data) => (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.NoOfCity}</td>
                  <td>{data.countryId}</td>
                  <td>
                    <button onClick={() => handleUpdate3(data)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handledeletestate(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Capital of country</h1>
        <table striped bordered hover>
          <thead>
            <tr>
              <th>_id</th>
              <th> Name</th>
              <th>countryId</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.countryCapitals.map((data) => (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.countryId}</td>
                  <td>
                    <button onClick={() => handleUpdate4(data)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handledeletecapital(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Capital of State</h1>
        <table striped bordered hover>
          <thead>
            <tr>
              <th>_id</th>
              <th>State Name</th>
              <th>stateId</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.stateCapitals.map((data) => (
                <tr>
                  <td>{data._id}</td>
                  <td>{data.name}</td>
                  <td>{data.stateId}</td>
                  <td>
                    <button onClick={() => handleUpdate5(data)}>Update</button>
                  </td>
                  <td>
                    <button onClick={() => handledelecapital(data._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

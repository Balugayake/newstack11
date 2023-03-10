import React from "react";
import "../../styles/home.scss";
const Home = () => {
  return (
    <>
      <section className="home">
        <div>
          <h2>Welcome To add New Worlds Data's</h2>
        </div>
        <div>
          <a href="/insert">Insert Data</a>
          <a href="/view">view Data</a>
          <a href="/view">update Data</a>
          <a href="/view">delete Data</a>
        </div>
      </section>
    </>
  );
};

export default Home;

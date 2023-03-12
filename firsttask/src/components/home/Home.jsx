import React from "react";
import "../../styles/home.scss";
const Home = () => {
  return (
    <>
      <section className="home">
        <div>
          <h3>
            Discover the World, One Continent at a Time: Explore Continents,
            Countries, States, and Cities with Ease!
          </h3>
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

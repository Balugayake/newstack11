import {
  Continent,
  Country,
  State,
  countrycapital,
  statecapital,
} from "../model/admin.js";
console.log(Continent);
import mongoose from "mongoose";
export const insertData = async (req, res) => {
  try {
    // Check if Continent exists
    console.log(req.body);
    let continent = await Continent.findOne({ name: req.body.continentName });
    if (!continent) {
      // If continent does not exist, insert new continent data
      const continentData = {
        name: req.body.continentName,
        noOfCountry: req.body.noOfCountry,
      };
      continent = new Continent(continentData);
      continent = await continent.save();
    }

    // Check if Country exists
    let country = await Country.findOne({
      name: req.body.countryName,
      continentId: continent._id,
    });
    if (!country) {
      // If country does not exist, insert new country data
      const countryData = {
        name: req.body.countryName,
        NoOfState: req.body.noOfState,
        population: req.body.population,
        continentId: continent._id,
      };
      country = new Country(countryData);
      country = await country.save();
    }

    // Check if State exists
    let state = await State.findOne({
      name: req.body.stateName,
      countryId: country._id,
    });
    if (!state) {
      // If state does not exist, insert new state data
      const stateData = {
        name: req.body.stateName,
        NoOfCity: req.body.noOfCity,
        countryId: country._id,
      };
      state = new State(stateData);
      state = await state.save();
    }

    // Update country and continent references
    country.NoOfState = req.body.noOfState;
    country.population = req.body.population;
    await country.save();

    continent.noOfCountry = await Country.countDocuments({
      continentId: continent._id,
    });
    await continent.save();

    // Insert Country Capital Data
    let countryCapital = await countrycapital.findOne({
      name: req.body.countryCapitalName,
      countryId: country._id,
    });
    if (!countryCapital) {
      const countryCapitalData = {
        name: req.body.countryCapitalName,
        countryId: country._id,
      };
      countryCapital = new countrycapital(countryCapitalData);
      countryCapital = await countryCapital.save();
    }

    // Insert State capital data

    let stateCapital = await statecapital.findOne({
      name: req.body.stateCapitalName,
      stateId: state._id,
    });
    if (!stateCapital) {
      const stateCapitalData = {
        name: req.body.stateCapitalName,
        stateId: state._id,
      };
      stateCapital = new statecapital(stateCapitalData);
      stateCapital = await stateCapital.save();
    }

    res.status(200).json({
      message: "Data inserted successfully",
      continent: continent,
      country: country,
      state: state,
      countryCapital: countryCapital,
      stateCapital: stateCapital,
    });
  } catch (error) {
    console.error("Error inserting data: ", error);
    res.status(500).json({ message: "Error inserting data" });
  }
};

//get all data

export const getdata = async function (req, res) {
  let responseData = {};

  try {
    // Get all continents
    const continents = await Continent.find({});
    responseData.continents = continents;

    // Get all countries
    const countries = await Country.find({});
    responseData.countries = countries;

    // Get all states
    const states = await State.find({});
    responseData.states = states;

    // Get all country capitals
    const countryCapitals = await countrycapital.find({});
    responseData.countryCapitals = countryCapitals;

    // Get all state capitals
    const stateCapitals = await statecapital.find({});
    responseData.stateCapitals = stateCapitals;

    // Return all data as a JSON response
    res.json(responseData);
  } catch (err) {
    res.send(err);
  }
};

//update the data

export const update = async function (req, res) {
  try {
    const {
      continentName,
      noOfCountry,
      countryName,
      noOfState,
      population,
      stateName,
      noOfCity,
      countryCapitalName,
      stateCapitalName,
    } = req.body;

    // Update the continent
    const continent = await Continent.findOneAndUpdate(
      { name: continentName },
      { noOfCountry },
      { new: true, upsert: true }
    );

    // Update the country
    const country = await Country.findOneAndUpdate(
      { name: countryName },
      { NoOfState: noOfState, population, continentId: continent._id },
      { new: true, upsert: true }
    );

    // Update the state
    const state = await State.findOneAndUpdate(
      { name: stateName },
      { NoOfCity: noOfCity, countryId: country._id },
      { new: true, upsert: true }
    );

    // Update the country capital
    const countryCapital = await countrycapital.findOneAndUpdate(
      { countryId: country._id },
      { name: countryCapitalName, countryId: country._id },
      { new: true, upsert: true }
    );

    // Update the state capital
    const stateCapital = await statecapital.findOneAndUpdate(
      { stateId: state._id },
      { name: stateCapitalName, stateId: state._id },
      { new: true, upsert: true }
    );

    res.status(200).json({
      continent,
      country,
      state,
      countryCapital,
      stateCapital,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletecontinentdata = async function (req, res, next) {
  try {
    const continent = await Continent.findById(req.body.continentid);
    if (!continent) {
      return res.status(404).json({ message: "Continent not found" });
    }

    // Call the pre middleware to delete all associated data
    await continent.remove();

    res
      .status(200)
      .json({ message: "Continent and associated data deleted successfully" });
  } catch (err) {
    next(err);
  }
};
// console.log(Continent.schema.methods);
// if (Continent.schema.methods.hasOwnProperty("remove")) {
//   console.log("remove method is defined for MyModel");
// } else {
//   console.log("remove method is not defined for MyModel");
// }

export const constinetD = async (req, res) => {
  try {
    const continentId = req.body.id;

    // Find all countries in the continent
    const countries = await Country.find({ continentId }).select("_id").exec();

    // Find all states in the countries
    const states = await State.find({ countryId: { $in: countries } })
      .select("_id")
      .exec();

    // Find all country capitals in the countries
    const countryCapitals = await countrycapital
      .find({
        countryId: { $in: countries },
      })
      .select("_id")
      .exec();

    // Find all state capitals in the states
    // id:1,2,3,4,
    const stateCapitals = await statecapital
      .find({ stateId: { $in: states } })
      .select("_id")
      .exec();

    // Delete all related documents in reverse order
    await statecapital.deleteMany({ _id: { $in: stateCapitals } });
    await countrycapital.deleteMany({ _id: { $in: countryCapitals } });
    await State.deleteMany({ _id: { $in: states } });
    await Country.deleteMany({ _id: { $in: countries } });
    await Continent.deleteOne({ _id: continentId });

    res
      .status(200)
      .send(
        `Deleted continent ${continentId} and all associated countries, states, and capitals`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

//delete the contry's data

export const deleteCountry = async (req, res) => {
  try {
    const countryId = req.body.id;
    console.log("contry id is", countryId);
    // Find all states in the country
    const states = await State.find({ countryId }).select("_id").exec();

    // Find all country capitals in the country
    const countryCapitals = await countrycapital
      .find({
        countryId,
      })
      .select("_id")
      .exec();

    // Find all state capitals in the states
    const stateCapitals = await statecapital
      .find({ stateId: { $in: states } })
      .select("_id")
      .exec();

    // Delete all related documents in reverse order
    await statecapital.deleteMany({ _id: { $in: stateCapitals } });
    await countrycapital.deleteMany({ _id: { $in: countryCapitals } });
    await State.deleteMany({ _id: { $in: states } });
    await Country.deleteOne({ _id: countryId });

    res
      .status(200)
      .send(
        `Deleted country ${countryId} and all associated states and capitals`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export const deleteState = async (req, res) => {
  try {
    const stateId = req.body.id;

    // Find the country of the state
    const state = await State.findById(stateId).select("countryId").exec();

    // Find all state capitals in the state
    const stateCapitals = await statecapital
      .find({ stateId })
      .select("_id")
      .exec();

    // Delete all related documents in reverse order
    await statecapital.deleteMany({ _id: { $in: stateCapitals } });
    await State.deleteOne({ _id: stateId });

    res
      .status(200)
      .send(
        `Deleted state ${stateId} and all associated state capitals in capital`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

//delete country capital

export const deleteCcapital = async (req, res) => {
  const { id } = req.body;

  try {
    const countryCapital = await countrycapital.findById(id);
    if (!countryCapital) {
      return res.status(404).json({ error: "Country capital not found" });
    }

    // Delete the country capital from the database
    await countryCapital.deleteOne({ _id: id });

    return res.json({ message: "Country capital deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteScapital = async (req, res) => {
  const { id } = req.body;
  try {
    const stateCapital = await statecapital.findById(id);
    if (!stateCapital) {
      return res.status(404).json({ error: "State capital not found" });
    }

    // Delete the state capital from the database
    await stateCapital.deleteOne({ _id: id });

    return res.json({ message: "State capital deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

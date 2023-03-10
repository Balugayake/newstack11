import {
  Continent,
  Country,
  State,
  countrycapital,
  statecapital,
} from "../model/admin.js";

export const updateContinent = async (req, res) => {
  const { id, name, noOfCountry } = req.body;

  try {
    const continent = await Continent.findById(id);
    if (!continent) {
      return res.status(404).json({ error: "Continent not found" });
    }

    // Check if there is already a continent with the same name
    const duplicate = await Continent.findOne({ name });
    if (duplicate && duplicate._id.toString() !== id) {
      return res.status(400).json({ error: "Duplicate continent name" });
    }

    // Update the continent's name and noOfCountry fields
    continent.name = name;
    continent.noOfCountry = noOfCountry;
    await continent.save();

    return res.json(continent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//update for contry

export const updatecountry = async (req, res) => {
  const { id, name, NoOfState, population, continentId } = req.body;

  try {
    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    // Check if there is already a state with the same name and continentId
    const duplicate = await Country.findOne({
      name,
      continentId,
      _id: { $ne: id },
    });
    if (duplicate) {
      return res
        .status(400)
        .json({ error: "Duplicate state name within continent" });
    }

    // Update the country's fields
    country.name = name;
    country.NoOfState = NoOfState;
    country.population = population;
    await country.save();

    return res.json(country);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//update for the state

export const updatestate = async (req, res) => {
  const { id, name, NoOfCity, countryId } = req.body;

  try {
    const state = await State.findById(id);
    if (!state) {
      return res.status(404).json({ error: "State not found" });
    }

    // Check if there is already a city with the same name and countryId
    const duplicate = await State.findOne({
      name,
      countryId,
      _id: { $ne: id },
    });
    if (duplicate) {
      return res
        .status(400)
        .json({ error: "Duplicate city name within country" });
    }

    // Update the state's fields
    state.name = name;
    state.NoOfCity = NoOfCity;
    await state.save();
    return res.json(state);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCcapital = async (req, res) => {
  const { id, name, countryId } = req.body;

  try {
    const countryCapital = await countrycapital.findById(id);
    if (!countryCapital) {
      return res.status(404).json({ error: "Country capital not found" });
    }

    // Check if there is already a capital for the new country
    const duplicate = await countrycapital.findOne({
      countryId,
      _id: { $ne: id },
    });
    if (duplicate) {
      return res.status(400).json({ error: "Duplicate country capital" });
    }

    // Update the country capital's fields
    countryCapital.name = name;
    await countryCapital.save();

    return res.json(countryCapital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateScapital = async (req, res) => {
  const { id, name, stateId } = req.body;

  try {
    const stateCapital = await statecapital.findById(id);
    if (!stateCapital) {
      return res.status(404).json({ error: "State capital not found" });
    }

    // Check if there is already a capital for the new state
    const duplicate = await statecapital.findOne({ stateId, _id: { $ne: id } });
    if (duplicate) {
      return res.status(400).json({ error: "Duplicate state capital" });
    }

    // Update the state capital's fields
    stateCapital.name = name;
    await stateCapital.save();

    return res.json(stateCapital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

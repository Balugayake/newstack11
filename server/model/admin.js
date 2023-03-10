import mongoose from "mongoose";

const ContinentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  noOfCountry: { type: Number },
});

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  NoOfState: { type: Number },
  population: { type: Number, required: true },
  continentId: { type: mongoose.Schema.Types.ObjectId, ref: "Continent" },
});
const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  NoOfCity: { type: Number },
  countryId: { type: mongoose.Schema.Types.ObjectId, ref: "country" },
});
const countrycapitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "country",
    unique: true,
  },
});
const statecapitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stateId: { type: mongoose.Schema.Types.ObjectId, ref: "state", unique: true },
});

export const Continent = mongoose.model("Continent", ContinentSchema);
export const Country = mongoose.model("country", countrySchema);
export const State = mongoose.model("state", stateSchema);
export const countrycapital = mongoose.model(
  "countrycapital",
  countrycapitalSchema
);
export const statecapital = mongoose.model("statecapital", statecapitalSchema);

// ContinentSchema.pre("remove", async function (next) {
//   try {
//     // Remove all associated countries
//     await mongoose.model("country").deleteMany({ continentId: this._id });

//     // Remove all associated states
//     await mongoose.model("state").deleteMany({ countryId: { $in: this._id } });

//     // Remove all associated cities
//     await mongoose.model("city").deleteMany({ stateId: { $in: this._id } });

//     // Remove all associated country capitals
//     await mongoose
//       .model("countrycapital")
//       .deleteMany({ countryId: { $in: this._id } });

//     // Remove all associated state capitals
//     await mongoose
//       .model("statecapital")
//       .deleteMany({ stateId: { $in: this._id } });

//     next();
//   } catch (err) {
//     next(err);
//   }
// });

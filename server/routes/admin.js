import express from "express";
import {
  insertData,
  getdata,
  update,
  deletecontinentdata,
  constinetD,
  deleteCountry,
  deleteState,
  deleteCcapital,
  deleteScapital,
} from "../controller/admin.js";

import {
  updateContinent,
  updatecountry,
  updatestate,
  updateCcapital,
  updateScapital,
} from "../controller/update.js";
const router = express.Router();
router.post("/insert", insertData);
router.get("/getdata", getdata);
router.put("/update", update);
router.delete("/deletemany", deletecontinentdata);
router.delete("/deletecontinet", constinetD);
router.delete("/deletecountry", deleteCountry);
router.delete("/deletestate", deleteState);

router.delete("/deleteCcapital", deleteCcapital);
router.delete("/deleteScapital", deleteScapital);

//update routes
router.put("/updatecontinent", updateContinent);
router.put("/updatecountry", updatecountry);
router.put("/updatestate", updatestate);
router.put("/updateCcapital", updateCcapital);
router.put("/updateScapital", updateScapital);

export default router;

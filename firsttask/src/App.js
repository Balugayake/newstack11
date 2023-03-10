import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Table from "./components/tables/Table";
import Insert from "./components/forms/Insert";
import Update from "./components/forms/Update";
import Show from "./components/forms/Show";
import ContinentForm from "./components/forms/ContinentForm";
import CountryForm from "./components/forms/CountryForm";
import StateForm from "./components/forms/StateForm";
import Ccapitalform from "./components/forms/Ccapitalform";
import Scapitalform from "./components/forms/Scapitalform";
function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<Table />} />
        <Route path="/view1" element={<Show />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/view" element={<Update />} />
        <Route path="/updatecontinent" element={<ContinentForm />} />
        <Route path="/updatecountry" element={<CountryForm />} />
        <Route path="/updatestate" element={<StateForm />} />
        <Route path="/updateCcapital" element={<Ccapitalform />} />
        <Route path="/updateScapital" element={<Scapitalform />} />
      </Routes>
    </Router>
  );
}

///

export default App;

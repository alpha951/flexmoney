import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import User from "./components/User";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Form />} />
        <Route path='/allusers' element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;

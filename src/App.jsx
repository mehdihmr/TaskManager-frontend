import Auth from "./dashboard/user/auth";
import Home from "./home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

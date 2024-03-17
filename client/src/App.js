// import { Link } from "react-router-dom";
// import { useContext } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom/dist";
import Index from "./Components/Index";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
function App() {
  return (
    <Routes>
      <Route index element={<Index/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
     
    </Routes>
   
  );
}

export default App;

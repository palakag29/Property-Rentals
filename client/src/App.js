// import { Link } from "react-router-dom";
// import { useContext } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom/dist";
import Index from "./Components/Index";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import { UserContextProvider } from './Components/UserContext';
import AddProperty from './Components/AddProperty';
function App() {
  return (
    <UserContextProvider>

      <Routes>
        <Route index element={<Index />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      </Routes>
    </UserContextProvider>

  );
}

export default App;

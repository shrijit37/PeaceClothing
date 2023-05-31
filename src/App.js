import { BrowserRouter, RouteProps, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Cart from "./components/Cart";
import PfFOF from "./components/PfFOF";
import UserProfile from "./components/UserProfile";
import "./App.css";

function App() {
  return (
 
      <BrowserRouter>
        <Routes>
          <Route exact path = "/" element={<Home/>}/>
          <Route exact path = "/login" element={<Login/>}/>
          <Route exact path = "/signup" element={<Signup/>}/>
          <Route exact path = "/cart" element={<Cart/>}/>
          <Route exact path = "/profile" element={<UserProfile/>}/>
          <Route exact path = "SignUp/login" element={<Login/>}/>
          <Route exact path = "*" element={<PfFOF/>}/>
          
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;

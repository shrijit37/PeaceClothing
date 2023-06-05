import { BrowserRouter, RouteProps, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Cart from "./components/Cart";
import PfFOF from "./components/PfFOF";
import UserProfile from "./components/UserProfile";
import AddProduct from "./components/AddProduct";
import "./App.css";
import ProductContainer from "./components/ProductContainer";
import AllProductPage from "./components/AllProductPage";
import SpecificProductPage  from "./components/SpecificProductPage";

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
          <Route exact path = "sellproduct" element={<AddProduct/>}/>
          <Route exact path = "profile/sellproduct" element={<AddProduct/>}/>
          <Route exact path = "product-type/men" element = {<AllProductPage type={"men"}/> }/>
          <Route exact path = "product-type/women" element = {<AllProductPage type={"women"}/> }/>
          <Route exact path = "product-type/sports" element = {<AllProductPage type={"sport"}/> }/>
          <Route path="/product/:id/:title" element={<SpecificProductPage/>}/>
          <Route exact path = "*" element={<PfFOF/>}/>
          
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;

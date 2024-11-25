import { BrowserRouter, Route, Routes } from "react-router-dom"
import ShopPage from "./pages/shop"
import CartPage from "./pages/cart"
import ProductDetailsPage from "./pages/details"
import './App.css'



function App() {
 

  return <BrowserRouter>
  <Routes>
 
  
    <Route path="/shop" element={<ShopPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/product/:id" element={<ProductDetailsPage />} />
   
  </Routes>
  </BrowserRouter>
}

export default App


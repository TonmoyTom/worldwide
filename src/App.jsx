import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Product from "./Pages/Product.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Pricing from "./Pages/Pricing.jsx";
import './index.css'
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import { CitiesProvider } from "./context/CitiesContext.jsx";

function App() {
    return <CitiesProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path="app" element={<AppLayout/>}>
                    <Route index element={<Navigate replace to="cities"/>}/>
                    <Route path="cities" element={<CityList  />} />
                    <Route path='cities/:id' element={<City/>}/>
                    <Route path="countries" element={<CountryList  />}/>
                    <Route path="form" element={<Form/>}/>
                </Route>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    </CitiesProvider>
}

export default App

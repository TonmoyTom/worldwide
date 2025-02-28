import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Product from "./Pages/Product.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Pricing from "./Pages/Pricing.jsx";
import './index.css'
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import {useEffect, useState} from "react";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

function App() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchCities() {
            try {
                setLoading(true);
                const res = await fetch('http://localhost:8000/cities');
                if (!res.ok) {
                    throw new Error('API response failed');
                }
                const data = await res.json();
                setCities(data);
            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCities();
    }, []);
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="product" element={<Product/>}/>
            <Route path="pricing" element={<Pricing/>}/>
            <Route path="app" element={<AppLayout/>}>
                <Route index element={<Navigate replace to="cities"/>}/>
                <Route path="cities" element={<CityList cities={cities} isLoading={loading} />} />
                <Route path='cities/:id' element={<City/>}/>
                <Route path="countries" element={<CountryList countries={cities} isLoading={loading} />}/>
                <Route path="form" element={<Form/>}/>
            </Route>
            <Route path="login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
}

export default App

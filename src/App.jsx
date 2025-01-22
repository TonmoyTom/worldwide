import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./Pages/Product.jsx";
import Homepage from "./Pages/Homepage.jsx";
import Pricing from "./Pages/Pricing.jsx";
import './index.css'
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route index={} element={<Homepage/>}/>
            <Route path="product" element={<Product/>}/>
            <Route path="pricing" element={<Pricing/>}/>
            <Route path="app" element={<AppLayout />}>
                <Route path="cities" element={<p>List Of Cities</p>} />
                <Route path="countries" element={<p>List Of Countries</p>} />
                <Route path="form" element={<p>List Of Forms</p>} />
            </Route>
            <Route path="login" element={<Login/>}/>
        </Routes>
    </BrowserRouter>
}

export default App

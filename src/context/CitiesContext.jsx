import { createContext ,  useEffect , useState , useContext } from "react";

 const CitiesContext = createContext();

 function CitiesProvider({children}){
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});
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

    async function getCity(id){
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/cities/${id}`);
            if (!res.ok) {
                throw new Error('API response failed');
            }
            const data = await res.json();
            setCurrentCity(data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return <CitiesContext.Provider value={{
        cities, loading, getCity , currentCity
    }}>
        {children}
    </CitiesContext.Provider>
 }

 function useCities(){
    const context = useContext(CitiesContext);
    if(context === undefined) throw new Error("CitiesContext Was Used in CitiesProvider");
    return context;

 } 

 export  { CitiesProvider , useCities}
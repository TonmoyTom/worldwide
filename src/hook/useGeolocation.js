import { useState } from 'react';


export default function useGeolocation(defaultPosition = null) {

    const [isLoading , setIsLoading] = useState(false);
    const [position , setPosition] = useState(defaultPosition);
    const [error , setError] = useState(null);
    
    function getPosition(){
       
        if(!navigator.geolocation){
            return setError("Your Browser does not support");
        }
        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                    lat : pos.coords.latitude,
                    lan : pos.coords.longitude,
                })
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
            }
        )

    }
    return { isLoading , position , error, getPosition} ;
}
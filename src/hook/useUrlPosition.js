import { useSearchParams } from "react-router-dom";

export default function useUrlPosition(){
    const [searchParams] = useSearchParams();
    const lat = parseFloat(searchParams.get("lat")) || 40; // Default to 40 if not provided
    const lng = parseFloat(searchParams.get("lng")) || 0; // Default to 0 if not provided

    return [lat , lng]
}
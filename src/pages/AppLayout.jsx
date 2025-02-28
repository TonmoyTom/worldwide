import SideBar from "../components/SideBar.jsx";
import styles from "./AppLayout.module.css";
import Map from "../components/Map.jsx";

export default function AppLayout(){
    return (
        <div className={styles.app}>
            <SideBar/>
            <Map/>

        </div>
    )
}
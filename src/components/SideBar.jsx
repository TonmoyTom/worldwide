import Logo from "./Logo.jsx";
import styles from "./Sidebar.module.css";
import {Outlet} from "react-router-dom";
import AppNav from "./AppNav.jsx";

export default  function SideBar() {
    return (
            <div className={styles.sidebar}>
                <Logo/>
                <AppNav/>
                <Outlet/>
                <footer className={styles.footer}>
                    By World wide inc
                </footer>
            </div>
    )
}
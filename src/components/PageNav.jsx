
import styles from './PageNav.module.css';
import Logo from "./Logo.jsx";
import {NavLink} from "react-router-dom";
export default function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul >
                <li>
                    <NavLink to="/pricing" className={styles.ctaLink}>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product" className={styles.ctaLink}>Product</NavLink>
                </li><li>
                    <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
                </li>
            </ul>
        </nav>

    )
}
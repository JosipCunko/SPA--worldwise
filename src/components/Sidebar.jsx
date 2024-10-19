import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      {/*Like children prop 
      RIGHT HERE IS WHERE it will render CityList, CountryList, City and Form back from routes in App component
      */}
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWies Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;

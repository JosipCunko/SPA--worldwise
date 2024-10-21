import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <picture>
        <source media="(max-width: 500px)" srcSet="/icon.png" />
        <source media="(min-width: 501px)" srcSet="/logo.png" />
        <img
          src="/logo.png" // fallback for older browsers
          alt="WorldWise logo"
          className={styles.logo}
        />
      </picture>
    </Link>
  );
}
export default Logo;

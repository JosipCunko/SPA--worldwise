import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  //function
  const navigate = useNavigate();

  //similar to useState
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <p>
        Position: {lat},{lng}
      </p>
      <button onClick={() => setSearchParams({ lat: 23, lng: 502 })}>
        Change position
      </button>
    </div>
  );
}

export default Map;

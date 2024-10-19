import { createContext, useEffect, useState, useContext } from "react";

const CitiesContext = createContext();
const URL = "http://localhost:8000/cities";

/**Provide context to children
 * @value cities, isLoading, currentCity, getCityInfo
 */
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(URL);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  /** @param cityId
   */
  async function getCityInfo(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCityInfo }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
/**Custom hook to give easier access to context value  */
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      "CitiesContext was used outside of Cities.Provider element"
    );
  return context;
}

export { CitiesProvider, useCities };

import { useSearchParams } from "react-router-dom";

/**Reads lat and lng from url */
export function useUrlPosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

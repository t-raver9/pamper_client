import { useCallback, useEffect, useState } from "react";
import Map from "../../components/Map";
import { VenueDTO, listVenuesInBounds } from "../../api/queries";
import _ from "lodash";

const defaultLocation = {
  lat: -37.79829287607176,
  lng: 144.94350455200757,
};

const Venues = () => {
  const [mapBounds, setMapBounds] = useState<google.maps.LatLngBounds | null>(
    null
  );
  const [venues, setVenues] = useState<VenueDTO[]>([]);
  const [mapCenter, setMapCenter] =
    useState<google.maps.LatLngLiteral>(defaultLocation);
  const [mapZoom, setMapZoom] = useState<number>(8);

  const handleMarkerClick = (venue: VenueDTO) => {
    setMapCenter({ lat: venue.Address!.lat, lng: venue.Address!.long });
    setMapZoom(200);
  };

  const debouncedListVenuesInBounds = useCallback(
    _.debounce(
      (bounds) =>
        listVenuesInBounds(bounds).then((data) => {
          setVenues(data);
        }),
      1000
    ),
    []
  );

  useEffect(() => {
    if (mapBounds) {
      const bounds = {
        north: mapBounds.getNorthEast().lat(),
        south: mapBounds.getSouthWest().lat(),
        east: mapBounds.getNorthEast().lng(),
        west: mapBounds.getSouthWest().lng(),
      };

      debouncedListVenuesInBounds(bounds);
    }

    return () => {
      debouncedListVenuesInBounds.cancel();
    };
  }, [mapBounds]);

  return (
    <div>
      Venues
      <Map
        onBoundsChange={setMapBounds}
        venues={venues}
        location={mapCenter}
        onMarkerClick={handleMarkerClick}
        zoom={mapZoom}
      />
    </div>
  );
};

export default Venues;

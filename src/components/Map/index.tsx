import React, { useCallback, useEffect, useRef } from "react";
import {
  GoogleMap,
  Libraries,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { VenueDTO } from "../../api/queries";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const defaultLocation = {
  lat: -37.79829287607176,
  lng: 144.94350455200757,
};

interface MapProps {
  location?: google.maps.LatLngLiteral | null;
  venues?: VenueDTO[];
  onBoundsChange?: (bounds: google.maps.LatLngBounds) => void;
  zoom?: number;
  onMarkerClick?: (venue: VenueDTO) => void;
}

const libraries: Libraries = ["places"];

const Map = ({
  location,
  venues,
  onBoundsChange,
  zoom,
  onMarkerClick,
}: MapProps) => {
  console.log("VENUES: ", venues);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const mapRef = useRef<google.maps.Map>();
  const handleOnLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleBoundsChange = () => {
    if (mapRef.current?.getBounds() && onBoundsChange) {
      onBoundsChange(mapRef!.current!.getBounds()!);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log("xoom: ", zoom);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location || defaultLocation}
      zoom={zoom ? 15 : 8}
      onLoad={handleOnLoad}
      onBoundsChanged={handleBoundsChange}
    >
      {location && <Marker position={location} />}
      {venues &&
        venues.map((venue) => (
          <Marker
            position={{ lat: venue.Address!.lat, lng: venue.Address!.long }}
            key={venue.id}
            onClick={() => onMarkerClick && onMarkerClick(venue)}
          />
        ))}
    </GoogleMap>
  );
};

export default Map;

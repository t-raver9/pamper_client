import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const defaultLocation = {
  lat: -37.79829287607176,
  lng: 144.94350455200757,
};

interface MapProps {
  location: google.maps.LatLngLiteral | null;
}

const Map = ({ location }: MapProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location || defaultLocation}
      zoom={location ? 15 : 8}
    >
      {location && <Marker position={location} />}
    </GoogleMap>
  );
};

export default Map;

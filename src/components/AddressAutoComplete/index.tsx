import React, { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Input, TextField } from "@mui/material";

interface AddressAutoCompleteProps {
  onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
}

const AddressAutoComplete = ({ onPlaceSelected }: AddressAutoCompleteProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const autocompleteInput = useRef(null);

  useEffect(() => {
    if (!isLoaded || !autocompleteInput.current) return;

    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput.current,
      { types: ["address"] }
    );

    autocomplete.addListener("place_changed", () => {
      if (onPlaceSelected) {
        const place = autocomplete.getPlace();
        onPlaceSelected(place);
      }
    });
  }, [isLoaded, onPlaceSelected]);

  return (
    <div style={{ width: "300px" }}>
      <TextField
        inputRef={autocompleteInput}
        label="Enter your address"
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default AddressAutoComplete;

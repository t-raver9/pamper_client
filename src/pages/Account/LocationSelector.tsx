import React, { useEffect, useState } from "react";
import AddressAutoComplete from "../../components/AddressAutoComplete";
import Map from "../../components/Map";
import { Button } from "@mui/material";
import {
  AddressDTO,
  getAddressForVenue,
  postAddressForVenue,
} from "../../api/queries";
import { useAuth } from "../../contexts/authContext";

const LocationSelector = () => {
  const { venue } = useAuth();
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [address, setAddress] = useState<AddressDTO | null>(null);

  useEffect(() => {
    if (venue?.id) {
      getAddressForVenue(venue.id).then((res: AddressDTO) => {
        setAddress(res);
        console.log(res);
      });
    }
  }, []);

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    setSelectedLocation(place);
  };

  const handleSaveAddress = () => {
    const addressDTO: AddressDTO = {
      address: selectedLocation?.formatted_address || "",
      lat: selectedLocation?.geometry?.location?.lat() || 0,
      long: selectedLocation?.geometry?.location?.lng() || 0,
    };

    if (venue?.id) {
      postAddressForVenue(venue?.id, addressDTO).then((res) =>
        console.log("Posted address!")
      );
    } else {
      console.log("No venue id");
    }
  };

  return (
    <div>
      <AddressAutoComplete onPlaceSelected={handlePlaceSelected} />
      <Map location={selectedLocation?.geometry?.location?.toJSON() || null} />
      <Button variant="outlined" onClick={handleSaveAddress}>
        Save Address
      </Button>
      <div>{`YOUR ADDRESS IS: ${address?.address}`}</div>
    </div>
  );
};

export default LocationSelector;

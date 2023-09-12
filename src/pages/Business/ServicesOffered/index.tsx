import React, { useEffect, useState } from "react";
import ServiceList from "./ServiceList"; // Ensure you import ServiceList
import AddService from "./AddServiceForm";
import { styled } from "styled-components";
import { useAuth } from "../../../contexts/authContext";
import { ServiceDTO, listServices } from "../../../api/queries";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 16px;
`;

const ServicesOffered = () => {
  const [services, setServices] = useState<ServiceDTO[]>([]);
  const [reload, setReload] = useState(true);

  const { venue } = useAuth();

  // Function to be called when a service is added
  const handleServiceCreated = () => {
    setReload(true);
  };

  useEffect(() => {
    if (reload && venue) {
      listServices(venue.id)
        .then((data) => {
          setServices(data);
          setReload(false); // Reset the reload state
        })
        .catch((error) => console.error("Error listing services:", error));
    }
  }, [reload]);

  return (
    <Container>
      {venue && <ServiceList venueId={venue.id} services={services} />}
      <AddService onServiceCreated={handleServiceCreated} />
    </Container>
  );
};

export default ServicesOffered;

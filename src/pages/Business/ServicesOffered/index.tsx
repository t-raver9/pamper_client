import React, { useEffect, useState } from "react";
import ServiceList from "./ServiceList"; // Ensure you import ServiceList
import AddService from "./AddServiceForm";
import { styled } from "styled-components";
import { useAuth } from "../../../contexts/authContext";
import {
  ServiceDTO,
  deleteService,
  listServicesForVenue,
} from "../../../api/queries";

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
      listServicesForVenue(venue.id)
        .then((data) => {
          setServices(data);
          setReload(false); // Reset the reload state
        })
        .catch((error) => console.error("Error listing services:", error));
    }
  }, [reload]);

  const handleDeleteService = async (serviceId: number) => {
    if (!venue) {
      console.error("No venue found");
      return;
    }

    try {
      await deleteService(venue.id, serviceId);
      // Update services if delete succeeds
      setServices(services.filter((service) => service.id !== serviceId));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <Container>
      {venue && (
        <ServiceList
          venueId={venue.id}
          services={services}
          onDeleteService={handleDeleteService}
        />
      )}
      <AddService onServiceCreated={handleServiceCreated} />
    </Container>
  );
};

export default ServicesOffered;

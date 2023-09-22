import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Typography,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  CategoryDTO,
  deleteService,
  getCategories,
  ServiceDTO,
} from "../../../api/queries";
import ServiceListItem from "./ServiceListItem";

const ServiceListWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
`;

interface ServiceListProps {
  venueId: string;
  services: ServiceDTO[];
  onDeleteService: (serviceId: number) => Promise<void>;
}

const ServiceList = ({
  venueId,
  services,
  onDeleteService,
}: ServiceListProps) => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    getCategories()
      .then((data: CategoryDTO[]) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const getCategoryByCategoryId = (categoryId: number) => {
    return categories.find((category) => category.id === categoryId);
  };

  const getSubCategoryBySubCategoryId = (
    categoryId: number,
    subCategoryId: number
  ) => {
    const category = getCategoryByCategoryId(categoryId);
    if (category) {
      return category.subCategories.find(
        (subCategory) => subCategory.id === subCategoryId
      );
    }
  };

  return (
    <ServiceListWrapper>
      <h2>Service List</h2>
      {categories.map((category) => {
        const servicesInCategory = services.filter(
          (s) => s.categoryId === category.id
        );

        // Only render categories with associated services for the venue
        if (servicesInCategory.length != 0) {
          return (
            <Accordion key={category.id}>
              <AccordionSummary>
                <Typography>{category.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {servicesInCategory.map((service) => (
                    <ServiceListItem
                      key={service.id}
                      service={service}
                      subCategoryName={
                        getSubCategoryBySubCategoryId(
                          service.categoryId,
                          service.subCategoryId
                        )?.name
                      }
                      onDelete={onDeleteService}
                    />
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        }
      })}
    </ServiceListWrapper>
  );
};

export default ServiceList;

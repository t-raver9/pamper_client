import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import {
  CategoryDTO,
  getCategories,
  listServices,
  ServiceDTO,
} from "../../../api/queries";

const ServiceListWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
`;

interface ServiceListProps {
  venueId: string; // Pass the venueId as a prop
  services: ServiceDTO[];
}

const ServiceList: React.FC<ServiceListProps> = ({ venueId, services }) => {
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
      <Typography variant="h2" gutterBottom>
        Service List
      </Typography>
      <List>
        {services.map((service) => (
          <ListItem key={service.id}>
            <ListItemText
              primary={service.description}
              secondary={`Category: ${
                getCategoryByCategoryId(service.categoryId)?.name || "Unknown"
              }, 
             Subcategory: ${
               getSubCategoryBySubCategoryId(
                 service.categoryId,
                 service.subCategoryId
               )?.name || "Unknown"
             },
             Cost: $${service.price}, Duration: ${service.duration} mins`}
            />
          </ListItem>
        ))}
      </List>
    </ServiceListWrapper>
  );
};

export default ServiceList;

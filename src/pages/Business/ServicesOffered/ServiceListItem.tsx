import React from "react";
import { ListItem, Card, CardContent, Typography, Button } from "@mui/material";
import { ServiceDTO } from "../../../api/queries";

interface ServiceListItemProps {
  service: ServiceDTO;
  subCategoryName?: string | null;
  onDelete: (serviceId: number) => void;
}

const ServiceListItem: React.FC<ServiceListItemProps> = ({
  service,
  subCategoryName,
  onDelete,
}) => {
  return (
    <ListItem style={{ marginBottom: "10px" }}>
      <Card variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="body1">
            {`${subCategoryName || "Unknown"} - ${service.duration} mins - $${
              service.price
            }`}
          </Typography>
          <Button
            color="secondary"
            size="small"
            onClick={() => onDelete(service.id)}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default ServiceListItem;

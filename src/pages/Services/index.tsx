import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  listServices,
  ListServicesQuery,
  PaginatedServicesDTO,
} from "../../api/queries";
import { Card, CardContent, Typography, Pagination } from "@mui/material";

const Services = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");

  const [servicesData, setServicesData] = useState<PaginatedServicesDTO | null>(
    null
  );

  const listServicesQuery: ListServicesQuery = {
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    // You might want to add `page` and `limit` here based on pagination
    page: servicesData?.currentPage?.toString() || "1",
    limit: "10", // or any default limit you wish
  };

  useEffect(() => {
    listServices(listServicesQuery)
      .then((result: PaginatedServicesDTO) => {
        console.log("Result: ", result);
        setServicesData(result);
      })
      .catch((error) => console.log("error:", error));
  }, [categoryId, subCategoryId, servicesData?.currentPage]);

  console.log("Services data: ", servicesData);

  return (
    <div>
      {servicesData?.services?.map((service) => (
        <Card key={service.id} style={{ margin: "10px 0" }}>
          <CardContent>
            <Typography variant="h6">{service.description}</Typography>
            <Typography>Price: ${service.price}</Typography>
            <Typography>Duration: {service.duration} minutes</Typography>
          </CardContent>
        </Card>
      ))}

      {/* Pagination */}
      <Pagination
        count={servicesData?.totalPages || 1}
        page={parseInt(servicesData?.currentPage?.toString() || "1")}
        onChange={(_event, value) =>
          setServicesData((prev) => {
            if (!prev) return null;
            return { ...prev, currentPage: value };
          })
        }
        color="primary"
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default Services;

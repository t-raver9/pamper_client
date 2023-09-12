import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import styled from "styled-components";
import {
  CategoryDTO,
  MutateServiceDTO,
  createService,
  getCategories,
} from "../../../api/queries";
import { useAuth } from "../../../contexts/authContext";

const AddServiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
`;

interface AddServiceProps {
  onServiceCreated?: () => void;
}

const AddService: React.FC<AddServiceProps> = ({ onServiceCreated }) => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [cost, setCost] = useState("");
  const [formError, setFormError] = useState(false);

  const { venue } = useAuth();

  useEffect(() => {
    getCategories()
      .then((data: CategoryDTO[]) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    // Clear the selected sub-category when the category changes
    setSubCategory("");
  };

  const handleSubCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSubCategory(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDuration(event.target.value);
  };

  const handleCostChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCost(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation: Check if all fields are filled in
    if (
      !category ||
      !subCategory ||
      !description ||
      !duration ||
      !cost ||
      !venue?.id
    ) {
      setFormError(true);
      return;
    }

    // Reset form error state
    setFormError(false);

    // Map the selected category and subcategory names to their IDs
    const categoryId = categories.find((cat) => cat.name === category)?.id;
    const subCategoryId = subCategoryOptions.find(
      (subCat) => subCat.name === subCategory
    )?.id;

    if (categoryId === undefined || subCategoryId === undefined) {
      console.error("Invalid category or subcategory selected");
      return;
    }

    // Proceed with submitting the data to your API or other actions
    const mutateServiceDTO: MutateServiceDTO = {
      categoryId,
      subCategoryId,
      description,
      duration: parseInt(duration),
      price: parseFloat(cost),
      venueId: venue.id,
    };

    createService(mutateServiceDTO).then(() => {
      if (onServiceCreated) {
        onServiceCreated();
      }
    });
  };

  const subCategoryOptions =
    categories.find((cat) => cat.name === category)?.subCategories || [];

  return (
    <AddServiceWrapper>
      <h2>Add Service</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          select
          required
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.map((categoryOption) => (
            <MenuItem key={categoryOption.id} value={categoryOption.name}>
              {categoryOption.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Sub-category"
          variant="outlined"
          fullWidth
          select
          required
          value={subCategory}
          onChange={handleSubCategoryChange}
          disabled={!category} // Disable if no category is selected
        >
          {subCategoryOptions.map((subCategoryOption) => (
            <MenuItem key={subCategoryOption.id} value={subCategoryOption.name}>
              {subCategoryOption.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <TextField
          label="Duration (mins)"
          variant="outlined"
          type="number"
          fullWidth
          required
          value={duration}
          onChange={handleDurationChange}
        />
        <TextField
          label="Cost (dollars)"
          variant="outlined"
          type="number"
          fullWidth
          required
          value={cost}
          onChange={handleCostChange}
        />
        {formError && (
          <p style={{ color: "red", marginTop: "8px" }}>
            Please fill in all fields.
          </p>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: "16px" }}
          disabled={formError || !category || !subCategory}
        >
          Submit
        </Button>
      </form>
    </AddServiceWrapper>
  );
};

export default AddService;

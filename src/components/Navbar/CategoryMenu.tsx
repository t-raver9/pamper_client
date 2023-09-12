import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { CategoryDTO, getCategories } from "../../api/queries";

const CategoryMenu = () => {
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    getCategories()
      .then((data: CategoryDTO[]) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    // If clicking the already open menu, it will close it
    if (selectedIndex === index) {
      handleClose();
      return;
    }

    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  return (
    <div style={{ display: "flex", marginRight: "auto" }}>
      {categories.map((category, index) => (
        <div key={category.id}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={(event) => handleOpen(event, index)}
          >
            {category.name}
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl) && selectedIndex === index}
            onClose={handleClose}
          >
            {category.subCategories.map((subCategory) => (
              <MenuItem key={subCategory.id} onClick={handleClose}>
                {subCategory.name}
              </MenuItem>
            ))}
          </Menu>
        </div>
      ))}
    </div>
  );
};

export default CategoryMenu;

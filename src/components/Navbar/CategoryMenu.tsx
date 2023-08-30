import React, { useEffect, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

export interface SubCategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

const CategoryMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/categories")
      .then((response) => response.json())
      .then((data: Category[]) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
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
        <div
          key={category.id}
          onMouseLeave={() => {
            console.log("LEAVE");
            handleClose();
          }} // This will close the dropdown when the mouse leaves the button or menu area
        >
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            color="inherit"
            onMouseOver={(event) => handleOpen(event, index)}
            onMouseLeave={(e) => console.log("LEFT PART 2")}
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

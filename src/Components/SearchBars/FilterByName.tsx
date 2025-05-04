import { Delete } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

interface Props {
  onFilterChange: (name: string) => void;
}

const FilterByName = ({ onFilterChange }: Props) => {
  const [value, setValue] = useState<string>("");
  const handleFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFilterChange(e.target.value.toUpperCase());
      setValue(e.target.value.toUpperCase());
    },
    [onFilterChange]
  );
  return (
    <Box component={Paper} position="relative" mb={-2} bgcolor="inherit" p={1}>
      <Typography gutterBottom ml={1} color="white" variant="h6">
        Buscar cliente por nombre
      </Typography>
      <TextField
        fullWidth
        value={value}
        label="Nombre"
        onChange={handleFilter}
      />
      {value && (
        <Tooltip title="Limpiar filtro">
          <IconButton
            type="button"
            onClick={() => {
              setValue("");
            }}
            color="primary"
            sx={{
              position: "absolute",
              right: 20,
              top: 54,
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default FilterByName;

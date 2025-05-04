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
  onFilterChange: (licence: string) => void;
}

const FilterByLicence = ({ onFilterChange }: Props) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleFilter = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.toUpperCase();
      setValue(newValue);
      const isValidLicence = /^([A-Z]{2}\d{3}[A-Z]{2}|[A-Z]{3}\d{3})$/.test(
        newValue
      );
      if (newValue === "") {
        setError(null);
        onFilterChange("");
        return;
      }
      if (isValidLicence) {
        setIsValid(true);
        setError(null);
        onFilterChange(newValue);
      } else {
        setIsValid(false);
        setError("Formato de patente incorrecto");
      }
    },
    [onFilterChange]
  );
  return (
    <Box component={Paper} position="relative" mb={-2} bgcolor="inherit" p={1}>
      <Typography gutterBottom ml={1} color="white" variant="h6">
        Buscar automóvil por patente
      </Typography>
      <TextField
        fullWidth
        value={value}
        error={!!error}
        helperText={!!error && value && error}
        placeholder="ABC123 ó AB123CD"
        onChange={handleFilter}
      />
      {value && (
        <Tooltip
          title="Limpiar filtro"
          slotProps={{
            tooltip: { sx: { bgcolor: isValid ? "" : "error.dark" } },
          }}
        >
          <IconButton
            type="button"
            onClick={() => {
              setValue("");
              setError(null);
            }}
            color={isValid ? "primary" : "error"}
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

export default FilterByLicence;

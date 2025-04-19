import {
  Autocomplete,
  Box,
  Paper,
  TextField,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { BRANDS } from "../../utils";
import { useAddCarForm } from "../../Hooks/useAddCarForm";

const AddCarForm = () => {
  const {
    carFields,
    ownerFields,
    loading,
    handleCarChange,
    handleOwnerChange,
    setCreateCar,
    onSubmit,
  } = useAddCarForm();

  return (
    <form>
      <Grid
        container
        component={Paper}
        p={3}
        spacing={2}
        size={12}
        sx={{
          backgroundColor: "inherit",
        }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="h4"
              mb={2}
              textAlign={"center"}
              fontWeight={600}
              px={2}
              py={1}
              borderRadius={1.5}
              width={"fit-content"}
              color="#FFF0FF"
              bgcolor={"#2c387e"}
            >
              Titular
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            gap={2}
            width={"100%"}
          >
            {ownerFields.map(({ label, name, value }, i) => (
              <TextField
                required={name !== "email"}
                key={i}
                fullWidth
                label={label}
                name={name}
                value={value}
                onChange={handleOwnerChange}
              />
            ))}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography
              variant="h4"
              mb={2}
              textAlign={"center"}
              fontWeight={600}
              px={2}
              py={1}
              borderRadius={1.5}
              width={"fit-content"}
              color="#FFF0FF"
              bgcolor={"#2c387e"}
            >
              Vehículo
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            gap={2}
            width={"100%"}
          >
            {carFields.map(({ label, name, value }, i) =>
              name !== "brand" ? (
                <TextField
                  key={i}
                  fullWidth
                  label={label}
                  name={name}
                  value={value ?? ""}
                  type="text"
                  inputMode={
                    ["year", "kilometers"].includes(name) ? "numeric" : "text"
                  }
                  onChange={handleCarChange}
                />
              ) : (
                <Autocomplete
                  blurOnSelect
                  fullWidth
                  noOptionsText="No existe esa marca"
                  key={i}
                  onChange={(_, value) => {
                    setCreateCar((prev) => ({
                      ...prev,
                      brand: value,
                    }));
                  }}
                  options={BRANDS}
                  renderInput={(params) => (
                    <TextField {...params} label={label} />
                  )}
                />
              )
            )}
          </Box>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              onClick={onSubmit}
              loading={loading}
              fullWidth
              variant="contained"
              sx={{ width: "50%" }}
            >
              Guardar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddCarForm;

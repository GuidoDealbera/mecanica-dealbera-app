import { Controller, useForm } from "react-hook-form";
import FormWrapper from "./FormWrapper";
import { CreateCarJob, JobStatus } from "../../Types/apiTypes";
import { useEffect } from "react";
import { Car } from "../../Types/types";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCarQueries } from "../../Hooks/useCarQueries";
import { Delete } from "@mui/icons-material";

interface Props {
  onSubmit: (data: any) => void;
  selectedCar?: Car | null;
  isLoading?: boolean;
  isEditing?: boolean;
  initialValues?: CreateCarJob;
  setSelectedCar?: (car: Car | null) => void;
}

const AddJobCarForm = ({
  onSubmit,
  selectedCar,
  isLoading,
  isEditing,
  initialValues,
  setSelectedCar,
}: Props) => {
  const { allCars } = useCarQueries();
  const form = useForm<CreateCarJob>({
    mode: "onChange",
    defaultValues: {
      price: "",
      description: "",
      isThirdParty: false,
      status: JobStatus.IN_PROGRESS,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    setValue,
  } = form;

  useEffect(() => {
    if (initialValues) {
      setValue("price", initialValues.price);
      setValue("description", initialValues.description);
      setValue("isThirdParty", initialValues.isThirdParty);
      setValue("status", initialValues.status);
    }
  }, [initialValues, setValue]);

  const handleSelectCar = (event: SelectChangeEvent<unknown>) => {
    const selectedCar = allCars.find(
      (car) => car.licensePlate === event.target.value
    );
    if (selectedCar) {
      setSelectedCar?.(selectedCar);
    }
  };

  return (
    <FormWrapper form={form}>
      {allCars.length === 0 ? (
        <Typography variant="h6" color="white" textAlign="center" mt={5}>
          No hay automóviles registrados. Por favor, cargue uno y vuelva
        </Typography>
      ) : (
        <FormControl fullWidth sx={{ position: "relative", mb: 2 }}>
          {!!selectedCar && (
            <Tooltip
              sx={{ position: "absolute", right: 40, zIndex: 10, top: 8 }}
              title="Limpiar selección"
              color="error"
            >
              <IconButton
                onClick={() => setSelectedCar?.(null)}
                color="primary"
              >
                <Delete />
              </IconButton>
            </Tooltip>
          )}
          <InputLabel>Seleccione un automóvil para continuar</InputLabel>
          <Select
            value={selectedCar?.licensePlate ?? ""}
            onChange={handleSelectCar}
            label="Seleccione un automóvil para continuar"
          >
            {allCars.map((car, i) => (
              <MenuItem key={i} value={car.licensePlate}>
                {car.licensePlate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {selectedCar && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            px={2}
            py={1}
            borderRadius={1.5}
            width={"fit-content"}
            color="#FFF0FF"
            bgcolor={"#2c387e"}
            gutterBottom
          >
            Detalle del trabajo
          </Typography>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                value={field.value}
                onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, "");
                  if (onlyNums) {
                    field.onChange(Number(onlyNums));
                  } else {
                    field.onChange("");
                  }
                }}
                slotProps={{
                  input: {
                    startAdornment: field.value && (
                      <InputAdornment position="start">
                        <Typography color="white">$</Typography>
                      </InputAdornment>
                    ),
                  },
                }}
                label="Precio"
              />
            )}
          />
          <Controller
            name="isThirdParty"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{ width: "30%" }}
                {...field}
                control={<Checkbox checked={!!field.value} />}
                value={field.value}
                onChange={field.onChange}
                label={`Trabajo ${field.value ? "de terceros" : "propio"} `}
                slotProps={{ typography: { color: "white" } }}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  label="Estado"
                  {...field}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <MenuItem value={JobStatus.IN_PROGRESS}>EN PROCESO</MenuItem>
                  <MenuItem value={JobStatus.COMPLETED}>COMPLETADO</MenuItem>
                  <MenuItem value={JobStatus.DELIVERED}>ENTREGADO</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({field}) => (
              <TextField
                {...field}
                value={field.value}
                onChange={field.onChange}
                fullWidth
                multiline
                minRows={5}
                maxRows={10}
                label="Descripción del trabajo"
              />
            )}
          />
          <Button type="submit" fullWidth startIcon={isLoading ? <CircularProgress size={24}/> : null} disabled={!isValid || !isDirty} variant="contained">
            {isLoading ? "Cargando" : isEditing ? "Actualizar trabajo" : "Cargar trabajo"}
          </Button>
        </form>
      )}
    </FormWrapper>
  );
};

export default AddJobCarForm;

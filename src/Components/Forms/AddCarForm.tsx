import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { BRANDS } from "../../utils";
import { CreateCarBody } from "../../Types/apiTypes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useClientQueries } from "../../Hooks/useClientQueries";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { Client } from "../../Types/types";

interface Props {
  onSubmit: (data: CreateCarBody) => void;
  isLoading?: boolean;
}

const AddCarForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const { getAllClients } = useClientQueries();
  const [selectedOwner, setSelectedOwner] = useState<Client | null | undefined>(
    null
  );

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
    setValue,
  } = useForm<CreateCarBody>({
    mode: "onChange",
    defaultValues: {
      brand: "",
      kilometers: "",
      licensePlate: "",
      model: "",
      owner: {
        address: "",
        city: "",
        email: "",
        fullname: "",
        phone: "",
      },
      year: "",
    },
  });
  const { allClients } = useSelector((state: RootState) => state.clients);

  const filterClient = useCallback(
    (fullname: string | null) => {
      const filtered = allClients.find(
        (client) => client.fullname === fullname
      );
      setSelectedOwner(filtered);
    },
    [allClients]
  );

  const clientsNames = useMemo(() => {
    return allClients.map((client) => client.fullname);
  }, [allClients]);

  useEffect(() => {
    getAllClients();
  }, []);

  useEffect(() => {
    if (selectedOwner) {
      setValue("owner.address", selectedOwner.address);
      setValue("owner.city", selectedOwner.city);
      setValue("owner.email", selectedOwner.email);
      setValue("owner.fullname", selectedOwner.fullname);
      setValue("owner.phone", selectedOwner.phone);
    }
  }, [selectedOwner, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container size={12} spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            bgcolor="inherit"
            p={1}
            display="flex"
            flexDirection="column"
            gap={3}
            mt={2}
          >
            {/*Titular del vehículo*/}
            <Typography
              variant="h5"
              fontWeight={600}
              px={2}
              py={1}
              borderRadius={1.5}
              width={"fit-content"}
              color="#FFF0FF"
              bgcolor={"#2c387e"}
            >
              Datos del titular
            </Typography>
            <Controller
              name="owner.fullname"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
              }}
              render={({ field }) =>
                clientsNames.length > 0 ? (
                  <Autocomplete
                    {...field}
                    options={clientsNames}
                    value={field.value}
                    onChange={(_, value) => {
                      filterClient(value);
                      field.onChange(value?.toUpperCase());
                    }}
                    disabled={isLoading}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        label="Nombre completo"
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                        {...params}
                      />
                    )}
                  />
                ) : (
                  <TextField
                    {...field}
                    label="Nombre completo"
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    fullWidth
                  />
                )
              }
            />
            <Controller
              name="owner.phone"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Teléfono"
                  value={field.value}
                  onChange={(e) => {
                    const cleanedValue = e.target.value.replace(/[^\d+]/g, "");
                    field.onChange(cleanedValue);
                  }}
                  disabled={isLoading}
                  error={field.value ? !!error : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="owner.address"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Dirección"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  disabled={isLoading}
                  error={field.value ? !!error : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="owner.city"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Localidad"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  disabled={isLoading}
                  error={field.value ? !!error : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="owner.email"
              control={control}
              rules={{
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Correo electrónico inválido",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  type="email"
                  label="Correo electrónico"
                  value={field.value}
                  onChange={field.onChange}
                  disabled={isLoading}
                  error={field.value ? !!error : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            bgcolor="inherit"
            p={1}
            display="flex"
            flexDirection="column"
            gap={3}
            mt={2}
          >
            {/*Vehículo*/}
            <Typography
              variant="h5"
              fontWeight={600}
              px={2}
              py={1}
              borderRadius={1.5}
              width={"fit-content"}
              color="#FFF0FF"
              bgcolor={"#2c387e"}
            >
              Datos del vehículo
            </Typography>
            <Controller
              name="licensePlate"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
                pattern: {
                  value: /^([A-Z]{2}\d{3}[A-Z]{2}|[A-Z]{3}\d{3})$/,
                  message: "Formato inválido",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Patente"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  disabled={isLoading}
                  error={field.value ? !!error : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="brand"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
              }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  {...field}
                  freeSolo
                  options={BRANDS}
                  onChange={(_, value) => field.onChange(value?.toUpperCase())}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Marca"
                      onChange={(e) =>
                        field.onChange(e.target.value.toUpperCase())
                      }
                      error={field.value ? !!error : false}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="model"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Modelo"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                  disabled={isLoading}
                  error={field.value ? !!error : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Año"
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[\d]*$/.test(value)) {
                      if (value === "") {
                        field.onChange("");
                      } else {
                        field.onChange(Number(value));
                      }
                    }
                  }}
                  disabled={isLoading}
                  error={field.value ? !!error : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              name="kilometers"
              control={control}
              rules={{
                required: { value: true, message: "Campo obligatorio" },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Kilometraje"
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[\d]*$/.test(value)) {
                      if (value === "") {
                        field.onChange("");
                      } else {
                        field.onChange(Number(value));
                      }
                    }
                  }}
                  disabled={isLoading}
                  error={field.value ? !!error : false}
                  helperText={error?.message}
                  fullWidth
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          type="submit"
          variant="contained"
          startIcon={
            isLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
          }
          disabled={isLoading || !isDirty || !isValid}
        >
          {isLoading ? "Guardando" : "Guardar"}
        </Button>
      </Box>
    </form>
  );
};

export default AddCarForm;

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
import FormWrapper from "./FormWrapper";
import dayjs from "dayjs";
import { CustomDatePicker } from "../CustomDatePicker";

interface Props {
  onSubmit: (data: CreateCarBody) => void;
  isLoading?: boolean;
  initialValues?: Partial<CreateCarBody>;
  isEditing?: boolean;
  readonly?: boolean;
}

const AddCarForm: React.FC<Props> = ({
  onSubmit,
  isLoading,
  initialValues,
  isEditing = false,
  readonly = false,
}) => {
  const { getAllClients } = useClientQueries();
  const [selectedOwner, setSelectedOwner] = useState<Client | undefined>();

  const form = useForm<CreateCarBody>({
    mode: "onChange",
    defaultValues: {
      brand: undefined,
      kilometers: undefined,
      licensePlate: "",
      model: "",
      owner: {
        address: "",
        city: "",
        email: "",
        fullname: "",
        phone: "",
      },
      year: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isDirty, errors, dirtyFields, isValid },
    setValue,
    reset,
  } = form;
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
    if (!allClients || allClients.length === 0) return null;
    return allClients.map((client) => client.fullname);
  }, [allClients]);

  const shouldEnableSubmit = isEditing ? isDirty && isValid : isValid;

  useEffect(() => {
    getAllClients();
  }, []);

  useEffect(() => {
    if (selectedOwner) {
      setValue("owner.address" as const, selectedOwner.address);
      setValue("owner.city" as const, selectedOwner.city);
      setValue("owner.email" as const, selectedOwner.email);
      setValue("owner.fullname" as const, selectedOwner.fullname);
      setValue("owner.phone" as const, selectedOwner.phone);
    } else {
      setValue("owner.address" as const, "");
      setValue("owner.city" as const, "");
      setValue("owner.email" as const, "");
      setValue("owner.fullname" as const, "");
      setValue("owner.phone" as const, "");
    }
  }, [selectedOwner, setValue]);

  useEffect(() => {
    if (!isEditing && initialValues) {
      reset(initialValues);
    }
  }, [initialValues, isEditing, reset]);

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues]);

  return (
    <FormWrapper form={form}>
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
                  validate: (value) => {
                    if (value.length < 4) {
                      return "El nombre es muy corto";
                    }
                    return true;
                  },
                }}
                disabled={isLoading || readonly}
                render={({ field, fieldState: { error } }) =>
                  clientsNames && clientsNames.length > 0 ? (
                    <Autocomplete
                      {...field}
                      options={clientsNames}
                      value={field.value}
                      onChange={(_, value) => {
                        filterClient(value);
                        field.onChange(value?.toUpperCase());
                      }}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          label="Nombre completo"
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                          error={!!error}
                          helperText={error?.message}
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
                      error={!!error}
                      helperText={error?.message}
                      disabled={isLoading || readonly}
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
                disabled={isLoading || readonly}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Teléfono"
                    value={field.value}
                    onChange={(e) => {
                      const cleanedValue = e.target.value.replace(
                        /[^\d+]/g,
                        ""
                      );
                      field.onChange(cleanedValue);
                    }}
                    error={!!error}
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
                disabled={isLoading || readonly}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Dirección"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    error={!!error}
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
                disabled={isLoading || readonly}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Localidad"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    error={!!error}
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
                disabled={isLoading || readonly}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Correo electrónico"
                    value={field.value}
                    onChange={field.onChange}
                    error={!!error}
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
                disabled={isLoading || readonly}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Patente"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    error={!!error}
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
                disabled={isLoading || readonly}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    options={BRANDS}
                    onChange={(_, value) =>
                      field.onChange(value?.toUpperCase())
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Marca"
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                        error={!!error}
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
                disabled={isLoading || readonly}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Modelo"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    error={!!error}
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
                  validate: (value) => {
                    const currentYear = dayjs().year();
                    if (Number(value) > currentYear)
                      return "El año no puede ser posterior al año en curso";
                    return true;
                  },
                }}
                disabled={isLoading || readonly}
                render={({
                  field: { onChange, value, ...field },
                  fieldState: { error },
                }) => (
                  <CustomDatePicker
                    {...field}
                    label="Año"
                    views={["year"]}
                    value={value ? dayjs(`${value}-01-01`) : null} // transforma string/año a dayjs
                    maxDate={dayjs().startOf("year")}
                    onChange={(newValue) => {
                      const selectedYear = newValue ? newValue.year() : "";
                      onChange(selectedYear); // guarda sólo el año (número)
                    }}
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name="kilometers"
                control={control}
                rules={{
                  required: { value: true, message: "Campo obligatorio" },
                }}
                disabled={isLoading || readonly}
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
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                  />
                )}
              />
            </Box>
          </Grid>
        </Grid>
        {!readonly && (
          <Button
            type="submit"
            variant="contained"
            fullWidth
            startIcon={
              isLoading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
            }
            disabled={isLoading || !shouldEnableSubmit}
          >
            {isLoading
              ? isEditing
                ? "Actualizando..."
                : "Guardando..."
              : isEditing
              ? "Actualizar Vehículo"
              : "Guardar Vehículo"}
          </Button>
        )}
      </form>

      <Box mt={2} p={2} bgcolor="grey.100">
        <Typography variant="caption" color="textPrimary">
          Debug Info: isDirty: {isDirty.toString()}, isValid:{" "}
          {isValid.toString()}, dirtyFields: ,{JSON.stringify(dirtyFields)}
          Errors: {JSON.stringify(errors)}
        </Typography>
      </Box>
    </FormWrapper>
  );
};

export default AddCarForm;

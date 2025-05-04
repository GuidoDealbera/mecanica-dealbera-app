import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import LicencePlate from "../Components/Licences/LicencePlate";
import { useEffect } from "react";
import { useCarQueries } from "../Hooks/useCarQueries";
import CustomLoader from "../Components/CustomLoader";
import { Add, Refresh } from "@mui/icons-material";
import CustomDataGrid from "../Components/CustomDataGrid";
import { useTable } from "../Hooks/useTable";

const CarDetail = () => {
  const { license } = useParams();
  const {jobsColumns} = useTable();
  const {
    getCarDetail,
    car,
    error,
    refreshCar,
    refreshing,
    loading,
    loadingStates,
    clean,
  } = useCarQueries();
  useEffect(() => {
    if (license) {
      getCarDetail(license);
    }
    return () => {
      clean();
    };
  }, []);

  const isLoading = loading || refreshing || loadingStates.fetching;

  if (error) {
    return (
      <Box
        p={2}
        position="absolute"
        left={10}
        borderRadius={2}
        right={10}
        sx={{ bgcolor: "error.dark" }}
      >
        <Typography
          textAlign="center"
          fontSize={30}
          sx={{ bgcolor: "error.main", color: "whitesmoke", fontWeight: 600 }}
          p={2}
          borderRadius={2}
        >
          Error en el servidor !!!
        </Typography>
      </Box>
    );
  }
  return license && car ? (
    <Box
      component={Paper}
      p={1}
      bgcolor="inherit"
      display="flex"
      flexDirection="column"
      gap={2}
      color={"whitesmoke"}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Typography variant="h4" color="#FFF0FF">
          Detalle del vehículo
        </Typography>
        <Box display='flex' gap={2}>
          <Button
            onClick={() => refreshCar(license)}
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Refresh />}
          >
            {refreshing || loadingStates.fetching
              ? "Actualizando"
              : "Actualizar"}
          </Button>
          <Button startIcon={<Add />} variant="contained" disabled={isLoading}>
            Agregar trabajo
          </Button>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <LicencePlate licence={car.licensePlate} />
        <Box>
          <Typography variant="h6">Titular: {car.owner.fullname}</Typography>
          <Typography variant="h6">Marca: {car.brand}</Typography>
          <Typography variant="h6">Modelo: {car.model}</Typography>
          <Typography variant="h6">Año: {car.year}</Typography>
        </Box>
      </Box>
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
        Listado de trabajos
      </Typography>
      <CustomDataGrid rows={car.jobs} columns={jobsColumns} loading={isLoading} />
    </Box>
  ) : (
    <CustomLoader size={70} />
  );
};

export default CarDetail;

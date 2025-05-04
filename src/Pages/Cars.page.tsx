import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useCarQueries } from "../Hooks/useCarQueries";
import CustomDataGrid from "../Components/CustomDataGrid";
import { useNavigate } from "react-router-dom";
import { Add, Refresh } from "@mui/icons-material";
import FilterByLicence from "../Components/SearchBars/FilterByLicence";
import { useTable } from "../Hooks/useTable";
import TablePlate from "../Components/Licences/TablesPlates";

const Cars = () => {
  const navigate = useNavigate();
  const { carsColumns, openDialog, selectedLicence, setOpenDialog, handleDelete } =
    useTable();
  const {
    getAllCars,
    refresh,
    refreshing,
    loading,
    allCars,
    loadingStates,
  } = useCarQueries();
  const [licenceFilter, setLicenceFilter] = useState<string>("");

  
  useEffect(() => {
    getAllCars();
  }, []);

  const filteredCars = useMemo(() => {
    if (!licenceFilter) return allCars;
    return allCars.filter(
      (car) =>
        car.licensePlate.toLowerCase().trim() ===
        licenceFilter.toLowerCase().trim()
    );
  }, [allCars, licenceFilter]);

  const filterLicence = useMemo(() => {
    return allCars.find((car) => car.licensePlate === selectedLicence);
  }, [allCars, selectedLicence]);
  const isLoading = refreshing || loading || loadingStates.fetching_all;
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color="#FFF0FF">
          Listado de vehículos
        </Typography>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={1}
        >
          <Button
            onClick={refresh}
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Refresh />}
          >
            {refreshing || loadingStates.fetching_all
              ? "Actualizando"
              : "Actualizar"}
          </Button>
          <Button
            startIcon={<Add />}
            variant="contained"
            disabled={isLoading}
            onClick={() => navigate("/cars/new")}
          >
            Añadir automóvil
          </Button>
        </Box>
      </Box>
      <FilterByLicence onFilterChange={setLicenceFilter} />
      <CustomDataGrid
        rows={filteredCars}
        columns={carsColumns}
        localeText={{ noRowsLabel: "No hay vehículos registrados" }}
        loading={isLoading}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {"Estás por eliminar el automóvil con la siguiente patente:"}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TablePlate
            dialog={true}
            licence={filterLicence ? filterLicence.licensePlate : ""}
          />
          <DialogContentText>
            ¿Estás seguro de querer eliminarlo?
          </DialogContentText>
          <DialogActions>
            <Button sx={{
              "&:hover": {
                bgcolor: "primary.dark",
                color: "white"
              }
            }} variant="outlined" onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button
              color="error"
              variant="outlined"
              sx={{
                "&:hover": {
                  bgcolor: "error.dark",
                  color: "white",
                },
              }}
              onClick={() => handleDelete(filterLicence?.licensePlate)}
            >
              Eliminar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Cars;

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCarQueries } from "../Hooks/useCarQueries";
import CustomLoader from "../Components/CustomLoader";
import { Add, Edit, Refresh } from "@mui/icons-material";
import CustomDataGrid from "../Components/CustomDataGrid";
import { useTable } from "../Hooks/useTable";
import AddCarForm from "../Components/Forms/AddCarForm";

const CarDetail = () => {
  const { license } = useParams();
  const { jobsColumns } = useTable();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    car,
    error,
    loading,
    refreshing,
    loadingStates,
    getCarDetail,
    refreshCar,
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

  const handleChangeTab = (_event: React.SyntheticEvent, newTab: number) => {
    setActiveTab(newTab);
  };

  const handleEdit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };
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
        <Box display="flex" gap={2}>
          <Button
            onClick={() => refreshCar(license)}
            variant="contained"
            disabled={isLoading || isEditing}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Refresh />}
          >
            {refreshing || loadingStates.fetching
              ? "Actualizando"
              : "Actualizar"}
          </Button>
          <Button
            onClick={handleEdit}
            startIcon={<Edit />}
            variant="contained"
            disabled={isLoading}
            color={isEditing ? "error" : "primary"}
          >
            {isEditing ? "Cancelar edición" : "Editar"}
          </Button>
        </Box>
      </Box>
      <Tabs
        sx={{
          "& .MuiTab-root": {
            color: "gray", // color por defecto
          },
          "& .Mui-selected": {
            color: "black", // color cuando está seleccionada
            fontWeight: 600,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#1de9b6", // o cualquier otro color
          },
        }}
        value={activeTab}
        onChange={handleChangeTab}
      >
        <Tab label="Datos del vehículo" />
        <Tab label="Datos del vehículo" />
      </Tabs>
      {activeTab === 0 && (
        <AddCarForm
          initialValues={car}
          onSubmit={() => {}}
          isLoading={isLoading}
          isEditing={isEditing}
          readonly={!isEditing}
        />
      )}
      {activeTab === 1 && (
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='flex-end'>
          <Button variant="contained" startIcon={<Add/>} sx={{mr: 1}} onClick={() => {}}>
            Agregar trabajo
          </Button>
          <CustomDataGrid rows={car.jobs} columns={jobsColumns} />
        </Box>
      )}
    </Box>
  ) : (
    <CustomLoader size={70} />
  );
};

export default CarDetail;

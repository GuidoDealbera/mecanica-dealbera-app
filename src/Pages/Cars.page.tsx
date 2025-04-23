import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useEffect } from "react";
import { useQueries } from "../Hooks/useQueries";
import CustomDataGrid from "../Components/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import TableCell from "../Components/TableCell";
import { useNavigate } from "react-router-dom";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";

const Cars = () => {
  const navigate = useNavigate();
  const { getAllCars } = useQueries();
  const { allCars } = useSelector((state: RootState) => state.cars);
  useEffect(() => {
    getAllCars();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "licensePlate",
      renderHeader: () => <Typography>PATENTE</Typography>,
      align: "center",
      minWidth: 120,
      maxWidth: 150,
      renderCell: (params) => (
        <TableCell value={params.value} field="licence" />
      ),
    },
    {
      field: "owner",
      renderHeader: () => <Typography>DUEÑO</Typography>,
      align: "center",
      renderCell: (params) => <TableCell value={params.value.fullname} />,
    },
    {
      field: "brand",
      renderHeader: () => <Typography>MARCA</Typography>,
      align: "center",
      renderCell: (params) => <TableCell value={params.value} />,
    },
    {
      field: "model",
      renderHeader: () => <Typography>MODELO</Typography>,
      align: "center",
      renderCell: (params) => <TableCell value={params.value} />,
    },
    {
      field: "year",
      renderHeader: () => <Typography>AÑO</Typography>,
      align: "center",
      minWidth: 100,
      maxWidth: 100,
      renderCell: (params) => <TableCell value={params.value} />,
    },
    {
      field: "kilometers",
      renderHeader: () => <Typography>KILOMETRAJE</Typography>,
      align: "center",
      minWidth: 150,
      maxWidth: 150,
      renderCell: (params) => (
        <TableCell value={params.value.toLocaleString("es-AR")} />
      ),
    },
    {
      field: "actions",
      renderHeader: () => <Typography>ACCIONES</Typography>,
      align: "center",
      minWidth: 150,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 0.5,
          }}
        >
          <IconButton>
            <Tooltip
              title="Editar"
              slotProps={{ tooltip: { sx: { bgcolor: "grey" } } }}
            >
              <Edit />
            </Tooltip>
          </IconButton>
          <IconButton color="primary" onClick={() => navigate(`/cars/${params.row.licensePlate}`)}>
            <Tooltip title="Ver">
              <Visibility />
            </Tooltip>
          </IconButton>
          <IconButton sx={{ color: "error.dark" }}>
            <Tooltip title='Eliminar'
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'error.dark'
                  }
                }
              }}
            >
              <Delete />
            </Tooltip>
          </IconButton>
        </Box>
      ),
    },
  ];
  return (
    <Box display="flex" flexDirection="column" gap={5}>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          startIcon={<Add />}
          variant="contained"
          onClick={() => navigate("/cars/new")}
        >
          Añadir automóvil
        </Button>
      </Box>
      <CustomDataGrid rows={allCars} columns={columns} />
    </Box>
  );
};

export default Cars;

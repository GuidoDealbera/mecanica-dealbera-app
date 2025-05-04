import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import TableCell from "../Components/TableCell";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import { useCarQueries } from "./useCarQueries";

export const useTable = () => {
  const navigate = useNavigate();
  const { deleteOneCar, getAllCars } = useCarQueries();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedLicence, setSelectedLicence] = useState<string>("");
  const handleOpenDialog = (licence: string) => {
    setSelectedLicence(licence);
    setOpenDialog(true);
  };

  const handleDelete = useCallback(
    async (licence?: string) => {
      if (licence) {
        await deleteOneCar(licence);
        await getAllCars();
      }
      setOpenDialog(false);
    },
    [deleteOneCar]
  );

  const carsColumns: GridColDef[] = [
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
      renderHeader: () => <Typography>TITULAR</Typography>,
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
          <IconButton
            color="primary"
            onClick={() => navigate(`/cars/${params.row.licensePlate}`)}
          >
            <Tooltip title="Ver">
              <Visibility />
            </Tooltip>
          </IconButton>
          <IconButton
            sx={{ color: "error.dark" }}
            onClick={() => handleOpenDialog(params.row.licensePlate)}
          >
            <Tooltip
              title="Eliminar"
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: "error.dark",
                  },
                },
              }}
            >
              <Delete />
            </Tooltip>
          </IconButton>
        </Box>
      ),
    },
  ];

  const clientColumns: GridColDef[] = [
    {
      field: "id",
    },
    {
      field: "fullname",
      renderHeader: () => <Typography>NOMBRE</Typography>,
      align: "center",
      renderCell: (params) => <TableCell value={params.value} />,
    },
    {
      field: "phone",
      renderHeader: () => <Typography>TELÉFONO</Typography>,
      align: "center",
      renderCell: (params) => <TableCell value={params.value} />,
    },
    {
      field: "address",
      renderHeader: () => <Typography>DIRECCIÓN</Typography>,
      align: "center",
      renderCell: (params) => <TableCell value={params.value} />,
    },
    {
      field: "city",
      renderHeader: () => <Typography>LOCALIDAD</Typography>,
      align: "center",
      renderCell: (params) => <TableCell value={params.value} />,
    },
    {
      field: "email",
      renderHeader: () => <Typography>CORREO ELECTRÓNICO</Typography>,
      align: "center",
      minWidth: 210,
      renderCell: (params) => <TableCell value={params.value} />,
    },
    {
      field: "cars",
      renderHeader: () => <Typography>VEHÍCULOS</Typography>,
      align: "center",
      renderCell: (params) => {
        let value;
        const isUniqueCar = params.value.length === 1;
        if (isUniqueCar) {
          value = params.value[0].licensePlate;
        } else {
          value = params.value.length;
        }

        return (
          <TableCell
            value={String(value)}
            field={isUniqueCar ? "licence" : ""}
          />
        );
      },
    },
  ];

  const jobsColumns: GridColDef[] = [
    {
      field: "id"
    }
  ]

  return {
    carsColumns,
    clientColumns,
    jobsColumns,
    openDialog,
    selectedLicence,
    setOpenDialog,
    handleDelete,

  };
};

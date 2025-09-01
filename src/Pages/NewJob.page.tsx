import { Box, Paper, Typography } from "@mui/material";
import { useCarQueries } from "../Hooks/useCarQueries";
import { CreateCarJob } from "../Types/apiTypes";
import { useEffect, useState } from "react";
import { Car } from "../Types/types";
import AddJobCarForm from "../Components/Forms/AddJobCarForm";
import { useToasts } from "../Hooks/useToast";

const NewJob = () => {
  const { showToast } = useToasts();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const { loading, createCarJob, getAllCars } = useCarQueries();

  const handleSubmit = async (data: CreateCarJob) => {
    try {
      if (!selectedCar) {
        showToast("Por favor seleccione un automóvil", "warning");
      } else {
        await createCarJob(selectedCar.id, data);
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, "error");
      } else {
        showToast("Error al registrar trabajo", "error");
      }
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <Box component={Paper} p={3} bgcolor="inherit">
      <Typography
        variant="h4"
        fontWeight={600}
        px={2}
        py={1}
        borderRadius={1.5}
        color="#FFF0FF"
      >
        Registrar nuevo trabajo
      </Typography>
      <AddJobCarForm
        isLoading={loading}
        onSubmit={handleSubmit}
        setSelectedCar={setSelectedCar}
        selectedCar={selectedCar}
      />
    </Box>
  );
};

export default NewJob;

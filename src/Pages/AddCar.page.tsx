import { Box, Paper, Typography } from "@mui/material";
import AddCarForm from "../Components/Forms/AddCarForm";
import { useQueries } from "../Hooks/useQueries";
import { CreateCarBody } from "../Types/apiTypes";
import { ToastError } from "../ToastAlerts/alerts";

const AddCar = () => {
  const { loading, create } = useQueries();
  const handleSubmit = async (data: CreateCarBody) => {
    try {
      await create(data);
    } catch (error) {
      if (error instanceof Error) {
        ToastError(error.message);
      } else {
        ToastError("Error al registrar automóvil");
      }
    }
  };
  return (
    <Box component={Paper} p={3} bgcolor='inherit'>
      <Typography
        variant="h4"
        fontWeight={600}
        px={2}
        py={1}
        borderRadius={1.5}
        color="#FFF0FF"
      >
        Registrar nuevo vehículo
      </Typography>
      <AddCarForm isLoading={loading} onSubmit={handleSubmit} />
    </Box>
  );
};

export default AddCar;

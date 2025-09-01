import { Box, Paper, Typography } from "@mui/material";
import AddCarForm from "../Components/Forms/AddCarForm";
import { useCarQueries } from "../Hooks/useCarQueries";
import { CreateCarBody } from "../Types/apiTypes";
import { useToasts } from "../Hooks/useToast";

const AddCar = () => {
  const { loading, create } = useCarQueries();
  const {showToast} = useToasts()
  const handleSubmit = async (data: CreateCarBody) => {
    try {
      await create(data);
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      } else {
        showToast("Error al registrar automóvil", 'error');
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
      <AddCarForm isLoading={loading} onSubmit={handleSubmit} isEditing={false}/>
    </Box>
  );
};

export default AddCar;

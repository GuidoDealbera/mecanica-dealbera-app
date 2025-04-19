import { DirectionsCarFilled, PostAdd } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      height="100%"
    >
      <Typography
        variant="h1"
        fontSize={{ xs: 40, sm: 60, md: 80, lg: 100 }}
        textAlign="center"
        sx={{ color: "#FF6F00", fontStyle: "italic" }}
      >
        MECÁNICA DEALBERA
      </Typography>
      <Box display="flex" justifyContent="space-evenly" width={"100%"}>
        <Button
        onClick={() => navigate('/cars/new')}
          variant="contained"
          startIcon={<DirectionsCarFilled />}
          sx={{ py: 2 }}
        >
          Ingresar vehículo
        </Button>
        <Button variant="contained" startIcon={<PostAdd />} sx={{ py: 2 }}>
          Nuevo trabajo
        </Button>
      </Box>
    </Box>
  );
};

export default Home;

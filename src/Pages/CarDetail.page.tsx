import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import LicencePlate from "../Components/Licences/LicencePlate";

const CarDetail = () => {
  const { license } = useParams();
  return (
    <Box>
      <LicencePlate licence={license ? license : ""} />
    </Box>
  );
};

export default CarDetail;

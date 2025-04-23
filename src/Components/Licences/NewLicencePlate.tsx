import { Box, Typography } from "@mui/material";
import { formatLicence } from "../../utils";

interface Props {
  licence: string;
  width?: string | number;
}

const NewLicencePlate: React.FC<Props> = ({ licence, width }) => {
  return (
    <Box position="relative" width="fit-content">
      <Box component="img" src="/newLicence.png" width={width ?? 250} />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        bgcolor="white"
        height={50}
        top={25}
        left={5}
        right={5}
      >
        <Typography fontFamily={"FE-FONT"} textAlign="center" fontSize={40}>
          {formatLicence(licence)}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewLicencePlate;

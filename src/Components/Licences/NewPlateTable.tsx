import { Box, Typography } from "@mui/material";
import { formatLicence } from "../../utils";

interface Props {
  licence: string;
  width?: string | number;
  dialog?: boolean;
}

const NewPlateTable: React.FC<Props> = ({ licence, dialog, width }) => {
  return (
    <Box
      position="relative"
      width="fit-content"
      mt={dialog ? 0 : 2.5}
    >
      <Box component="img" src="/newLicence.png" width={width ?? 110} height={40} />
      <Box
        position="absolute"
        bgcolor="white"
        height={25}
        top={12}
        left={4}
        right={4}
        borderRadius={2}
        display="flex"
        justifyItems="center"
        alignItems="center"
      >
        <Typography textAlign='center' fontFamily={"FE-font"} fontSize={18}>
          {formatLicence(licence)}
        </Typography>
      </Box>
    </Box>
  );
};

export default NewPlateTable;

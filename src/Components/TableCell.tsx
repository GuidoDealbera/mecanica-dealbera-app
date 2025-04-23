import { Box, Typography } from "@mui/material";
import TablePlate from "./Licences/TablesPlates";

interface Props {
  value: string | number;
  field?: string;
  onClick?: () => void;
}

const TableCell: React.FC<Props> = ({ value, field, onClick }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      component={'a'}
      onClick={onClick}
    >
      {field === "licence" && typeof value === 'string' ? (
        <TablePlate licence={value} />
      ) : (
        <Typography fontWeight={500}>{value}</Typography>
      )}
    </Box>
  );
};

export default TableCell;

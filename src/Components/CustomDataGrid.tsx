import { Box, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";

interface Props {
  rows: GridRowsProp;
  columns: GridColDef[];
}

const CustomDataGrid: React.FC<Props> = ({ rows, columns }) => {
  const processedColumns = columns.map((column) => ({
    ...column,
    headerAlign: column.headerAlign ?? "center",
    flex: 1,
    minWidth: column.minWidth ?? 120,
    align: column.align ?? 'center',
    resizable: false
  }));

  return (
    <Box component={Paper}>
      <DataGrid
        rows={rows}
        columns={processedColumns}
      />
    </Box>
  );
};

export default CustomDataGrid;

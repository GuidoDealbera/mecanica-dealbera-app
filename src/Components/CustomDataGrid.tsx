import { Paper, TableContainer } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridInitialState,
  GridRowsProp,
} from "@mui/x-data-grid";

interface Props extends Omit<DataGridProps, "rows" | "columns"> {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading?: boolean;
  initialState?: GridInitialState;
}

const CustomDataGrid: React.FC<Props> = ({
  rows,
  columns,
  loading = false,
  initialState,
  ...props
}) => {
  const processedColumns = columns.map((column) => ({
    ...column,
    headerAlign: column.headerAlign ?? "center",
    flex: 1,
    minWidth: column.minWidth ?? 200,
    width: column.width,
    align: column.align ?? "center",
    resizable: false,
    filterable: column.filterable ?? false,
    hideable: column.hideable ?? false,
    sortable: column.sortable ?? false,
    disableColumnMenu: true,
  }));

  return (
    <TableContainer component={Paper} sx={{ p: 1, bgcolor: "transparent" }}>
      <DataGrid
        rows={rows}
        columns={processedColumns}
        showCellVerticalBorder
        showColumnVerticalBorder
        loading={loading}
        disableRowSelectionOnClick
        initialState={{
          ...initialState,
          pagination: {
            paginationModel: { pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        slotProps={{
          footer: {
            sx: {
              justifyContent: "center",
              alignItems: "center",
            },
          },
        }}
        sx={{ bgcolor: "white" }}
        {...props}
      />
    </TableContainer>
  );
};

export default CustomDataGrid;

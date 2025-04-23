import { Paper, TableContainer } from "@mui/material";
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
    minWidth: column.minWidth ?? 200,
    width: column.width,
    align: column.align ?? 'center',
    resizable: false,
    filterable: column.filterable ?? false,
    hideable: column.hideable ?? false,
    sortable: column.sortable ?? false,
    disableColumnMenu: true
  }));

  return (
    <TableContainer component={Paper} sx={{p:1, bgcolor: 'transparent'}}>
      <DataGrid
        rows={rows}
        columns={processedColumns}
        showCellVerticalBorder
        showColumnVerticalBorder
        disableRowSelectionOnClick
        localeText={{
          noRowsLabel: 'No hay automóviles registrados'
        }}
        pageSizeOptions={[5, 10, 25]}
        slotProps={{
          footer: {
            sx: {
              justifyContent: 'center',
              alignItems: 'center'
            }
          }
        }}
        sx={{bgcolor: 'white'}}
      />
    </TableContainer>
  );
};

export default CustomDataGrid;

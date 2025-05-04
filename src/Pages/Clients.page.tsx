import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useClientQueries } from "../Hooks/useClientQueries";
import { useTable } from "../Hooks/useTable";
import CustomDataGrid from "../Components/CustomDataGrid";
import { useEffect, useMemo, useState } from "react";
import FilterByName from "../Components/SearchBars/FilterByName";
import { Refresh } from "@mui/icons-material";

const Clients = () => {
  const {
    allClients,
    loading,
    refreshing,
    loadingStates,
    getAllClients,
    refresh,
  } = useClientQueries();
  const { clientColumns } = useTable();
  const [nameFilter, setNameFilter] = useState<string>("");

  useEffect(() => {
    getAllClients()
  }, [])

  const filteredClients = useMemo(() => {
    if (!nameFilter) return allClients;
    return allClients.filter(
      (client) => client.fullname.toLowerCase().includes(nameFilter.toLowerCase())
    );
  }, [allClients, nameFilter]);

  return (
    <Box display="flex" flexDirection="column" gap={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color="#FFF0FF">Listado de clientes</Typography>
        <Box display='flex' justifyContent='flex-end' alignItems='center' gap={1}>
          <Button
            onClick={refresh}
            variant="contained"
            disabled={refreshing || loadingStates.fetching_all}
            startIcon={
              refreshing || loadingStates.fetching_all ? <CircularProgress size={20} /> : <Refresh />
            }
          >
            {refreshing || loadingStates.fetching_all ? "Actualizando" : "Actualizar"}
          </Button>
        </Box>
      </Box>
      <FilterByName onFilterChange={setNameFilter} />
      <CustomDataGrid
        rows={filteredClients}
        columns={clientColumns}
        loading={loading || refreshing}
        localeText={{ noRowsLabel: "No hay clientes registrados" }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default Clients;

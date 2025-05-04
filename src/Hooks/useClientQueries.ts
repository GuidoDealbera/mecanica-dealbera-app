import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { useCallback, useState } from "react";
import {
  fetchClientByName,
  fetchClients,
  updateClient,
} from "../Store/clientAsync.methods";
import { ToastError, ToastSuccess } from "../ToastAlerts/alerts";

export const useClientQueries = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { allClients, client, error, loadingStates } = useSelector(
    (state: RootState) => state.clients
  );

  const getAllClients = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(fetchClients()).unwrap();
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const getClientByName = useCallback(
    async (fullname: string) => {
      setLoading(true);
      try {
        await dispatch(fetchClientByName(fullname)).unwrap();
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchClients()).unwrap();
      ToastSuccess("Datos actualizados correctamente");
    } catch (error) {
      ToastError("Error al actualizar los datos");
      return error;
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const update = useCallback(async (body: any) => {
    setLoading(true);
    try {
      return await dispatch(updateClient(body)).unwrap();
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    refreshing,
    allClients,
    client, 
    error,
    loadingStates,
    getAllClients,
    getClientByName,
    update,
    refresh,
  };
};

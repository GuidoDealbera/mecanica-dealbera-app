import { useDispatch } from "react-redux";
import { AppDispatch } from "../Store/store";
import { CreateCarBody } from "../Types/apiTypes";
import { createCar, fetchCars } from "../Store/async.methods";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "../ToastAlerts/alerts";

export const useQueries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const create = useCallback(
    async (body: CreateCarBody) => {
      setLoading(true);
      try {
        const data: CreateCarBody = {
          ...body,
          owner: {
            ...body.owner,
            email: body.owner.email ? body.owner.email : null
          }
        }
        const response = await dispatch(createCar(data)).unwrap();
        ToastSuccess(response.message as string);
        return response;
      } catch (error: any) {
        ToastError(error.message)
        return error;
      } finally {
        setLoading(false);
        navigate("/cars");
      }
    },
    [dispatch, navigate]
  );

  const getAllCars = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(fetchCars()).unwrap();
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const refresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await dispatch(fetchCars()).unwrap()
      ToastSuccess('Datos actualizados correctamente')
    } catch (error) {
      ToastError('Error al actualizar los datos')
      return error
    } finally {
      setRefreshing(false)
    }
  }, [dispatch]);

  return {
    loading,
    refreshing,
    create,
    getAllCars,
    refresh,
  };
};

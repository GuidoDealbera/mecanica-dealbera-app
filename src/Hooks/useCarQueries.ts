import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { CreateCarBody } from "../Types/apiTypes";
import {
  createCar,
  fetchCarByLicence,
  fetchCars,
  deleteCar,
} from "../Store/carAsync.methods";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "../ToastAlerts/alerts";
import { cleanCarsState, cleanCarState, cleanError } from "../Store/Slices/carSlice";

export const useCarQueries = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { allCars, car, loadingStates, error } = useSelector(
    (state: RootState) => state.cars
  );
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
            email: body.owner.email ? body.owner.email : null,
          },
        };
        const response = await dispatch(createCar(data)).unwrap();
        ToastSuccess(response.message as string);
        navigate("/cars");
        return response;
      } catch (error: any) {
        ToastError(error.message);
        return error;
      } finally {
        setLoading(false);
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
    setRefreshing(true);
    try {
      await dispatch(fetchCars()).unwrap();
      ToastSuccess("Datos actualizados correctamente");
    } catch (error) {
      ToastError("Error al actualizar los datos");
      return error;
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const refreshCar = useCallback(
    async (licence: string) => {
      setRefreshing(true);
      try {
        await dispatch(fetchCarByLicence(licence)).unwrap();
        ToastSuccess("Datos actualizados exitosamente");
      } catch (error) {
        ToastError("Error al actualizar los datos");
        return error;
      } finally {
        setRefreshing(false);
      }
    },
    [dispatch]
  );

  const getCarDetail = useCallback(
    async (licence: string) => {
      setLoading(true);
      try {
        await dispatch(fetchCarByLicence(licence));
      } catch (error: any) {
        ToastError(error.message);
        return error;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const deleteOneCar = useCallback(
    async (licence: string) => {
      setLoading(true);
      try {
        const response = await dispatch(deleteCar(licence)).unwrap();
        ToastSuccess(response.message as string);
      } catch (error: any) {
        ToastError(error.message);
        return error;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const clean = useCallback(() => {
    dispatch(cleanCarState())
  }, [dispatch])

  const cleanCars = useCallback(() => {
    dispatch(cleanCarsState())
  }, [dispatch])

  const clearError = useCallback(() => {
    dispatch(cleanError())
  }, [dispatch])

  return {
    loading,
    refreshing,
    allCars,
    car,
    error,
    loadingStates,
    create,
    getAllCars,
    getCarDetail,
    refresh,
    deleteOneCar,
    refreshCar,
    clean,
    cleanCars,
    clearError
  };
};

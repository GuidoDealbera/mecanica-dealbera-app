import { useState } from "react";
import { CreateCarBody } from "../Types/apiTypes";
import { useQueries } from "./useQueries";
import { ToastError, ToastSuccess } from "../ToastAlerts/alerts";
export const useAddCarForm = () => {
  const { create } = useQueries();
  const [loading, setLoading] = useState<boolean>(false);
  const [createCar, setCreateCar] = useState<Omit<CreateCarBody, "owner">>({
    licensePlate: "",
    brand: "",
    model: "",
    kilometers: "",
    year: "",
  });

  const handleCarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (["year", "kilometers"].includes(name) && !/^\d*$/.test(value)) {
      return;
    }

    const parsedValue = ["year", "kilometers"].includes(name)
      ? value === ""
        ? ""
        : Number(value)
      : value.toUpperCase();

    setCreateCar((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };
  const [owner, setOwner] = useState<CreateCarBody["owner"]>({
    fullname: "",
    phone: "",
    address: "",
    city: "",
    email: "",
  });

  const handleOwnerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "phone") {
      const validPhone = /^\+?\d*$/.test(value);
      if (!validPhone) return;
    }
    setOwner((prev) => ({
      ...prev,
      [name]: name !== "email" ? value.toUpperCase() : value,
    }));
  };

  const ownerFields = [
    {
      name: "fullname",
      label: "Nombre completo",
      value: owner.fullname,
    },
    { name: "phone", label: "Teléfono", value: owner.phone },
    { name: "address", label: "Dirección", value: owner.address },
    { name: "city", label: "Localidad", value: owner.city },
    { name: "email", label: "Correo Electrónico", value: owner.email },
  ];
  const carFields = [
    {
      name: "licensePlate",
      label: "Patente",
      value: createCar.licensePlate,
    },
    {
      name: "brand",
      label: "Marca",
      value: createCar.brand,
    },
    {
      name: "model",
      label: "Modelo",
      value: createCar.model,
    },
    {
      name: "year",
      label: "Año",
      value: createCar.year,
    },
    {
      name: "kilometers",
      label: "Kilometraje",
      value: createCar.kilometers,
    },
  ];

  const onSubmit = async () => {
    setLoading(true);
    try {
      const carData: CreateCarBody = {
        ...createCar,
        licensePlate: createCar.licensePlate,
        owner: {
          ...owner,
          email: owner.email ? owner.email : null
        }
      };
      const response = await create(carData);
      if (response) {
        ToastSuccess("Petición lograda");
      } else {
        ToastError("NO FUNCA!!!");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    ownerFields,
    carFields,
    loading,
    setCreateCar,
    handleCarChange,
    handleOwnerChange,
    onSubmit,
  };
};

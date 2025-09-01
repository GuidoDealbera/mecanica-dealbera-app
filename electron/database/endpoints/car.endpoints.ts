import { ipcMain } from "electron";
import {
  CreateCarDto,
  Jobs,
  JobsDto,
  UpdateCarDto,
  UpdateJobDto,
} from "../Types/car.dto";
import { v4 } from "uuid";
import { getRepositories } from "../dataSource";

ipcMain.handle("car:create", async (_event, createCarDto: CreateCarDto) => {
  const carRepo = getRepositories().carRepository
  const clientRepo = getRepositories().clientRepository;
  const existingCar = await carRepo.findOne({
    where: {
      licensePlate: createCarDto.licensePlate,
    },
  });
  if (existingCar) {
    return {
      status: "failed",
      message: "Patente ya registrada",
    };
  }

  let owner = await clientRepo.findOne({
    where: {
      fullname: createCarDto.owner.fullname,
    },
  });

  if (!owner) {
    const existingPhone = await clientRepo.findOne({
      where: {
        phone: createCarDto.owner.phone,
      },
    });
    if (existingPhone) {
      return {
        status: "failed",
        message: "Teléfono ya registrado",
      };
    }
    owner = clientRepo.create(createCarDto.owner);
  }

  const jobs: JobsDto[] =
    createCarDto.jobs?.map((job) => ({
      ...job,
      id: v4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })) || [];

  const savedOwner = await clientRepo.save(owner);
  const newCar = carRepo.create({
    ...createCarDto,
    jobs,
    owner: savedOwner,
  });

  await carRepo.save(newCar);
  return {
    status: "success",
    message: "Automóvil registrado correctamente",
  };
});

ipcMain.handle("car:get-all", async () => {
  const repo = getRepositories().carRepository;
  const cars = await repo.find({
    relations: ['owner']
  });
  console.log(cars)
  return cars
});

ipcMain.handle(
  "car:get-by-license",
  async (_, licence: CreateCarDto["licensePlate"]) => {
    const repo = getRepositories().carRepository;
    const car = await repo.findOne({
      where: {
        licensePlate: licence,
      },
      relations: ["owner"],
    });
    if (!car) {
      return {
        status: "failed",
        message: "Automóvil no registrado",
      };
    }
    return {
      status: "success",
      message: "Automóvil encontrado",
      result: car,
    };
  }
);

ipcMain.handle(
  "car:update",
  async (_, id: string, updateCarDto: UpdateCarDto) => {
    const carRepo = getRepositories().carRepository;
    const clientRepo = getRepositories().clientRepository;
    const { jobs, owner, kilometers } = updateCarDto;
    const car = await carRepo.findOne({
      where: {
        id: id,
      },
      relations: ["owner"],
    });
    if (!car) {
      return {
        status: "failed",
        message: "Automóvil no registrado",
      };
    }
    if (owner && (owner !== car.owner || !car.owner)) {
      const findOwner = await clientRepo.findOne({
        where: {
          fullname: owner.fullname,
        },
        relations: ["cars"],
      });
      if (!findOwner) {
        const newOwner = clientRepo.create(owner);
        car.owner = newOwner;
      }
    }
    if (owner && owner.fullname === car.owner?.fullname) {
      const updatedClient = await clientRepo.findOneBy({
        fullname: owner.fullname,
      });
      if (!updatedClient) {
        return {
          status: "failed",
          message: "Cliente no registrado",
        };
      }
      if (owner.address) updatedClient.address = owner.address;
      if (owner.city) updatedClient.city = owner.city;
      if (owner.email) updatedClient.email = owner.email;
      if (owner.phone) updatedClient.phone = owner.phone;

      await clientRepo.save(updatedClient);
      car.owner = updatedClient;
    }

    if (typeof kilometers === "number") {
      if (kilometers < car.kilometers) {
        return {
          status: "failed",
          message: "No se pueden bajar los kilómetros de un automóvil",
        };
      }
      car.kilometers = kilometers;
    }

    if (jobs) {
      const jobsWithTimestamps: Jobs[] = jobs.map((job) => ({
        ...job,
        id: v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      if (car.jobs) {
        car.jobs = [...car.jobs, ...jobsWithTimestamps];
      } else {
        car.jobs = jobsWithTimestamps;
      }
    }
    await carRepo.save(car);
    return {
      status: "success",
      message: "Automóvil actualizado correctamente",
    };
  }
);

ipcMain.handle(
  "car:delete",
  async (_, license: CreateCarDto["licensePlate"]) => {
    const carRepo = getRepositories().carRepository;
    const clientRepo = getRepositories().clientRepository;
    const carToDelete = await carRepo.findOne({
      where: {
        licensePlate: license,
      },
      relations: ["owner"],
    });
    if (!carToDelete) {
      return {
        status: "failed",
        message: "Automóvil no registrado",
      };
    }
    const owner = carToDelete.owner;
    await carRepo.remove(carToDelete);

    const remainingCars = await carRepo.find({
      where: {
        owner: {
          id: owner.id,
        },
      },
    });
    if (remainingCars.length === 0) {
      await clientRepo.remove(owner);
    }
    return {
      status: "success",
      message: "Automóvil eliminado exitosamente",
    };
  }
);

ipcMain.handle("car:find-jobs", async () => {
  const repo = getRepositories().carRepository;
  const cars = await repo.find();
  const response = cars
    .filter((car) => Array.isArray(car.jobs) && car.jobs.length > 0)
    .map((car) => ({
      licensePlate: car.licensePlate,
      jobs: car.jobs,
    }));
  if (response.length === 0) return null;
  return response;
});

ipcMain.handle(
  "car:update-job",
  async (_, license: string, jobId: string, updateJobDto: UpdateJobDto) => {
    const repo = getRepositories().carRepository;
    const car = await repo.findOne({
      where: {
        licensePlate: license,
      },
    });
    if (!car) {
      return {
        status: "failed",
        message: "Automóvil no registrado",
      };
    }
    if (car.jobs) {
      const jobIndex = car.jobs.findIndex((job) => job.id === jobId);
      if (jobIndex === undefined || jobIndex === -1) {
        return {
            status: 'failed',
            message: `El automóvil registrado con patente ${license} no tiene registrado el trabajo que intenta modificar`
        }
      }
      car.jobs[jobIndex] = {
        ...car.jobs[jobIndex],
        ...updateJobDto,
        updatedAt: new Date(),
      };
    }

    const savedCar = await repo.save(car);
    const { owner, ...rest } = savedCar;
    const { jobs } = rest;
    const updatedJob = jobs.find((job) => job.id === jobId);
    return {
        status: 'success',
        message: 'Trabajo actualizado correctamente',
        result: updatedJob};
  }
);

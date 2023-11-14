import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import HeaderComponent from "../../components/HeaderComponent";
import { useEffect, useState } from "react";
import { httpClient } from "../../services/api";
import { Sucursal, Drivers, UserData } from "../../interfaces/interfaces";
import TableDrivers from "./components/TableDrivers";
import TableUsers from "./components/TableUsers";

export const UsuarioPage = () => {
  const [sucursal, setSucursal] = useState("");

  const [sucursales, setSucursales] = useState<Sucursal[]>([]);
  const [drivers, setDrivers] = useState<Drivers[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);

  const getSucursal = async () => {
    const { data } = await httpClient.get("getSucursal");
    setSucursales(data.sucursal);
  };

  const getSucusal = async (sucursal: string) => {
    const { data } = await httpClient.get(`drivers/${sucursal}`);
    setDrivers(data.drivers);
  };

  const getUser = async (sucursal: string) => {
    const { data } = await httpClient.get(`user/${sucursal}`);
    setUsers(data.users);
  };

  useEffect(() => {
    getSucursal();
    getSucusal(sucursal);
    getUser(sucursal);
  }, [sucursal]);

  const handleChange = (event: SelectChangeEvent) => {
    setSucursal(event.target.value);
  };

  // tabla de repartidores
  function createData(
    f_name: string,
    l_name?: string,
    email?: string,
    role_id?: string,
    sucursal_id?: string
  ) {
    return { f_name, l_name, email, role_id, sucursal_id };
  }

  const rows = drivers
    ? drivers.map((driver) =>
        createData(
          driver.f_name,
          driver.l_name,
          driver.email,
          driver.role_id,
          driver.sucursal_id
        )
      )
    : [];

  function createData2(
    f_name: string,
    I_name?: string,
    email?: string,
    role_id?: string,
    sucursal_id?: string
  ) {
    return { f_name, I_name, email, role_id, sucursal_id };
  }

  const rows2 = users
    ? users.map((user) =>
        createData2(
          user.f_name,
          user.I_name,
          user.email,
          user.role_id,
          user.sucursal_id
        )
      )
    : [];

  return (
    <div className="w-full bg-gray-200">
      <HeaderComponent />
      <div className="p-5">
        <h2 className="text-lg font-medium">Usuarios</h2>
        <div className="">
          <FormControl sx={{ m: 1, width: 400, mt: 3 }}>
            <InputLabel id="sucursal">Seleccione una Sucursal</InputLabel>
            <Select
              labelId="sucursal"
              id="select_sucursal"
              value={sucursal}
              onChange={handleChange}
              autoWidth
              label="Seleccione una Sucursal"
            >
              {sucursales.map((sucursal) => (
                <MenuItem
                  key={sucursal.id}
                  value={sucursal.id}
                  sx={{ width: 380 }}
                >
                  {sucursal.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            <div className="mt-7 bg-gray-50 p-7 items-center">
              <div className="flex justify-between ">
                <h3>LISTA DE REPARTIDORES</h3>
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-96 py-2 px-1 border-b border-b-black bg-gray-50 "
                />
                <button className="flex gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                  Nuevo
                </button>
              </div>
              <div className="mt-9">
                <TableDrivers rows={rows} />
              </div>
            </div>
            <div className="mt-7 bg-gray-50 p-7 items-center">
              <div className="flex justify-between ">
                <h3>LISTA DE USUARIOS ADMINISTRATIVOS</h3>
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-96 py-2 px-1 border-b border-b-black bg-gray-50 "
                />
                <button className="flex gap-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                  Nuevo
                </button>
              </div>
              <div className="mt-9">
                  <TableUsers rows2={rows2}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

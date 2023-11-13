import { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { httpClient } from "../../services/api";
import { Sucursal } from "../../interfaces/interfaces";
import TableComponent from "./Components/TableComponent";

export const MandatitosPage = () => {
  const [sucursal, setSucursal] = useState("");
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);

  const getSucursal = async () => {
    const { data } = await httpClient.get("getSucursal");
    setSucursales(data.sucursal);
  };

  const handleChangeSucursal = (e: SelectChangeEvent) => {
    // console.log(e.target.value);
    setSucursal(e.target.value);
  };

  useEffect(() => {
    getSucursal();
  }, []);

  return (
    <div className="w-full bg-gray-200">
      <HeaderComponent />

      <div className="p-7">
        <h2>Mandaditos Afiliados</h2>

        <div className="mt-10 p-7 bg-white rounded-md shadow-md">
          <Box sx={{ width: "70%" }}>
            <FormControl fullWidth>
              <InputLabel id="name_sucursal">
                Seleccione una Sucursal
              </InputLabel>
              <Select
                labelId="name_sucursal"
                id="sucusal_select"
                value={sucursal}
                onChange={handleChangeSucursal}
              >
                {sucursales.map((sucursal) => (
                  <MenuItem value={sucursal.id} key={sucursal.id}>
                    {sucursal.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <div className="flex justify-between mt-10">
            <h3>LISTA DE EMPRESAS AFILIADAS</h3>
            <input type="text" placeholder="Buscar" />
            <button className="flex gap-x-2">
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
          <TableComponent sucursal={sucursal} />
        </div>
      </div>
    </div>
  );
};

import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import HeaderComponent from "../../components/HeaderComponent";
import { useEffect, useState } from "react";
import { httpClient } from "../../services/api";
import { Sucursal } from "../../interfaces/interfaces";

function createData(
  nombres: string,
  apellidos: number,
  correo: number,
  rol: number,
  sucursal: number
) {
  return { nombres, apellidos, correo, rol, sucursal };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const UsuarioPage = () => {
  const [sucursal, setSucursal] = useState("");
  const [sucursales, setSucursales] = useState<Sucursal[]>([]);

  const getSucursal = async () => {
    const { data } = await httpClient.get("getSucursal");
    console.log(data.sucursal);
    setSucursales(data.sucursal);
  };

  useEffect(() => {
    getSucursal();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setSucursal(event.target.value);
  };

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
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombres</TableCell>
                        <TableCell align="right">Apellidos</TableCell>
                        <TableCell align="right">Correo</TableCell>
                        <TableCell align="right">Rol</TableCell>
                        <TableCell align="right">Sucursal</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.nombres}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.nombres}
                          </TableCell>
                          <TableCell align="right">{row.apellidos}</TableCell>
                          <TableCell align="right">{row.correo}</TableCell>
                          <TableCell align="right">{row.rol}</TableCell>
                          <TableCell align="right">{row.sucursal}</TableCell>
                          <TableCell align="right">
                            <div className="flex justify-end">
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                              </svg>
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

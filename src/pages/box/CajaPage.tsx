import { useEffect, useState } from "react";
import HeaderComponent from "../../components/HeaderComponent";
import { httpClient } from "../../services/api";
import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Button from "@mui/material/Button";
import BuscadorComponent from "../../components/BuscadorComponent";
import getFormattedDate from "../../utils/dateNow";
import { CreateCaja } from "./modals/CreateCaja";
import {
  CajaData,
  Caja_driver,
  Drivers,
  Sucursal,
  User,
} from "../../interfaces/interfaces";
import { useLocalStorage } from "react-use";

export const CajaPage = () => {
  const [sucursales, setSetsucursales] = useState<Sucursal[]>([]);
  const [date, setDate] = useState("");
  const [drivers, setDrivers] = useState<Drivers[]>([]);
  const [caja_driver, setCaja_driver] = useState<Caja_driver[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [cajaData, setCajaData] = useState<CajaData>();
  const [userLocal] = useLocalStorage<User>("user");
  // Traer todos los sucursales

  const getSucursal = async () => {
    const { data } = await httpClient.get("getSucursal");
    setSetsucursales(data.sucursal);
  };

  // Traer todos los drivers
  const getDriver = async () => {
    const { data } = await httpClient.get("drivers-select");
    if (data.drivers == "") {
      return "";
    }
    setDrivers(data.drivers);
  };

  const caja_repartidor = async () => {
    const { data } = await httpClient.get("get_caja_repartidor");
    console.log(data);
    setCaja_driver(data.body);
  };

  const pagado = async (id: number) => {
    const datos = {
      payBy: `${userLocal?.nombres} ${userLocal?.apellidos}`,
    };
    await httpClient.put(`updateEstado/${id}`, datos);
    caja_repartidor();
  };

  const deletePago = async (id: number) => {
    await httpClient.delete(`delete_caja_repartidor/${id}`);
    caja_repartidor();
  };

  // Modal

  function createData(
    Repartidor: string,
    createBy: string,
    payBy: string,
    id: number,
    Monto?: number,
    Hora?: number,
    detalle_id?: number,
    Estado?: number,
    Observaciones?: string, // Use 'Observaciones' with an uppercase 'O'
    Registros?: string
  ) {
    return {
      Repartidor,
      Hora,
      detalle_id,
      id,
      Monto,
      Estado,
      Observaciones, // Use 'Observaciones' with an uppercase 'O'
      Registros,
      createBy,
      payBy,
    };
  }
  const rows = caja_driver.map((caja) =>
    createData(
      caja.repartidor,
      caja.createBy,
      caja.payBy,
      caja.id,
      caja.monto,
      caja.hora,
      caja.detalle_id,
      caja.estado,
      caja.observaciones
    )
  );

  const updateCajaData = (newCajaData: object) => {
    setCajaData(newCajaData);
  };

  useEffect(() => {
    getSucursal();
    getDriver();
    caja_repartidor();
    setDataLoaded(true);
  }, []);

  const dateNow = (newDate: string) => {
    setDate(newDate);
  };

  return (
    <div className="w-full bg-gray-200">
      <HeaderComponent />
      <div className="p-5">
        <h2 className="text-lg font-medium">Registro de Caja</h2>
        {/* BUSCADOR */}
        <BuscadorComponent
          sucursales={sucursales}
          dateNow={dateNow}
          updateCajaData={updateCajaData}
        />
        {/*FIN BUSCADOR */}

        {/* ASIGNAR CAJA */}
        <form>
          <div className="w-[30rem] bg-white shadow-md mt-7 p-5">
            <h3>CAJA</h3>
            <div className="flex flex-col">
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Apertura de caja
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  value={cajaData?.montoApertura}
                  placeholder="0"
                />
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount2">
                  Total de Salidas del día
                </InputLabel>
                <Input
                  id="standard-adornment-amount2"
                  type="number"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  placeholder="0"
                  value={cajaData?.salidaEfectivo}
                />
              </FormControl>
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="contained" color="success">
                Abrir Caja
              </Button>
              <Button variant="outlined" color="success" disabled>
                Guardar Caja
              </Button>
            </div>
          </div>
        </form>
        {/*FIN ASIGNAR CAJA */}

        {/* ASIGNACIONES DE CAJA Y PAGO */}
        <div className="mt-9 bg-">
          <div className="flex justify-between">
            <h2>
              ASIGNACIONES DE CAJA Y PAGO -{" "}
              {date === "" ? getFormattedDate() : date}
            </h2>
            <button
              className="flex items-center gap-x-1 bg-blue-500 px-3 py-2 rounded-md text-white"
              onClick={() => setOpenModal(!openModal)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Nuevo
            </button>
          </div>
          {openModal ? (
            <CreateCaja
              setOpenModal={setOpenModal}
              drivers={drivers}
              caja_repartidor={caja_repartidor}
            />
          ) : null}
          <div className="flex justify-center mt-5">
            <select className="w-full py-2 mb-3 rounded-md">
              <option value="0">Buscar Repartidor</option>
              {dataLoaded && Array.isArray(drivers)
                ? drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.f_name}
                    </option>
                  ))
                : null}
            </select>
          </div>

          <div>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Repartidor</TableCell>
                    <TableCell align="right">Monto</TableCell>
                    <TableCell align="right">Hora</TableCell>
                    <TableCell align="right">Detalle</TableCell>
                    <TableCell align="right">Estado</TableCell>
                    <TableCell align="right">Observaciones</TableCell>
                    <TableCell align="right">Registros</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.Repartidor}
                      </TableCell>
                      <TableCell align="right">{row.Monto}</TableCell>
                      <TableCell align="right">{row.Hora}</TableCell>
                      <TableCell align="right">{row.detalle_id}</TableCell>
                      <TableCell align="right">
                        {row.Estado === 1 ? "PAGADO" : "Sin Pagar"}
                      </TableCell>
                      <TableCell align="right">{row.Observaciones}</TableCell>
                      <TableCell align="right">
                        <p>ENT.{row.createBy}</p>
                        <p>PAG.{row.payBy} </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-x-3">
                          <button onClick={() => pagado(row.id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 cursor-pointer"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => deletePago(row.id)}
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
        {/* FIN ASIGNACIONES DE CAJA Y PAGO */}
      </div>
    </div>
  );
};

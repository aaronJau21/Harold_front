import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { httpClient } from "../../../services/api";
import { Detalles, User, props } from "../../../interfaces/interfaces";
import { useLocalStorage } from "react-use";
import getFormattedDate from "../../../utils/dateNow";

export const CreateCaja = ({
  setOpenModal,
  drivers,
  caja_repartidor,
  date,
  sucursalId,
}: props) => {
  const [driver, setDriver] = useState("");
  const [detallevalue, setDetallevalue] = useState("");
  const [monto, setMonto] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [getdetalle, setGetdetalle] = useState<Detalles[]>([]);
  const [user] = useLocalStorage<User>("user");
  const handleDriverChange = (e: SelectChangeEvent) => {
    setDriver(e.target.value as string);
  };
  const handleDetalleChange = (e: SelectChangeEvent) => {
    setDetallevalue(e.target.value as string);
  };
  const handleMonto = (e) => {
    setMonto(e.target.value as number);
  };

  const detalle = async () => {
    const { data } = await httpClient.get("detalles");
    setGetdetalle(data.detalles);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Aquí debes construir el objeto de datos que deseas enviar en el cuerpo de la solicitud
      const requestData = {
        driver_id: driver,
        detalle_id: detallevalue,
        monto,
        createBy: `${user?.nombres} ${user?.apellidos}`,
        fecha: date === "" ? getFormattedDate() : date,
        sucursal_id: sucursalId,
        // Otros campos que necesitas enviar
      };

      // Realizar la solicitud POST con los datos construidos
      await httpClient.post("caja_repartidor", requestData);

      // Cerrar el modal u realizar otras acciones después de guardar los datos
      setOpenModal(false);
      caja_repartidor();
    } catch (error) {
      // Manejar errores, por ejemplo, mostrar un mensaje al usuario
      console.error("Error al guardar los detalles:", error);
    }
  };

  useEffect(() => {
    setDataLoaded(true);
    detalle();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-5 rounded flex flex-col justify-center items-center w-96">
        <form onSubmit={handleSubmit} method="POST">
          <h2>Asignar Caja</h2>
          <FormControl sx={{ m: 1, width: 330 }}>
            <InputLabel id="driver">SELECCION UN REPARTIDOR</InputLabel>
            <Select
              labelId="driver"
              id="select-driver"
              value={driver}
              onChange={handleDriverChange}
              name="driver"
            >
              {dataLoaded && Array.isArray(drivers)
                ? drivers.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.f_name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            sx={{ m: 1, width: 330 }}
            value={monto}
            onChange={handleMonto}
          />
          <FormControl sx={{ m: 1, width: 330 }}>
            <InputLabel id="detalle">Detalle</InputLabel>
            <Select
              labelId="detalle"
              id="select-detalle"
              value={detallevalue}
              onChange={handleDetalleChange}
            >
              {dataLoaded && Array.isArray(getdetalle)
                ? getdetalle.map((d) => (
                    <MenuItem key={d.id} value={d.id}>
                      {d.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
          <div className="w-full flex justify-around">
            <button onClick={() => setOpenModal(false)}>Cancelar</button>
            <button>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

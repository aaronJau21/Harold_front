import { useEffect, useState } from "react";
import getFormattedDate from "../utils/dateNow";
import { httpClient } from "../services/api";

interface Sucursal {
  id: number;
  name: string;
}

interface propsBuscador {
  sucursales: Sucursal[];
  dateNow: (newDate: string) => void;
  updateCajaData: (newCajaData: object) => void;
  idSucurzal: object;
}

const BuscadorComponent = ({
  sucursales,
  dateNow,
  updateCajaData,
  idSucurzal,
}: propsBuscador) => {
  const [date, setDate] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [caja, setCaja] = useState({});

  useEffect(() => {
    setDate(getFormattedDate());
  }, []);

  useEffect(() => {
    // Only call handleBuscador if both date and sucursal have values
    if (date && sucursal) {
      handleBuscador(date, sucursal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, sucursal]);
  const handleBuscador = async (fecha: string, selectedSucursal: string) => {
    const { data } = await httpClient.get(
      `get_caja/${fecha}/${selectedSucursal}`
    );
    setCaja(data[0]);
    updateCajaData(data[0]);
    idSucurzal(selectedSucursal);
  };

  return (
    <form>
      <div className="flex">
        <div className="flex-1">
          <select
            className="w-full p-2 rounded-md text-gray-400"
            placeholder=""
            value={sucursal}
            onChange={(e) => setSucursal(e.target.value)}
          >
            <option value="0" className="">
              Seleccione una Ciudad
            </option>
            {sucursales.map((sucursal) => (
              <option
                value={sucursal.id.toString()} // Ensure value is a string
                key={sucursal.id}
                className="text-black"
              >
                {sucursal.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 flex justify-center">
          <input
            type="date"
            className="bg-green-200 appearance-none rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => {
              const newDate = e.target.value;
              setDate(newDate);
              dateNow(newDate); // Llama a dateNow con la nueva fecha
            }}
            value={date}
          />
        </div>
      </div>
    </form>
  );
};

export default BuscadorComponent;

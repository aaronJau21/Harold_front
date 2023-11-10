import { useEffect, useState } from "react";
import getFormattedDate from "../utils/dateNow";

interface Sucursal {
  id: number;
  name: string;
}

interface propsBuscador {
  sucursales: Sucursal[];
  dateNow: (newDate: string) => void;
}

const BuscadorComponent = ({ sucursales, dateNow }: propsBuscador) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(getFormattedDate());
  }, []);

  return (
    <form action="" className="mt-4">
      <div className="flex">
        <div className="flex-1">
          <select
            className="w-full p-2 rounded-md text-gray-400"
            placeholder=""
          >
            <option value="0" className="">
              Seleccione una Ciudad
            </option>
            {sucursales.map((sucursal) => (
              <option
                value={sucursal.id}
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

import { Dispatch } from "react";

export interface Drivers {
  id: number;
  f_name: string;
}

export interface props {
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  drivers: Drivers[];
}

export interface Detalles {
  id: number;
  name: string;
}

export interface Caja_driver {
  id: string;
  repartidor: string;
  monto: number;
  hora: number;
  detalle_id: number;
  estado: number;
  observaciones?: string;
  createBy: string;
}

export interface Sucursal {
  id: number;
  name: string;
}

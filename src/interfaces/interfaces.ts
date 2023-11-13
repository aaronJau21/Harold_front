import { Dispatch } from "react";

export interface Drivers {
  id: number;
  f_name: string;
  l_name?: string;
  email?: string;
  role_id?: string;
  sucursal_id?: string;
}

export interface props {
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  drivers: Drivers[];
  caja_repartidor: () => void;
}

export interface Detalles {
  id: number;
  name: string;
}

export interface Caja_driver {
  id: number;
  repartidor: string;
  monto: number;
  hora: number;
  detalle_id: number;
  estado: number;
  observaciones?: string;
  createBy: string;
  payBy: string;
}

export interface Sucursal {
  id: number;
  name: string;
}

export interface protectedRoute {
  canActivate: unknown;
  redirectPath?: string;
}

export interface User {
  nombres: string;
  apellidos: string;
}

export interface UserData {
  id: number;
  f_name: string;
  I_name?: string;
  email?: string;
  role_id?: string;
  sucursal_id?: string;
}

export interface CajaData {
  montoApertura?: number;
  salidaEfectivo?: number;
}

export interface Busines {
  id: number;
  name: string;
}

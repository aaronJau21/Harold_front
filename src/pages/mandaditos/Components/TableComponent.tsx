import { useEffect, useState } from "react";
import { httpClient } from "../../../services/api";
import { Busines } from "../../../interfaces/interfaces";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface props {
  sucursal: string;
}

const TableComponent = ({ sucursal }: props) => {
  const [busines, setBusines] = useState<Busines[]>([]);

  const getBusines = async (idSucursal: string) => {
    try {
      const { data } = await httpClient.get(`busines/${idSucursal}`);
      console.log(data.sucursales);
      if (Array.isArray(data.sucursales)) {
        setBusines(data.sucursales);
      } else {
        console.error("Data from API is not an array:", data.sucursales);
        setBusines([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getBusines(sucursal);
  }, [sucursal]);

  function createData(id: number, name: string) {
    return { id, name };
  }

  const rows = busines
    ? busines.map((busine) => createData(busine.id, busine.name))
    : [];

  return (
    <div className="mt-10">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell >Calories</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell >{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;

import { useState } from "react";
import { useLocalStorage } from "react-use";
import { remove } from "../utils/localStorage";

type Rol = {
  nombre: string;
  // Otras propiedades del rol si es necesario
};

type User = {
  nombres: string;
  apellidos: string;
  rol: Rol;
  email: string;
  // Otras propiedades si es necesario
};
const HeaderComponent = () => {
  const [show, setShow] = useState(false);

  const [user] = useLocalStorage<User>("user");

  const nombre_completo = `${user?.nombres} ${user?.apellidos}`;
  const rol = user?.rol.nombre;
  const email = user?.email;

  const mostrar = () => {
    setShow(!show);
  };

  const salir = () => {
    try {
      remove();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="px-5 bg-gray-100 flex justify-between h-16 items-center">
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
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>

        <div className="flex gap-x-5 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mt-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>

          <div
            className="top-0 left-0 rounded-full bg-[#38CAB3] flex items-center justify-center w-10 h-10"
            onClick={mostrar}
          >
            <p className="text-lg text-white font-semibold">AJ</p>
          </div>
        </div>
      </div>
      {show ? (
        <div className="flex justify-end relative">
          <div className="bg-white shadow-lg absolute p-5 w-52 right-3 rounded-md">
            <p className="text-lg">{nombre_completo}</p>
            <p className="text-lg">({rol})</p>
            <p className="text-xs">{email}</p>

            <p className="border my-3"></p>

            <p className="flex gap-x-1 cursor-pointer" onClick={salir}>
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
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Cerrar Sesión
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HeaderComponent;

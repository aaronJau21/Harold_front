import { Link } from "react-router-dom";
import logodash from "../assets/logodash.png";

export const NavBarComponents = () => {
  return (
    <div className="w-64 border-r-2 h-screen shadow-xl">
      <div className="flex justify-center w-full border-b mt-4">
        <img src={logodash} alt="Logo" className="w-20" />
      </div>
      <div className="p-5">
        <p className="mb-3 font-semibold text-gray-400">Caja</p>

        <Link to="caja" className="flex text-gray-600 hover:text-[#38CAB3]">
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
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          Registro de Caja
        </Link>
      </div>
    </div>
  );
};

import { FormEvent, createRef } from "react";
import logoLogin from "../../assets/logoLogin.png";
import { httpClient } from "../../services/api";
import { setLocal } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const navigate = useNavigate();

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const datos = {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      };
      const { data } = await httpClient.post("/login", datos);

      setLocal(data.body);
      navigate('caja')
    } catch (error) {
      console.error("Error al hacer la solicitud:", error);
    }
  };

  return (
    <div className="bg-[#38CAB3] h-screen">
      <div className="min-h-screen flex items-center justify-center">
        <form onSubmit={login} className="bg-white w-96 p-9 rounded-md">
          <img src={logoLogin} alt="Logo de la empresa" className="w-12" />
          <div className="my-5">
            <h1 className="text-[#38CAB3] text-3xl mb-1">
              Bienvenido de nuevo!
            </h1>
            <p>Por favor inicie sesion para continuar</p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="">
              Email
            </label>
            <input
              type="email"
              className="bg-[#E8F0FE] rounded-md p-1"
              ref={emailRef}
            />
          </div>
          <div className="flex flex-col mt-3 mb-7">
            <label htmlFor="">Password</label>
            <input
              type="password"
              className="bg-[#E8F0FE] rounded-md p-1"
              ref={passwordRef}
            />
          </div>
          <button className="w-full bg-[#5CD3B9] text-white py-2 rounded-md hover:bg-[#61dbbf] transition-colors ">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

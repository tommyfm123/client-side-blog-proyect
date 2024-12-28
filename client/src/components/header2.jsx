import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/headertwo.css";

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const navigate = useNavigate();
  const { setUserInfo, userInfo } = useContext(UserContext);

  // Función para abrir/cerrar el menú en dispositivos móviles
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Llamada para obtener el perfil del usuario al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Verifica si el token está presente

    if (token) {
      fetch("https://api-portfolio-arturo.vercel.app/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("No autorizado");
          }
          return response.json();
        })
        .then((userInfo) => {
          setUserInfo(userInfo); // Establecer información del usuario
        })
        .catch((error) => {
          console.error("Error al obtener perfil:", error);
          //navigate("/login"); // Redirige a login si hay un error
        });
    } else {
      console.log("Token no encontrado");
      // navigate("/login");  // Redirige si no hay token
    }
  }, [setUserInfo, navigate]);

  // Función para cerrar sesión
  function logout() {
    fetch("https://api-portfolio-arturo.vercel.app/logout", {
      credentials: "include",
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          setUserInfo(null);
          localStorage.removeItem("token"); // Eliminar el token
          console.log("Token eliminado");
          navigate("/login"); // Redirige a la página de login después de cerrar sesión
        } else {
          alert("Error al cerrar sesión. Intenta nuevamente.");
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un problema al cerrar sesión.");
      });
  }

  // Obtener el nombre de usuario si está autenticado
  const username = userInfo?.username;

  return (
    <header className='Header'>
      <div className='headerContainer'>
        <a href='/' className='logoContainer'>
          <svg
            id='logo-73'
            width='60'
            height='40'
            viewBox='0 0 60 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            {" "}
            <path
              d='M56.25 1.25C56.25 1.94036 56.8096 2.5 57.5 2.5H58.75C59.4404 2.5 60 1.94036 60 1.25C60 0.559648 59.4404 3.49691e-06 58.75 3.49691e-06H57.5C56.8096 3.49691e-06 56.25 0.559648 56.25 1.25Z'
              className='ccustom'
              fill='#212326'
            ></path>{" "}
            <path
              d='M20 40H26.0723L24.3045 38.2322C23.8357 37.7634 23.1998 37.5 22.5368 37.5H20C10.335 37.5 2.5 29.665 2.5 20C2.5 10.335 10.335 2.50001 20 2.5L40 2.5C49.665 2.5 57.5 10.335 57.5 20C57.5 29.665 49.665 37.5 40 37.5H32.5184C31.5238 37.5 30.57 37.1049 29.8667 36.4017L27.7957 34.3306C26.6236 33.1585 25.0338 32.5 23.3762 32.5H20C13.0964 32.5 7.5 26.9036 7.5 20C7.5 13.0964 13.0964 7.5 20 7.5L40 7.5C46.9036 7.5 52.5 13.0964 52.5 20C52.5 26.9036 46.9036 32.5 40 32.5H35.1961C34.2015 32.5 33.2477 32.1049 32.5444 31.4017L30.4733 29.3306C29.3012 28.1585 27.7115 27.5 26.0539 27.5H20C15.8579 27.5 12.5 24.1421 12.5 20C12.5 15.8579 15.8579 12.5 20 12.5L40 12.5C44.1421 12.5 47.5 15.8579 47.5 20C47.5 24.0916 44.2235 27.418 40.1512 27.4985L40.1504 27.5H38.3211C37.3265 27.5 36.3727 27.1049 35.6694 26.4017L33.5983 24.3306C32.6366 23.3688 31.3937 22.7529 30.0628 22.5628L30 22.5L20 22.5C18.6193 22.5 17.5 21.3807 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5L40 17.5C41.3807 17.5 42.5 18.6193 42.5 20C42.5 21.3807 41.3807 22.5 40 22.5H35L36.7678 24.2678C37.2366 24.7366 37.8725 25 38.5355 25H40C42.7614 25 45 22.7614 45 20C45 17.2386 42.7614 15 40 15L20 15C17.2386 15 15 17.2386 15 20C15 22.7614 17.2386 25 20 25L29.1789 25C30.1735 25 31.1273 25.3951 31.8306 26.0983L33.9017 28.1694C35.0738 29.3415 36.6635 30 38.3211 30H40.625V29.9808C45.8567 29.6582 50 25.3129 50 20C50 14.4772 45.5228 10 40 10L20 10C14.4772 10 10 14.4772 10 20C10 25.5229 14.4772 30 20 30H26.0539C27.0485 30 28.0023 30.3951 28.7056 31.0983L30.7767 33.1694C31.9488 34.3415 33.5385 35 35.1961 35H40C48.2843 35 55 28.2843 55 20C55 11.7157 48.2843 5 40 5L20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35H23.3762C24.3708 35 25.3246 35.3951 26.0279 36.0983L28.099 38.1694C29.2711 39.3415 30.8608 40 32.5184 40H40C51.0457 40 60 31.0457 60 20C60 8.9543 51.0457 -9.65645e-07 40 0L20 4.13264e-06C8.9543 5.09829e-06 -9.65645e-07 8.95431 0 20C9.65645e-07 31.0457 8.95431 40 20 40Z'
              className='ccustom'
              fill='#212326'
            ></path>{" "}
          </svg>
        </a>

        {/* Menu con animación */}
        <ul
          className={`menu ${
            isMenuOpen ? "open" : isMenuOpen === false ? "closing" : ""
          }`}
        >
          <li>
            <a href='/'>Inicio</a>
          </li>
          <li>
            <a href='/articles'>Artículos</a>
          </li>
          <li>
            <a href='/contact'>Contacto</a>
          </li>
          <li className='LoginMobile'>
            {username ? (
              <button className='login-btn-mobile' onClick={logout}>
                Cerrar Sesion
              </button>
            ) : (
              <button className='login-btn-mobile'>
                <a href='/login'>Login</a>
              </button>
            )}
          </li>
        </ul>

        <div className='ContainerBTN'>
          {username ? (
            <button className='login-btn' onClick={logout}>
              Cerrar Sesion
            </button>
          ) : (
            <button className='login-btn'>
              <a href='/login'>Login</a>
            </button>
          )}
        </div>
      </div>

      <label className='hamburger'>
        <input type='checkbox' checked={isMenuOpen} onChange={toggleMenu} />
        <svg viewBox='0 0 32 32'>
          <path
            className='line line-top-bottom'
            d='M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22'
          ></path>
          <path className='line' d='M7 16 27 16'></path>
        </svg>
      </label>
    </header>
  );
};

export default Header2;

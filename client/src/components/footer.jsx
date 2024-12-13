// import { Link } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { UserContext } from "../UserContext";
import "../pages/styles/Home.css";

export default function Footer() {
  // Eliminado el segundo par de llaves extra
  return (
    <footer>
      <div class='bloque1'>
        <p>
          © 2024 Dev Tomas. <br /> Todos los derechos reservados.
        </p>
      </div>
      <div class='bloque2'>
        <ul>
          <li>
            <a href='https://google.com'>Contacto</a>
          </li>
          <li>
            <a href='https://google.com'>Términos y Condiciones</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

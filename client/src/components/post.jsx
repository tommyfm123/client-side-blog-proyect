import { useState, useContext } from "react";
import { UserContext } from "../UserContext"; // Importar el contexto
import { useNavigate, useLocation } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import "../pages/styles/IndexPage.css";
// import { Link } from "react-router-dom";

export default function Post({
  _id,
  title,
  summary,
  createdAt,
  author,
  website,
  isHome,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false); // Para mostrar el pop-up de confirmación de eliminar
  const [isDeleting, setIsDeleting] = useState(false); // Para manejar el estado de carga mientras se elimina el post
  const { userInfo } = useContext(UserContext); // Acceso al contexto para verificar usuario logueado
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ruta actual

  // Verifica si estamos en la página de artículos
  const isArticlesPage = location.pathname === "/articles";

  // Función para mostrar el pop-up de confirmación
  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  // Función para manejar el clic y abrir la URL en una nueva ventana
  const handleClick = () => {
    if (website) {
      // Abre la URL en una nueva ventana o pestaña
      window.open(website, "_blank");
    }
  };

  // Función para manejar la eliminación del post
  const handleDelete = () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    ); // Extraer token de las cookies

    if (!token) {
      console.error("No token found. You must be logged in to delete a post.");
      return;
    }

    setIsDeleting(true);
    fetch(`https://api-portfolio-arturo.vercel.app/post/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      credentials: "include", // Esto asegura que las cookies sean enviadas con la solicitud
    })
      .then((response) => {
        if (response.ok) {
          setShowConfirmation(false); // Cerrar el pop-up
          navigate("/articles"); // Redirigir al usuario a la página de artículos después de eliminar
          window.location.reload();
        } else {
          console.error(
            "Failed to delete the post. Response:",
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("An error occurred while deleting the post:", error);
      })
      .finally(() => {
        setIsDeleting(false); // Ocultar indicador de carga
      });
  };

  // Función para redirigir a la página de editar
  const handleEdit = () => {
    navigate(`/edit/${_id}`); // Redirigir a la página de edición del post
  };

  const username = userInfo?.username; // Verificar si hay usuario logueado

  return (
    <div className={`post ${isHome ? "post-home" : ""}`}>
      <div className='texts' onClick={handleClick}>
        <h2 className='titulopost'>{title}</h2>
        <p className='info'>
          <span className='author'>{author.username}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>

      {/* El pop-up de confirmación de eliminar o editar */}
      {showConfirmation && (
        <div className='confirmation-popup'>
          <p>¿Qué te gustaría hacer con este artículo?</p>
          <div className='confirmation-buttons'>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </button>
            <button onClick={() => setShowConfirmation(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Icono para opciones (editar/eliminar) */}
      {username && isArticlesPage && (
        <div
          className='post-options'
          onClick={handleShowConfirmation} // Mostrar el pop-up cuando se haga clic
          style={{ cursor: "pointer" }}
        >
          <ion-icon name='ellipsis-horizontal-sharp'></ion-icon>
        </div>
      )}
    </div>
  );
}

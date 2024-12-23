import { useState, useContext } from "react";
import { UserContext } from "../UserContext"; // Importar el contexto del usuario
import { useNavigate, useLocation } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import "../pages/styles/IndexPage.css"; // Asegúrate de tener el estilo

export default function Post({
  _id,
  title,
  summary,
  createdAt,
  author,
  website,
  isHome,
}) {
  const [showConfirmation, setShowConfirmation] = useState(false); // Para mostrar el pop-up de confirmación
  const [isDeleting, setIsDeleting] = useState(false); // Para el estado de carga al eliminar
  const { userInfo } = useContext(UserContext); // Acceso al contexto para verificar usuario logueado
  const navigate = useNavigate();
  const location = useLocation();

  const isArticlesPage = location.pathname === "/articles"; // Verificar si estamos en la página de artículos
  const username = userInfo?.username; // Usuario logueado

  // Mostrar pop-up de confirmación
  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  // Redirigir a la página de edición
  const handleEdit = () => {
    navigate(`/edit/${_id}`); // Navegar a la página de edición del post
  };

  // Abrir el enlace del sitio web en una nueva pestaña
  const handleClick = () => {
    if (website) {
      window.open(website, "_blank");
    }
  };

  // Eliminar el post
  const handleDelete = () => {
    setIsDeleting(true);
    fetch(`https://api-portfolio-arturo.vercel.app/post/${_id}`, {
      method: "DELETE",
      credentials: "include", // Incluye cookies automáticamente
    })
      .then((response) => {
        if (response.ok) {
          setShowConfirmation(false); // Cerrar el pop-up
          navigate("/articles"); // Redirigir a la lista de artículos
        } else {
          console.error(
            "No se pudo eliminar el post. Código de respuesta:",
            response.status
          );
          alert("Error al eliminar el post. Intenta nuevamente.");
        }
      })
      .catch((error) => {
        console.error("Error al intentar eliminar el post:", error);
        alert("Hubo un problema al eliminar el post.");
      })
      .finally(() => {
        setIsDeleting(false); // Finalizar estado de carga
      });
  };

  return (
    <div className={`post ${isHome ? "post-home" : ""}`}>
      {/* Contenido del post */}
      <div className='texts' onClick={handleClick}>
        <h2 className='titulopost'>{title}</h2>
        <p className='info'>
          <span className='author'>{author.username}</span>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className='summary'>{summary}</p>
      </div>

      {/* Pop-up de confirmación */}
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

      {/* Icono para mostrar opciones (editar/eliminar) */}
      {username === author.username && isArticlesPage && (
        <div
          className='post-options'
          onClick={handleShowConfirmation}
          style={{ cursor: "pointer" }}
        >
          <ion-icon name='ellipsis-horizontal-sharp'></ion-icon>
        </div>
      )}
    </div>
  );
}

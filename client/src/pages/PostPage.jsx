import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import "./styles/postPage.css";
import { Link } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null); // Información del post
  const [showConfirmation, setShowConfirmation] = useState(false); // Pop-up de confirmación
  const [isDeleting, setIsDeleting] = useState(false); // Estado de eliminación
  const { userInfo } = useContext(UserContext); // Información del usuario
  const { id } = useParams(); // ID del post
  const navigate = useNavigate(); // Navegación

  // Obtener la información del post
  useEffect(() => {
    fetch(`https://api-portfolio-arturo.vercel.app/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        return response.json();
      })
      .then((postInfo) => {
        setPostInfo(postInfo);
      })
      .catch((error) => {
        console.error("Failed to fetch post info:", error);
      });
  }, [id]);

  // Manejar la eliminación del post
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
    fetch(`https://api-portfolio-arturo.vercel.app/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar el token si lo estás usando en el header
      },
      credentials: "include", // Esto asegura que las cookies sean enviadas con la solicitud
    })
      .then((response) => {
        if (response.ok) {
          setShowConfirmation(false); // Cerrar el pop-up
          navigate("/"); // Redirigir al usuario a la página principal
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

  if (!postInfo) return <p>Loading post...</p>; // Mostrar un indicador de carga inicial

  return (
    <div className='post-page'>
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className='author'>
        <p>by @{postInfo.author.username}</p>
      </div>
      {userInfo.id === postInfo.author._id && (
        <div className='edit-row'>
          <Link className='edit-btn' id='BtnEdit' to={`/edit/${postInfo._id}`}>
            <ion-icon name='create-outline'></ion-icon>
            <p>Edit this post</p>
          </Link>
          {/* Botón de eliminar */}
          <button
            className='delete-btn'
            onClick={() => setShowConfirmation(true)}
            disabled={isDeleting} // Deshabilitar si está eliminando
          >
            <ion-icon name='trash-outline'></ion-icon>
            <p>{isDeleting ? "Deleting..." : "Delete this post"}</p>
          </button>
        </div>
      )}
      <div className='image'>
        <img
          src={`https://api-portfolio-arturo.vercel.app/${postInfo.cover}`}
          alt={postInfo.title}
        />
      </div>
      <div
        className='content'
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />

      {/* Pop-up de confirmación */}
      {showConfirmation && (
        <div className='confirmation-popup'>
          <div className='popup-content'>
            <p>Are you sure you want to delete this post?</p>
            <div className='popup-actions'>
              <button
                onClick={handleDelete}
                className='confirm-btn'
                disabled={isDeleting} // Deshabilitar si está eliminando
              >
                {isDeleting ? "Deleting..." : "Yes, delete it"}
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className='cancel-btn'
                disabled={isDeleting} // Deshabilitar si está eliminando
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importamos SweetAlert2
import "./styles/createPost.css";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [website, setWebsite] = useState("");
  const [redirect, setRedirect] = useState(false); // Estado para redirección
  const maxSummaryLength = 160; // Límite máximo de caracteres para el resumen

  async function createNewPost(ev) {
    ev.preventDefault();

    // Verificar si el título está vacío
    if (!title.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Falta el título",
        text: "Debes ingresar un título para el artículo.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
      return;
    }

    // Verificar si el resumen está vacío
    if (!summary.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Falta el resumen",
        text: "Debes ingresar un resumen para el artículo.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
      return;
    }

    // Validar la longitud del resumen
    if (summary.length < 100) {
      Swal.fire({
        icon: "warning",
        title: "Resumen muy corto",
        text: "El resumen debe tener al menos 100 caracteres.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
      return;
    }

    if (summary.length > maxSummaryLength) {
      Swal.fire({
        icon: "warning",
        title: "Resumen muy largo",
        text: "El resumen no puede exceder los 192 caracteres.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
      return;
    }

    // Verificar si la URL está vacía
    if (!website.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Falta la URL",
        text: "Debes ingresar la URL del artículo.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
      return;
    }

    // Crear un objeto de datos para el post
    const postData = {
      title,
      summary,
      website,
    };

    try {
      const response = await fetch(
        "https://api-portfolio-arturo.vercel.app/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
          credentials: "include", // Incluye las cookies para manejar la autenticación
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el post: " + response.statusText);
      }

      // Mostrar alerta de éxito si el post se crea correctamente
      Swal.fire({
        icon: "success",
        title: "¡Artículo creado!",
        text: "El artículo ha sido creado exitosamente.",
        showConfirmButton: false,
        timer: 2000, // Desaparecerá automáticamente después de 2 segundos
        toast: true,
        position: "top-end",
      }).then(() => {
        setRedirect(true); // Redirigir a la página de artículos después de mostrar la alerta
      });
    } catch (error) {
      // Mostrar alerta de error si ocurre un problema al crear el post
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al crear el artículo. Inténtalo de nuevo.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
    }
  }

  if (redirect) {
    // Después de la creación, redirigir a la página de artículos
    return <Navigate to='/articles' />;
  }

  return (
    <div className='createPost'>
      <h2>Crear Artículo</h2>
      <div className='containerCreatePost'>
        <form onSubmit={createNewPost}>
          {/* Campo para el título */}
          <input
            type='text'
            placeholder='Título'
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />

          {/* Campo para el resumen */}
          <textarea
            placeholder='Resumen (mínimo 100 caracteres, máximo 192)'
            value={summary}
            onChange={(ev) => {
              if (ev.target.value.length <= maxSummaryLength) {
                setSummary(ev.target.value); // Solo actualiza si no excede el límite
              }
            }}
          />
          <div className='character-counter'>
            {summary.length}/{maxSummaryLength} caracteres
          </div>

          {/* Campo para la URL */}
          <input
            type='text'
            placeholder='Ingresar URL del artículo'
            value={website}
            onChange={(ev) => setWebsite(ev.target.value)}
          />

          {/* Botón para crear el artículo */}
          <button className='btnCreatePost'>
            Crear Artículo
            <ion-icon name='arrow-forward-outline'></ion-icon>
          </button>
        </form>
      </div>
    </div>
  );
}

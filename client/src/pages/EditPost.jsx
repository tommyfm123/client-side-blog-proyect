import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importamos SweetAlert2
import "./styles/editor.css";

export default function EditPost() {
  const { id } = useParams(); // Obtener el ID del post desde la URL
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [website, setWebsite] = useState("");
  const [redirect, setRedirect] = useState(false);

  const MIN_CHARACTERS = 100; // Número mínimo de caracteres para el resumen
  const MAX_CHARACTERS = 192; // Número máximo de caracteres para el resumen

  // Cargar la información del post cuando se carga la página
  useEffect(() => {
    fetch("https://api-portfolio-arturo.vercel.app/post/" + id)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setWebsite(postInfo.website); // Aseguramos que la URL también se cargue
      });
  }, [id]);

  // Función para actualizar el post
  async function updatePost(ev) {
    ev.preventDefault();

    // Validaciones con alertas personalizadas
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

    if (summary.length < MIN_CHARACTERS) {
      Swal.fire({
        icon: "warning",
        title: "Resumen muy corto",
        text: `El resumen debe tener al menos ${MIN_CHARACTERS} caracteres.`,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
      return;
    }

    if (summary.length > MAX_CHARACTERS) {
      Swal.fire({
        icon: "warning",
        title: "Resumen muy largo",
        text: `El resumen no puede exceder los ${MAX_CHARACTERS} caracteres.`,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
      return;
    }

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

    // Crear el objeto para la actualización
    const updatedPost = {
      title,
      summary,
      website,
      id, // Aseguramos que estamos enviando el ID del post
    };

    try {
      const response = await fetch(
        "https://api-portfolio-arturo.vercel.app/post",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Especificamos que estamos enviando JSON
          },
          body: JSON.stringify(updatedPost), // Convertimos el objeto a JSON
          credentials: "include", // Incluir las credenciales de la cookie
        }
      );

      if (response.ok) {
        // Mostrar alerta de éxito al actualizar
        Swal.fire({
          icon: "success",
          title: "¡Artículo actualizado!",
          text: "El artículo ha sido actualizado correctamente.",
          showConfirmButton: false,
          timer: 2000, // Desaparecerá automáticamente después de 2 segundos
          toast: true,
          position: "top-end",
        }).then(() => {
          setRedirect(true); // Redirigir después de la alerta
        });
      } else {
        // Mostrar alerta si ocurre un error al actualizar
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al actualizar el artículo. Inténtalo de nuevo.",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
          position: "center",
        });
      }
    } catch (error) {
      // Manejo de errores con alerta
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Ocurrió un problema: ${error.message}`,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        position: "center",
      });
    }
  }

  if (redirect) {
    return <Navigate to='/articles' />; // Redirigir a /articles después de la actualización
  }

  // Función para manejar los cambios en el resumen y limitar caracteres
  function handleSummaryChange(ev) {
    const input = ev.target.value;

    // Limitar los caracteres máximos manualmente
    if (input.length <= MAX_CHARACTERS) {
      setSummary(input);
    }
  }

  return (
    <div className='editPost'>
      <h2>Editar Artículo</h2>
      <div className='containerFormEditor'>
        <form onSubmit={updatePost}>
          {/* Campo para el título */}
          <input
            type='text'
            placeholder='Título'
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />

          {/* Campo para el resumen */}
          <textarea
            placeholder={`Resumen (mínimo ${MIN_CHARACTERS} caracteres, máximo ${MAX_CHARACTERS})`}
            value={summary}
            onChange={handleSummaryChange} // Validación en tiempo real
          />
          {/* Contador de caracteres */}
          <div style={{ textAlign: "right", fontSize: "12px", color: "#555" }}>
            {summary.length} / {MAX_CHARACTERS} caracteres
          </div>

          {/* Campo para la URL */}
          <input
            type='url'
            placeholder='Ingresar URL del artículo'
            value={website}
            onChange={(ev) => setWebsite(ev.target.value)}
          />

          {/* Botón para actualizar */}
          <button style={{ marginTop: "5px" }}>Actualizar Artículo</button>
        </form>
      </div>
    </div>
  );
}

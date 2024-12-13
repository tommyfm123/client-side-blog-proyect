import Post from "../components/post";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../UserContext"; // Importar el contexto
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "./styles/IndexPage.css";
import Pagination from "./Pagination";

export default function IndexPage() {
  const [posts, setPosts] = useState([]); // Todos los posts desde el servidor
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [postsPerPage] = useState(6); // Número de posts por página (puedes ajustarlo)
  const { userInfo } = useContext(UserContext); // Acceso al contexto para verificar usuario logueado
  const navigate = useNavigate(); // Hook para redirigir

  // Fetch de los posts al cargar el componente
  useEffect(() => {
    fetch("https://api-portfolio-arturo.vercel.app/post")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(
          posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        ); // Ordenar por fecha (recientes primero)
      });
  }, []);

  // Calcular los posts de la página actual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const username = userInfo?.username; // Verificar si hay usuario logueado

  // Función para manejar el clic en el botón
  const handleCreateArticle = () => {
    navigate("/create"); // Redirigir a la ruta "/create"
  };

  return (
    <div className='containerPostPage'>
      <div className='ContainerPost'>
        <h2 className='TituloArticulos'>Artículos</h2>
        <div className='BtnContainerArticulo'>
          {/* Renderizar el botón solo si el usuario está logueado */}
          {username && (
            <button className='btnCrearArticulo' onClick={handleCreateArticle}>
              <ion-icon name='add-outline'></ion-icon>
              Crear articulo
            </button>
          )}
        </div>
        <div className='PostIndexPage'>
          {currentPosts.length > 0 &&
            currentPosts.map((post) => <Post key={post._id} {...post} />)}
        </div>
        {/* Paginación */}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

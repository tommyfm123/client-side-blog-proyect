import React from "react";
import "./styles/Pagination.css";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  // Calcular el número total de páginas
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className='pagination'>
      <ul className='pagination-list'>
        {/* Botón para ir a la página anterior */}
        {currentPage > 1 && (
          <li>
            <button onClick={() => paginate(currentPage - 1)}>
              <ion-icon name='arrow-back-outline'></ion-icon>
              Anterior
            </button>
          </li>
        )}
        {/* Números de página */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          </li>
        ))}
        {/* Botón para ir a la página siguiente */}
        {currentPage < pageNumbers.length && (
          <li>
            <button onClick={() => paginate(currentPage + 1)}>
              Siguiente
              <ion-icon name='arrow-forward-outline'></ion-icon>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

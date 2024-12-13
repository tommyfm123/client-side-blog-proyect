import './App.css';
import Post from "./components/post";
// import Header from "./components/header";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/indexPage"; // Página para visualizar artículos
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home"; // Página principal
import Contact from './pages/contactPage';
import Register from './pages/RegisterPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Página principal será Home */}
          <Route index element={<Home />} />

          {/* Página para visualizar todos los artículos */}
          <Route path="/articles" element={<IndexPage />} />

          {/* Otras rutas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />

          {/* Redirección si se intenta acceder a una ruta no existente */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
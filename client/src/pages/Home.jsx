import { useEffect, useState } from "react";
import "./styles/Home.css";
import { useNavigate } from "react-router-dom";
import medic4 from "../images/arturoProfileImage.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import Post from "../components/post";

// Slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]); // Todos los posts desde el servidor

  // Función para redirigir a la página de artículos
  const goToArticles = () => {
    navigate("/articles"); // Cambia la ruta a donde deseas redirigir
  };

  const goToContact = () => {
    navigate("/contact");
  };

  // Función para redirigir a la página de contacto
  // const goToContact = () => {
  //   navigate("/contacto"); // Cambia la ruta a la página de contacto
  // };

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

  // Solo tomar los 5 posts más recientes
  const latestPosts = posts.slice(0, 5);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1068,
        settings: {
          slidesToShow: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  // AOS animations

  useEffect(() => {
    AOS.init({
      duration: 1200, // Duración de las animaciones (en milisegundos)
      once: false, // Si true, las animaciones se ejecutan solo una vez
      mirror: false, // Si true, las animaciones se repiten al hacer scroll hacia arriba
    });
  }, []);
  return (
    <div className='Home'>
      <div className='containerIntroduction'>
        <div className='Introduction'>
          <h1 className='TituloIntro'>
            Dr. Arturo <br />
            Fernandez Murga
          </h1>
          <p className='DescripcionIntro'>
            Cardiólogo experto en prevención y tratamiento de enfermedades del
            corazón.
          </p>
          <div className='containerBtn'>
            <button onClick={goToArticles} className='BtnArticulos'>
              Ver Artículos
            </button>
          </div>
        </div>
      </div>

      {/* Sección de Sobre Mí */}
      <div className='SobreMi'>
        <div className='sobreMiBloque1'>
          <img src={medic4} alt='' className='ImgArturo' />
          {/* <h3 className='NombreSobreMi'>Arturo Fernandez Murga</h3> */}
        </div>
        <div className='sobreMiBloque2'>
          <h2>Conociendo al Dr. Arturo Fernández Murga</h2>
          <div className='ImageMobileContainer'>
            <img src={medic4} alt='' className='ImgArturoMobile' />
          </div>
          <h3 className='Subtitles'>
            <ion-icon name='arrow-forward-outline'></ion-icon>
            Especialista en salud cardiovascular
          </h3>
          <p className='SobreMiDescripcion'>
            Soy cardiólogo con más de 15 años de experiencia, especializado en
            prevención y tratamiento de enfermedades del corazón. Mi misión es
            ofrecer un cuidado personalizado para mejorar tu salud
            cardiovascular.
          </p>
          <h3 className='Subtitles'>
            <ion-icon name='arrow-forward-outline'></ion-icon>
            Investigador y conferencista internacional
          </h3>
          <p className='SobreMiDescripcion'>
            Con más de 50 publicaciones científicas y como conferencista en
            congresos internacionales, aplico las últimas innovaciones en
            cardiología para ofrecer tratamientos efectivos y basados en la
            evidencia.
          </p>
          {/* data-aos='fade-up' */}
          <h3 className='Subtitles'>
            <ion-icon name='arrow-forward-outline'></ion-icon>
            Cuidado personalizado para cada paciente
          </h3>
          <p className='SobreMiDescripcion'>
            Creo en un enfoque único para cada paciente, ajustando los
            tratamientos a tus necesidades para ayudarte a lograr una vida más
            saludable y plena.
          </p>
        </div>
      </div>

      {/* Sección de Logros y Certificaciones */}
      <div className='LogrosCertificaciones'>
        <h2 className='TituloLogros'>Certificaciones y Reconocimientos</h2>
        <ul className='timeline'>
          <li className='timeline-item'>
            <span className='timeline-icon'></span>
            <p>
              <strong>Certificado en Cardiología</strong> por la Universidad de
              Buenos Aires.
            </p>
          </li>
          <li className='timeline-item'>
            <span className='timeline-icon'></span>
            <p>
              Miembro activo de la{" "}
              <strong>Sociedad Argentina de Cardiología</strong>.
            </p>
          </li>
          <li className='timeline-item'>
            <span className='timeline-icon'></span>
            <p>
              Investigador y autor de más de 50 publicaciones en revistas
              científicas internacionales.
            </p>
          </li>
          <li className='timeline-item'>
            <span className='timeline-icon'></span>
            <p>
              Ganador del{" "}
              <strong>Premio al Mejor Investigador en Cardiología 2018</strong>.
            </p>
          </li>
          <li className='timeline-item'>
            <span className='timeline-icon'></span>
            <p>
              Conferencista en el{" "}
              <strong>Congreso Mundial de Cardiología</strong> (2019, 2022).
            </p>
          </li>
        </ul>
      </div>

      {/* Sección de Especialidades */}
      <div className='Especialidades'>
        <h2>Áreas de Especialización</h2>
        <div className='grid-container'>
          <div className='grid-item two-columns'>
            <h3>Prevención Cardiovascular</h3>
            <p>
              Estrategias para reducir el riesgo de enfermedades coronarias.
            </p>
            <div className='chips'>
              <span className='chip'>Salud</span>
              <span className='chip'>Prevención</span>
            </div>
          </div>
          <div className='grid-item'>
            <h3>Diagnóstico Avanzado</h3>
            <p>Ecocardiografía, Pruebas de Esfuerzo, Monitoreo Holter.</p>
            <div className='chips'>
              <span className='chip'>Diagnóstico</span>
              <span className='chip'>Tecnología</span>
            </div>
          </div>
          <div className='grid-item'>
            <h3>Rehabilitación Cardiaca</h3>
            <p>
              Programas de recuperación para pacientes post-infarto o
              post-cirugía.
            </p>
            <div className='chips'>
              <span className='chip'>Rehabilitación</span>
              <span className='chip'>Recuperación</span>
            </div>
          </div>
          <div className='grid-item two-columns'>
            <h3>Tratamiento de Enfermedades Coronarias</h3>
            <p>
              Manejo de angina, infarto de miocardio y insuficiencia cardíaca.
            </p>
            <div className='chips'>
              <span className='chip'>Tratamiento</span>
              <span className='chip'>Cardiología</span>
            </div>
          </div>
          <div className='grid-item'>
            <h3>Hipertensión Arterial</h3>
            <p>Diagnóstico y manejo integral de la hipertensión.</p>
            <div className='chips'>
              <span className='chip'>Hipertensión</span>
              <span className='chip'>Salud</span>
            </div>
          </div>
          <div className='grid-item'>
            <h3>Arritmias Cardíacas</h3>
            <p>Diagnóstico y manejo de arritmias cardíacas.</p>
            <div className='chips'>
              <span className='chip'>Arritmias</span>
              <span className='chip'>Cardiología</span>
            </div>
          </div>
        </div>
      </div>

      <div className='UltimosArticulos'>
        <h2 className='UltimosArtTitle'>Articulos que podrian interesarte</h2>
        <p className='descripcionUltimosArticulos'>
          El objetivo de estos articulos es compartir mis conocimientos para que
          puedas aprender y estar al tanto de las nuevas practicas
        </p>
        <Slider {...settings} className='articulos'>
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <Post
                key={post._id}
                _id={post._id}
                title={post.title}
                summary={post.summary}
                createdAt={post.createdAt}
                author={post.author}
                website={post.website}
                isHome={true}
              />
            ))
          ) : (
            <p className='Loading'>Cargando artículos...</p> // Opcional: un mensaje mientras carga
          )}
        </Slider>
        <button className='btn-vermas'>
          <a href='/articles'>Ver mas</a>
        </button>
      </div>

      <div className='beneficiosContainer'>
        <h2 data-aos='fade-up'>La importancia de cuidar tu corazón</h2>
        <p data-aos='fade-up'>
          Como médico, siempre recomiendo que después de los 35 años empieces a
          prestarle más atención a tu salud cardíaca. La mayoría de las
          enfermedades del corazón se pueden prevenir o detectar a tiempo con
          controles regulares. Es algo simple, pero marca una gran diferencia en
          tu calidad de vida.
        </p>
        <p data-aos='fade-up'>
          Estos son, en mi experiencia, los principales beneficios de visitar al
          cardiólogo:
        </p>
        <ul>
          <li data-aos='fade-up'>
            <ion-icon name='chevron-forward-circle-outline'></ion-icon>Detectar
            problemas cardíacos antes de que avancen
          </li>
          <li data-aos='fade-up'>
            <ion-icon name='chevron-forward-circle-outline'></ion-icon>Controlar
            la presión arterial y evitar complicaciones
          </li>
          <li data-aos='fade-up'>
            <ion-icon name='chevron-forward-circle-outline'></ion-icon>
            Identificar y tratar a tiempo el colesterol alto
          </li>
          <li data-aos='fade-up'>
            <ion-icon name='chevron-forward-circle-outline'></ion-icon>
            Incorporar hábitos saludables que te beneficien a largo plazo
          </li>
          <li data-aos='fade-up'>
            <ion-icon name='chevron-forward-circle-outline'></ion-icon>Prevenir
            infartos y otras enfermedades serias
          </li>
          <li data-aos='fade-up'>
            <ion-icon name='chevron-forward-circle-outline'></ion-icon>Mejorar
            tu calidad de vida y disfrutar más momentos con los que querés
          </li>
        </ul>
      </div>

      {/* Seccion de contacto */}

      <div className='ContactSection'>
        <div className='questionBlock'>
          <h2>¿Tienes preguntas sobre cómo cuidarte correctamente?</h2>
          <button onClick={goToContact} className='BtnContacto'>
            Contactate conmigo!
          </button>
        </div>
      </div>
    </div>
  );
}

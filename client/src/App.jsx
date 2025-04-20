import './App.css';
import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player/youtube";
import Logo from './assets/vite.svg'; // Asegúrate de que la ruta sea correcta

const isProd = import.meta.env.MODE === 'production';
const API_URL = isProd
  ? '/api'
  : 'http://localhost:3000/api';

function App() {
  const time = new Date();
  const day = time.toLocaleString("es-ES", { weekday: "long" });
  const morning = time.getHours() >= 6 && time.getHours() <= 12;
  const afternoon = time.getHours() >= 13 && time.getHours() <= 18;
  const evening = time.getHours() >= 19 && time.getHours() <= 23;
  const night = time.getHours() >= 0 && time.getHours() <= 5;
  let dayMessage;

  if (day.toLowerCase() === "Monday") {
    dayMessage = `Happy ${day}`;
  } else if (day.toLowerCase() === "Tuesday") {
    dayMessage = ` ${day}, four to go`;
  } else if (day.toLowerCase() === "Wednesday") {
    dayMessage = ` ${day}, half way there`;
  } else if (day.toLowerCase() === "Thursday") {
    dayMessage = `${day}, start planing the weekend`;
  } else if (day.toLowerCase() === "Friday") {
    dayMessage = `Woo - hoo, the weekend is coming!`;
  } else if (day.toLowerCase() === "Saturday") {
    dayMessage = `Happy ${day}`;
  } else {
    dayMessage = `${day}: Stay calm and keep having fun`;
  }

  // Estado para manejar las URLs y el valor del input
  const [videoUrls, setVideoUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');

  // Cargar las URLs desde el archivo JSON al iniciar
  useEffect(() => {
    fetch(`${API_URL}/videos`) // Usa la variable de entorno
      .then((response) => response.json())
      .then((data) => {
        const urls = data.map((video) => video.url);
        setVideoUrls(urls); // Actualizar el estado con las URLs
      })
      .catch((error) => console.error('Error al cargar los videos:', error));
  }, []);

  // Función para manejar el cambio en el input
  const handleInputChange = (e) => {
    console.log('URL ingresada:', e.target.value); // Depuración
    setNewUrl(e.target.value);
  };

  // Función para añadir una nueva URL a la lista
  const addVideoUrl = () => {
    if (newUrl.trim() !== '' && ReactPlayer.canPlay(newUrl)) {
      fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: newUrl }), // Guardar como objeto en el servidor
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Video guardado en el servidor:', data);
          setVideoUrls((prevUrls) => [...prevUrls, newUrl]); // Actualizar el estado con la nueva URL
          setNewUrl(''); // Limpiar el input
        })
        .catch((error) => console.error('Error al guardar el video en el servidor:', error));
    } else {
      alert('Por favor, introduce una URL válida.');
    }
  };

  const MyVideo = () => {
    return (
      <div className="neon-frame">
        <ReactPlayer
          url={videoUrls} // Pasar el array completo de URLs
          playing={false} // No reproducir automáticamente
          controls={true} // Mostrar controles
          loop={true} // Repetir el video
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1, // Ocultar el logo de YouTube
                rel: 0, // No mostrar videos relacionados
                showinfo: 0, // Ocultar información del video
              },
            },
          }}
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)',
          }}
        />
      </div>
    );
  };

  return (
    <>
    <div className='neon-logo'>
      <img src={Logo} alt="MusicYou Logo" style={{height: '20vh'}} />
    
      <div>
        <h1>{dayMessage}</h1>
        {morning && <h2>Have you had breakfast yet?</h2>}
        {afternoon && <h2>Good afternoon!</h2>}
        {evening && <h2>Good evening!</h2>}
        {night && <h2>It's late, time to rest!</h2>}
      </div>
      </div>
      <hr />

      <div >
        <input
          type="text"
          placeholder="Introduce una URL de video"
          value={newUrl}
          onChange={handleInputChange}
          style={{ marginRight: '10px', padding: '5px', width: '300px' }}
        />

        <button onClick={addVideoUrl} style={{ padding: '5px 10px', borderRadius: '10px', transition: 'border-radius 0.3s ease-in-out' }}>
          Añadir Video
        </button> 
      </div>
      <hr />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <MyVideo />
      </div>          
    </>
  ); 
}

export default App;

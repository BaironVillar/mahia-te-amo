onload = () => {
  const video = document.getElementById('intro-video');
  const audio = document.getElementById('background-music');
  const videoContainer = document.getElementById('video-container');
  const flowersContent = document.getElementById('flowers-content');
  
  // Función para mostrar las flores y mantener la música
  const showFlowers = () => {
    videoContainer.classList.add('hidden');
    flowersContent.style.display = 'block';
    video.pause(); // Pausar el video
    
    // Asegurarnos que la música sigue sonando
    audio.currentTime = 0; // Reiniciar el audio desde el principio
    audio.play().catch(error => {
      console.log("Error reproduciendo música de fondo");
    });
    
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 100);
  };

  // Reproducir video cuando el usuario interactúe
  const startExperience = () => {
    // Solo reproducir el video, el audio se maneja por separado
    video.muted = true; // Silenciar el video
    Promise.all([
      video.play(),
      audio.play()
    ]).catch(error => {
      console.log("Reproducción automática bloqueada por el navegador");
      showFlowers();
    });
  };

  // Cuando termine el video, mostrar las flores pero mantener el audio
  video.addEventListener('ended', () => {
    setTimeout(showFlowers, 100);
  });

  // Iniciar cuando el usuario interactúe
  document.addEventListener('click', startExperience, { once: true });
  document.addEventListener('touchstart', startExperience, { once: true });

  // Añadir evento para saltar el video con la tecla 'm'
  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'm') {
      video.pause();
      showFlowers(); // Esto ahora iniciará el audio desde el principio
    }
  });

  // Asegurarnos que el audio esté listo para reproducirse
  video.muted = true; // Asegurar que el video esté silenciado desde el inicio
  audio.load();
};
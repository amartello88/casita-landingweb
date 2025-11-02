document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('.nav-menu a'); // todos los links del menú

    // Abrir/cerrar menú con el toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        logo.classList.toggle('hide');
    });

    // Cerrar menú al hacer click en cualquier link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            logo.classList.remove('hide');
        });
    });
});

/* pop up img galeria section */
    document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-grid img');

    // Crear el lightbox y la X
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const img = document.createElement('img');
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('lightbox-close');
    closeBtn.innerHTML = '&times;'; // la X
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Mostrar imagen clickeada
    images.forEach(image => {
        image.addEventListener('click', () => {
        img.src = image.src;
        lightbox.classList.add('active');
        });
    });

    // Cerrar al hacer clic en la X
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
        lightbox.classList.remove('active');
        }
    });
    });

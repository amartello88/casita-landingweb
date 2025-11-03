    document.addEventListener('DOMContentLoaded', function () {
    /* ------------------- MENÚ ------------------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const logo = document.querySelector('.logo');
    const navLinks = document.querySelectorAll('.nav-menu a');

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        logo.classList.toggle('hide');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        logo.classList.remove('hide');
        });
    });

    /* ------------------- LIGHTBOX CON FLECHAS ------------------- */
    const images = document.querySelectorAll('.image-grid img');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');

    const img = document.createElement('img');
    const closeBtn = document.createElement('span');
    const prevBtn = document.createElement('span');
    const nextBtn = document.createElement('span');

    closeBtn.classList.add('lightbox-close');
    prevBtn.classList.add('lightbox-prev');
    nextBtn.classList.add('lightbox-next');

    closeBtn.innerHTML = '&times;';
    prevBtn.innerHTML = '&#10094;'; // flecha izquierda
    nextBtn.innerHTML = '&#10095;'; // flecha derecha

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);

    let currentIndex = 0;

    const showImage = (index) => {
        img.style.opacity = 0;
        setTimeout(() => {
        img.src = images[index].src;
        img.onload = () => (img.style.opacity = 1);
        }, 150);
        lightbox.classList.add('active');
    };

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
        });
    });

    // Navegación flechas
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // Cerrar lightbox
    closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });

    // Navegar con teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });
    });

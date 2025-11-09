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

    /* ------------------- LIGHTBOX CON FLECHAS + SWIPE ------------------- */
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
    prevBtn.innerHTML = '&#10094;';
    nextBtn.innerHTML = '&#10095;';

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);

    let currentIndex = 0;
    let scrollY = 0;

    const showImage = (index) => {
        // 🔹 Mostrar lightbox
        lightbox.style.display = 'flex';
        lightbox.classList.add('active');

        img.classList.add('fade-out');
        setTimeout(() => {
        img.src = images[index].src;
        img.onload = () => {
            img.classList.remove('fade-out');
        };
        }, 200);

        // 🚫 Bloquea scroll del fondo
        scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightbox.classList.remove('active');

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
    };

    // Abrir lightbox al hacer clic en una imagen
    images.forEach((image, index) => {
        image.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
        });
    });

    // Navegación con flechas
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
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display !== 'flex') return;
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') closeLightbox();
    });

    /* ------------------- SWIPE TÁCTIL CON FADE ------------------- */
    let startX = 0;
    let endX = 0;

    img.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    img.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    img.addEventListener('touchend', () => {
        const swipeDistance = endX - startX;

        if (Math.abs(swipeDistance) > 50) {
        img.classList.add('fade-out');
        setTimeout(() => {
            if (swipeDistance < 0) {
            currentIndex = (currentIndex + 1) % images.length;
            } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            }
            img.src = images[currentIndex].src;
            img.classList.remove('fade-out');
        }, 200);
        }

        startX = 0;
        endX = 0;
    });
    });

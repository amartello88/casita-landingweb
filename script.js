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

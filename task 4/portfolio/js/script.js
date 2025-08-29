document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Contact form submission (dummy alert)
document.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent!');
});
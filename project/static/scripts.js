document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith("#")) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', function () {
        // Update Active State
        document.querySelectorAll('.timeline-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        // Update Background
        const background = document.getElementById('background-image');
        const imageUrl = this.getAttribute('data-image');
        background.style.backgroundImage = `url(${imageUrl})`;

        // Update Description
        const description = document.getElementById('description');
        const time = this.getAttribute('data-time');
        const text = this.getAttribute('data-description');
        description.innerHTML = `<h2>${time}</h2><p>${text}</p>`;
    });
});

   
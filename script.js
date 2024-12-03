// Navbar scroll effect and mobile toggle
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.navbar-toggler');
    const navLinks = document.querySelector('.navbar-nav');

    // Add scroll class on window scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        console.log('Menu toggled'); // Check if click is working
    });

    // Intersection Observer for section visibility on scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Select all audio elements
    const audioElements = document.querySelectorAll('audio');

    // Function to stop other audios when one starts playing
    audioElements.forEach(audio => {
        audio.addEventListener('play', () => {
            // Pause all other audio elements
            audioElements.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0; // Reset the playback position
                }
            });
        });
    });

    // Genre Selection Logic
    const genreButtons = document.querySelectorAll('.genre-button');
    const musicContainers = document.querySelectorAll('.music-container');

    const handleGenreSelection = (genre) => {
        // Hide all music containers
        musicContainers.forEach(container => {
            container.style.display = 'none'; // Hide all containers
        });

        // Show only the music container that matches the selected genre
        const targetContainer = document.querySelector(`.music-container[data-genre="${genre}"]`);
        if (targetContainer) {
            targetContainer.style.display = 'block'; // Show the selected container
        }
    };

    // Add event listeners to genre buttons
    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.getAttribute('data-genre');

            // Update active button styles
            genreButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Call the function to handle genre selection
            handleGenreSelection(genre);
        });
    });

    // On page load, make sure the first genre is active
    const firstActiveGenreButton = document.querySelector('.genre-button.active');
    if (firstActiveGenreButton) {
        const firstActiveGenre = firstActiveGenreButton.getAttribute('data-genre');
        handleGenreSelection(firstActiveGenre);
    }
});

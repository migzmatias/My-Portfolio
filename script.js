document.addEventListener("DOMContentLoaded", function () {
    const projectsSection = document.getElementById("projects");

    function onScroll() {
        const sectionTop = projectsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8) {
            projectsSection.classList.add("show");
        }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
});

$(document).ready(function () {
    const text = "Luis Miguel Matias";
    let i = 0;
    const typewriterText = $(".typewriter-text");

    function type() {
        if (i < text.length) {
            typewriterText.append(text.charAt(i));
            i++;
            setTimeout(type, 150);
        } else {
            setTimeout(erase, 1000);
        }
    }

    function erase() {
        if (i > 0) {
            typewriterText.text(text.substring(0, i - 1));
            i--;
            setTimeout(erase, 100);
        } else {
            setTimeout(type, 500);
        }
    }

    type();
});

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        let offset = targetSection.offsetTop - document.querySelector('.header-container').offsetHeight;

        if (targetId === 'projects') {
            offset -= 12;
        }

        if (targetId === 'home') {
            offset = 0;
        }

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.target.id === 'home' && entry.isIntersecting) {
            const typewriterElement = entry.target.querySelector('.intro-text h1');
            if (typewriterElement) {
                typewriterElement.classList.remove('typing');
                void typewriterElement.offsetWidth;
                typewriterElement.classList.add('typing');
            }

            const fadeInElement = entry.target.querySelector('.intro-text');
            if (fadeInElement) {
                fadeInElement.classList.remove('fade-in');
                void fadeInElement.offsetWidth;
                fadeInElement.classList.add('fade-in');
            }
        }

        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, { threshold: 0.5 });

const sections = document.querySelectorAll('#home, #projects, #intro, #about-me');
sections.forEach(section => {
    observer.observe(section);
});

const observerProjects = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, { threshold: 0.5 });

observerProjects.observe(document.querySelector('#projects'));

$(document).ready(function () {
    $(".scroll-link").on("click", function (event) {
        event.preventDefault();
        var target = $($(this).attr("href"));
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    });
});

// Check if the About Me section is in view
const aboutMeSection = document.getElementById('about-me');

window.addEventListener('scroll', () => {
  const sectionTop = aboutMeSection.getBoundingClientRect().top;
  const sectionBottom = aboutMeSection.getBoundingClientRect().bottom;

  if (sectionTop <= window.innerHeight && sectionBottom >= 0) {
    aboutMeSection.classList.add('in-view');
    
    // Reset animations if the About Me section is in view
    const typewriterElement = aboutMeSection.querySelector('.intro-text h1');
    const fadeInElement = aboutMeSection.querySelector('.intro-text');
    
    if (typewriterElement) {
        typewriterElement.classList.remove('typing');
        void typewriterElement.offsetWidth; // Trigger reflow
        typewriterElement.classList.add('typing');
    }

    if (fadeInElement) {
        fadeInElement.classList.remove('fade-in');
        void fadeInElement.offsetWidth; // Trigger reflow
        fadeInElement.classList.add('fade-in');
    }
  }
});

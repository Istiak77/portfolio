// Smooth scroll for navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(e) {
      if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetSection = document.querySelector(this.getAttribute('href'));
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Update active class
          document.querySelectorAll('nav a').forEach(navLink => {
              navLink.classList.remove('active');
          });
          this.classList.add('active');
      }
  });
});

// Hover effect
function addHoverEffect(selector, scale = 1.1) {
  document.querySelectorAll(selector).forEach(element => {
      element.addEventListener('mouseover', () => {
          element.style.transform = `scale(${scale})`;
          element.style.transition = 'transform 0.3s ease';
      });
      element.addEventListener('mouseout', () => {
          element.style.transform = 'scale(1)';
      });
  });
}

addHoverEffect('.cell', 1.15);
addHoverEffect('.block', 1.05);
addHoverEffect('nav a', 1.05);
addHoverEffect('.social-link', 1.1);

// Form handling
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Message sent! I\'ll respond soon.');
  this.reset();
});

// Scroll animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
      }
  });
}, { threshold: 0.25 });

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'all 1.25s ease-out';
  observer.observe(section);
});
// Theme toggle functionality
const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;
const icon = themeToggle.querySelector("i");

// Set initial theme based on preference
function setInitialTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    body.classList.add("dark-theme");
    icon.classList.replace("fa-sun", "fa-moon");
  } else {
    body.classList.add("light-theme");
    icon.classList.replace("fa-moon", "fa-sun");
  }
}

// Toggle theme function with delay
function toggleTheme() {
  // Delay the theme switch by 300ms (you can adjust this value)
  setTimeout(() => {
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      icon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("theme", "light");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      icon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("theme", "dark");
    }
  }, 300); // 300ms delay before switching themes
}

// Set initial theme on page load
setInitialTheme();

// Add click event listener
themeToggle.addEventListener("click", toggleTheme);



// Update footer year
document.querySelector('footer p').textContent = `© ${new Date().getFullYear()} My Portfolio. All Rights Reserved`;

// Highlight active section in nav while scrolling
window.addEventListener('scroll', function() {
  const scrollPosition = window.scrollY;
  
  document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          const id = section.getAttribute('id');
          document.querySelectorAll('nav a').forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                  link.classList.add('active');
              }
          });
      }
  });
});